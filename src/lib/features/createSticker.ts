import { Client, Message, MessageMedia } from "whatsapp-web.js";
import { waitMessage } from "../utils/constants";

export const createSticker = async (message: Message, client: Client) => {
  client.sendMessage(message.from, waitMessage);

  try {
    if (message.hasQuotedMsg) {
      const quotedMessage: MessageMedia = await message
        .getQuotedMessage()
        .then(async (msg) => await msg.downloadMedia());

      if (!quotedMessage.mimetype.includes("image") && !quotedMessage.mimetype.includes("video")) {
        return message.reply(
          `*Format file yang anda masukkan salah!* Silahkan masukkan file berupa gambar/video. Format file yang anda masukkan: ${
            quotedMessage.mimetype.split("/")[0]
          }`
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
        }`
      );
    }

    return message.reply(media, message.from, {
      sendMediaAsSticker: true,
      stickerAuthor: "Ryuko Matoi",
      stickerName: "Baiklah",
    });
  } catch (err) {
    return message.reply(`${err}`);
  }
};
