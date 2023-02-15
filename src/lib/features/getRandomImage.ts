import { Client, Message, MessageMedia } from "whatsapp-web.js";
import { waitMessage } from "../utils/constants";

export const getRandomImage = async (
  text: string,
  message: Message,
  client: Client
): Promise<Message> => {
  const type: string = `${text.split(" ").slice(1).join(" ").toLowerCase()}`;
  client.sendMessage(message.from, waitMessage);

  if (type.length === 0) {
    return message.reply(
      "Ini adalah perintah untuk mendapatkan gambar acak sesuai dengan keyword yang dimasukkan. Cukup ketik *!image <your_keyword>*"
    );
  }

  try {
    const media: MessageMedia = await MessageMedia.fromUrl(
      `https://source.unsplash.com/random/?${type}`,
      { unsafeMime: true }
    );
    return message.reply(media, message.from, { caption: type });
  } catch (err) {
    return message.reply(`${err}`);
  }
};
