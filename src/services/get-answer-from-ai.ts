import OpenAI from "openai";
import { Client, Message } from "whatsapp-web.js";
import { OPEN_AI_API_KEY, WAIT_MESSAGE, WRONG_FORMAT } from "../utils/constants";

type ResultProps = {
  success: boolean;
  data: string;
  message: string;
};

async function ChatGPTRequest(text: string) {
  const openai = new OpenAI({
    apiKey: OPEN_AI_API_KEY,
  });

  const result: ResultProps = {
    success: false,
    data: "Maaf, saya tidak tau jawabannya",
    message: "",
  };

  return await openai.chat.completions
    .create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: text,
        },
      ],
      store: true,
    })
    .then((response) => {
      const { choices } = response;

      if (choices && choices.length) {
        result.success = true;
        result.data = choices[0].message.content as string;
      }

      return result;
    })
    .catch(() => {
      result.message = `Wah error nih, silahkan coba lagi ya!`;
      return result;
    });
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

    const response: ResultProps = await ChatGPTRequest(question);

    if (!response.success) return message.reply(response.message);

    return message.reply(response.data);
  } catch (err) {
    return message.reply(`Wah error nih, silahkan coba lagi ya!`);
  }
}
