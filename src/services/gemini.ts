import { gemini } from "@/configs/gemini";
import { logger } from "@/configs/logger";
import { WAIT_MESSAGE, WRONG_FORMAT } from "@/utils/string";
import { Client, Message } from "whatsapp-web.js";

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
      logger.info(question);
      return message.reply(
        "Ini adalah perintah untuk mendapatkan jawaban dari AI. Cukup ketik *!ask <your_pertanyaan>*"
      );
    }

    client.sendMessage(message.from, WAIT_MESSAGE);

    if (!question) {
      logger.error(`Get answer from AI failed: ${question} from ${message.from}`);
      return message.reply(`${WRONG_FORMAT} Ketik *!ask <your question>*`);
    }

    const response: ResultProps = await GeminiRequest(message, question);

    if (!response.success) {
      logger.error(`Get answer from AI failed: ${response.message} from ${message.from}`);
      return message.reply(response.message);
    }

    logger.info(`User ${message.from} is requesting answer from AI`);
    return message.reply(response.data, message.from);
  } catch (err) {
    logger.error(`Error in getAnswerFromAI from ${message.from}: ${err}`);
    return message.reply(`Wah error nih, silahkan coba lagi ya!`, message.from);
  }
}
