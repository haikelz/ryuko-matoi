import { WAIT_MESSAGE } from "@/utils/string";
import { Client, Message, MessageMedia } from "whatsapp-web.js";

export async function createSticker(message: Message, client: Client): Promise<Message> {
  client.sendMessage(message.from, WAIT_MESSAGE);

  try {
    if (message.hasQuotedMsg) {
      const quotedMessage: MessageMedia = await message
        .getQuotedMessage()
        .then(async (msg) => await msg.downloadMedia());

      if (!quotedMessage.mimetype.includes("image") && !quotedMessage.mimetype.includes("video")) {
        return message.reply(
          `*Format file yang anda masukkan salah!* Silahkan masukkan file berupa gambar/video. Format file yang anda masukkan: ${
            quotedMessage.mimetype.split("/")[0]
          }`,
          message.from
        );
      }

      return message.reply(quotedMessage, message.from, {
        sendMediaAsSticker: true,
        stickerAuthor: "Ryuko Matoi",
        stickerName: "Baiklah",
      });
    }

    const media: MessageMedia = await message.downloadMedia();

    if (!media.mimetype.includes("image") && !media.mimetype.includes("video")) {
      return message.reply(
        `*Format file yang anda masukkan salah!* Silahkan masukkan file berupa gambar/video. Format file yang anda masukkan: ${
          media.mimetype.split("/")[0]
        }`,
        message.from
      );
    }

    return message.reply(media, message.from, {
      sendMediaAsSticker: true,
      stickerAuthor: "Ryuko Matoi",
      stickerName: "Baiklah",
    });
  } catch (error) {
    return message.reply(`Wah error nih, silahkan coba lagi ya!`, message.from);
  }
}
