import { logger } from "@/configs/logger";
import { WAIT_MESSAGE } from "@/utils/string";
import Tesseract from "tesseract.js";
import { Client, Message } from "whatsapp-web.js";

export async function convertImageToText(message: Message, client: Client): Promise<Message> {
  client.sendMessage(message.from, WAIT_MESSAGE);

  try {
    const worker = await Tesseract.createWorker("eng");
    const media = await message.downloadMedia();

    if (message.hasQuotedMsg) {
      const quotedMsg = await message.getQuotedMessage();
      const media = await quotedMsg.downloadMedia();
      const file = Buffer.from(media.data, "base64");

      if (!media.mimetype.includes("image")) {
        logger.error(`Convert image to text failed: ${media.mimetype} from ${message.from}`);
        return message.reply(
          `*Format file yang anda masukkan salah!* Silahkan masukkan file berupa gambar. Format file yang anda masukkan: ${
            media.mimetype.split("/")[0]
          }`,
          message.from
        );
      }

      const {
        data: { text },
      } = await worker.recognize(file);

      await worker.terminate();

      logger.info(`User ${message.from} is converting image to text from quoted message`);
      return message.reply(text, message.from);
    }

    if (!media.mimetype.includes("image")) {
      logger.error(`Convert image to text failed: ${media.mimetype} from ${message.from}`);
      return message.reply(
        `*Format file yang anda masukkan salah!* Silahkan masukkan file berupa gambar. Format file yang anda masukkan: ${
          media.mimetype.split("/")[0]
        }`,
        message.from
      );
    }

    const file = Buffer.from(media.data, "base64");
    const result = await worker.recognize(file);
    await worker.terminate();

    logger.info(`User ${message.from} is converting image to text from message`);
    return message.reply(result.data.text, message.from);
  } catch (error) {
    logger.error(`Error in convertImageToText from ${message.from}: ${error}`);
    return message.reply(`Wah error nih, silahkan coba lagi ya!`, message.from);
  }
}
