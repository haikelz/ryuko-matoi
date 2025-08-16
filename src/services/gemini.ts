import { HarmBlockThreshold, HarmCategory } from "@google/genai";
import { Client, Message } from "whatsapp-web.js";
import { gemini } from "../configs/gemini";
import { WAIT_MESSAGE, WRONG_FORMAT } from "../utils/constants";

type ResultProps = {
  success: boolean;
  data: string;
  message: string;
};

async function GeminiRequest(message: Message, text: string) {
  const result: ResultProps = {
    success: false,
    data: "Maaf, saya tidak tau jawabannya",
    message: "",
  };

  if (message.hasQuotedMsg) {
    const quotedMsg = await message.getQuotedMessage();
    const media = await quotedMsg.downloadMedia();

    if (media.mimetype.includes("image")) {
      const data = await gemini.models
        .generateContent({
          model: "gemini-2.5-pro",
          contents: [media.data, text],
          config: {
            safetySettings: [
              {
                category: HarmCategory.HARM_CATEGORY_IMAGE_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
              },
            ],
          },
        })
        .then((response) => {
          const { text } = response;

          if (text && text.length) {
            result.success = true;
            result.data = text;
          }

          return result;
        })
        .catch(() => {
          result.message = `Wah error nih, silahkan coba lagi ya!`;
          return result;
        });

      return data;
    }

    const data = await gemini.models
      .generateContent({
        model: "gemini-2.5-pro",
        contents: text,
        config: {
          safetySettings: [
            {
              category: HarmCategory.HARM_CATEGORY_IMAGE_HARASSMENT,
              threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
          ],
        },
      })
      .then((response) => {
        const { text } = response;

        if (text && text.length) {
          result.success = true;
          result.data = text;
        }

        return result;
      })
      .catch(() => {
        result.message = `Wah error nih, silahkan coba lagi ya!`;
        return result;
      });
    return data;
  }

  if (message.hasMedia) {
    const media = await message.downloadMedia();

    const data = await gemini.models
      .generateContent({
        model: "gemini-2.5-pro",
        contents: [media.data, text],
        config: {
          safetySettings: [
            {
              category: HarmCategory.HARM_CATEGORY_IMAGE_HARASSMENT,
              threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
          ],
        },
      })
      .then((response) => {
        const { text } = response;

        if (text && text.length) {
          result.success = true;
          result.data = text;
        }

        return result;
      })
      .catch(() => {
        result.message = `Wah error nih, silahkan coba lagi ya!`;
        return result;
      });

    return data;
  }

  const data = await gemini.models
    .generateContent({
      model: "gemini-2.5-pro",
      contents: text,
      config: {
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_IMAGE_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
          },
        ],
      },
    })
    .then((response) => {
      const { text } = response;

      if (text && text.length) {
        result.success = true;
        result.data = text;
      }

      return result;
    })
    .catch(() => {
      result.message = `Wah error nih, silahkan coba lagi ya!`;
      return result;
    });

  return data;
}

export async function getAnswerFromAI(
  text: string,
  message: Message,
  client: Client
): Promise<Message> {
  try {
    const question: string = text.split(" ").slice(1).join(" ");

    if (question.length === 0) {
      return message.reply(
        "Ini adalah perintah untuk mendapatkan jawaban dari AI ChatGPT. Cukup ketik *!ask <your_pertanyaan>*"
      );
    }

    client.sendMessage(message.from, WAIT_MESSAGE);

    if (!question) {
      return message.reply(`${WRONG_FORMAT} Ketik *!ask <your question>*`);
    }

    const response: ResultProps = await GeminiRequest(message, question);

    if (!response.success) return message.reply(response.message);

    return message.reply(response.data, message.from);
  } catch (err) {
    return message.reply(`Wah error nih, silahkan coba lagi ya!`);
  }
}
