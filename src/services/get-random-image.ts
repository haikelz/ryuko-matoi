import { Client, Message, MessageMedia } from "whatsapp-web.js";
import { IMAGE_API_URL, WAIT_MESSAGE } from "../utils/constants";

/**
 * IMPORTANT
 * The Unsplash Random Image URL is deprecated, So I use picsum instead.
 */
export async function getRandomImage(
  text: string,
  message: Message,
  client: Client
): Promise<Message> {
  const command: string = `${text.split(" ").slice(1).join(" ").toLowerCase()}`;
  const type: string = `${text.split(" ").slice(1).join(" ").toLowerCase()}`;

  client.sendMessage(message.from, WAIT_MESSAGE);

  if (command === "info") {
    return message.reply(
      "Ini adalah perintah untuk mendapatkan gambar secara acak. Ketik *!doa* dan lihat hasilnya!"
    );
  }

  try {
    const media: MessageMedia = await MessageMedia.fromUrl(`${IMAGE_API_URL}/400`, {
      unsafeMime: true,
    });
    return message.reply(media, message.from, { caption: type });
  } catch (err) {
    return message.reply(`Wah error nih, silahkan coba lagi ya!`);
  }
}
