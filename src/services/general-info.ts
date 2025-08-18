import { logger } from "@/configs/logger";
import { Message, MessageMedia } from "whatsapp-web.js";

export async function getInfo(message: Message): Promise<Message> {
  try {
    const media: MessageMedia = MessageMedia.fromFilePath("src/assets/thumbnail.png");

    logger.info(`User ${message.from} is requesting general info`);
    return message.reply(media, message.from, {
      caption: `
\t*Ryuko Matoi*\t\t

\t*Menu:*\t\t
\t!salam\t\t
\t!info\t\t
\t!ask\t\t
\t!editbackground\t\t
\t!jadwalsholat\t\t
\t!sticker\t\t
\t!doa\t\t
\t!jokes\t\t
\t!animequote\t\t
\t!ocr\t\t
\t!asmaulhusna\t\t
`,
    });
  } catch (err) {
    logger.error(`Error in getInfo from ${message.from}: ${err}`);
    return message.reply(`Wah error nih, silahkan coba lagi ya!`, message.from);
  }
}
