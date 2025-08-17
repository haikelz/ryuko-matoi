import axios from "axios";
import { Client, Message, MessageMedia } from "whatsapp-web.js";
import { JOKES_API_URL } from "../utils/env";
import { WAIT_MESSAGE } from "../utils/string";

export async function getRandomJokes(message: Message, client: Client): Promise<Message> {
  client.sendMessage(message.from, WAIT_MESSAGE);

  try {
    const randomText = await axios
      .get(`${JOKES_API_URL}/api/text/random`)
      .then((res) => res.data.data);
    const randomImage = await axios
      .get(`${JOKES_API_URL}/api/image/random`)
      .then((res) => res.data.data.url);
    const media: MessageMedia = await MessageMedia.fromUrl(randomImage);

    return message.reply(media, message.from, {
      caption: randomText,
    });
  } catch (err) {
    return message.reply(`Wah error nih, silahkan coba lagi ya!`, message.from);
  }
}
