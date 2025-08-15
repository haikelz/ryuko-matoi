import { Client, Message } from "whatsapp-web.js";
import { gemini } from "../configs/gemini";
import { WAIT_MESSAGE, WRONG_FORMAT } from "../utils/constants";

type ResultProps = {
  success: boolean;
  data: string;
  message: string;
};

async function GeminiRequest(text: string) {
  const result: ResultProps = {
    success: false,
    data: "Maaf, saya tidak tau jawabannya",
    message: "",
  };

  const data = await gemini.models
    .generateContent({ model: "gemini-2.0-flash", contents: text })
    .then((response) => {
      const { data } = response;

      if (data && data.length) {
        result.success = true;
        result.data = ":fasdfasdf";
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

    const response: ResultProps = await GeminiRequest(question);

    if (!response.success) return message.reply(response.message);

    return message.reply(response.data);
  } catch (err) {
    return message.reply(`Wah error nih, silahkan coba lagi ya!`);
  }
}
