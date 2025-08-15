import Tesseract from "tesseract.js";
import { Client, Message } from "whatsapp-web.js";
import { WAIT_MESSAGE, WRONG_FORMAT } from "../utils/constants";

export async function convertImageToText(message: Message, client: Client): Promise<Message> {
  client.sendMessage(message.from, WAIT_MESSAGE);

  try {
    const worker = await Tesseract.createWorker("eng");
    const media = await message.downloadMedia();

    if (message.hasQuotedMsg) {
      const quotedMsg = await message.getQuotedMessage();
      const media = await quotedMsg.downloadMedia();

      if (!media.mimetype.includes("image")) {
        return message.reply(
          `*Format file yang anda masukkan salah!* Silahkan masukkan file berupa gambar. Format file yang anda masukkan: ${
            media.mimetype.split("/")[0]
          }`
        );
      }

      const {
        data: { text },
      } = await worker.recognize(media.data);

      return message.reply(text, message.from);
    }

    if (!media.mimetype.includes("image")) {
      return message.reply(
        `*Format file yang anda masukkan salah!* Silahkan masukkan file berupa gambar. Format file yang anda masukkan: ${
          media.mimetype.split("/")[0]
        }`
      );
    }

    const {
      data: { text },
    } = await worker.recognize(media.data);

    return message.reply(text, message.from);
  } catch (error) {
    return message.reply(WRONG_FORMAT, message.from);
  }
}
