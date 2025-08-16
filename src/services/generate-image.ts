import { HarmBlockThreshold, HarmCategory, Modality } from "@google/genai";
import { Client, Message, MessageMedia } from "whatsapp-web.js";
import { gemini } from "../configs/gemini";
import { WAIT_MESSAGE } from "../utils/constants";

/**
 * IMPORTANT
 * The Unsplash Random Image URL is deprecated. Instead, I use Gemini to generate random image.
 * TODO: make it work with gemini-2.5-pro
 */
export async function generateImage(
  text: string,
  message: Message,
  client: Client
): Promise<Message | undefined> {
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
        config: {
          aspectRatio: "16:9",
          addWatermark: true,
        },
      });
      const result = data?.generatedImages?.[0]?.image as MessageMedia;

      return message.reply(result, message.from, { caption: type });
    }

    const data = await gemini.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: text,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_IMAGE_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
          },
        ],
      },
    });

    for (const part of data?.candidates?.[0]?.content?.parts || []) {
      if (part.text) {
        console.log(part.text);
      } else if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData as string, "base64");
        const media = await MessageMedia.fromUrl(imageData as string, buffer as any);
        return message.reply(media, message.from, { caption: type });
      }
    }
  } catch (err) {
    console.error(err);
    return message.reply(`Wah error nih, silahkan coba lagi ya!`);
  }
}
