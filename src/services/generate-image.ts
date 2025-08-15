import { Client, Message, MessageMedia } from "whatsapp-web.js";
import { gemini } from "../configs/gemini";
import { WAIT_MESSAGE } from "../utils/constants";

/**
 * IMPORTANT
 * The Unsplash Random Image URL is deprecated. Instead, I use Gemini to generate random image.
 */
export async function generateImage(
  text: string,
  message: Message,
  client: Client
): Promise<Message> {
  const command: string = `${text.split(" ").slice(1).join(" ").toLowerCase()}`;
  const type: string = `${text.split(" ").slice(1).join(" ").toLowerCase()}`;

  client.sendMessage(message.from, WAIT_MESSAGE);

  if (command === "info") {
    return message.reply(
      "Ini adalah perintah untuk generate gambar. Ketik *!generateimage <prompt>* dan lihat hasilnya!"
    );
  }

  try {
    if (message.hasQuotedMsg) {
      const quotedMsg = await message.getQuotedMessage();
      const media = await quotedMsg.downloadMedia();

      const data = await gemini.models.generateImages({
        model: "gemini-2.5-pro",
        prompt: media.data,
      });
      const result = data?.generatedImages?.[0]?.image as MessageMedia;

      return message.reply(result, message.from, { caption: type });
    }

    const data = await gemini.models.generateImages({ model: "gemini-2.5-pro", prompt: text });
    const result = data?.generatedImages?.[0]?.image as MessageMedia;

    return message.reply(result, message.from, { caption: type });
  } catch (err) {
    console.log(err);
    return message.reply(`Wah error nih, silahkan coba lagi ya!`);
  }
}
