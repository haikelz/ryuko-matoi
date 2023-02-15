import axios from "axios";
import { Client, Message } from "whatsapp-web.js";
import {
  OPEN_AI_API_KEY,
  errorMessage,
  waitMessage,
  wrongFormat,
} from "../utils/constants";

type ResultProps = {
  success: boolean;
  data: string;
  message: string;
};

const ChatGPTRequest = async (text: string) => {
  const result: ResultProps = {
    success: false,
    data: "Maaf, saya tidak tau jawabannya",
    message: "",
  };

  return await axios({
    method: "POST",
    url: "https://api.openai.com/v1/completions",
    data: {
      model: "text-davinci-003",
      prompt: text,
      max_tokens: 1000,
      temperature: 0,
    },
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "Accept-Language": "in-ID",
      Authorization: `Bearer ${OPEN_AI_API_KEY}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        const { choices } = response.data;

        if (choices && choices.length) {
          result.success = true;
          result.data = choices[0].text;
        }
      } else {
        result.message = "Response Gagal!";
      }
      return result;
    })
    .catch((error: Error) => {
      result.message = `${errorMessage} ${error.message}`;
      return result;
    });
};

export const getAnswerFromAI = async (
  text: string,
  message: Message,
  client: Client
): Promise<Message> => {
  const question: string = text.split(" ").slice(1).join(" ");

  if (question.length === 0) {
    return message.reply(
      "Ini adalah perintah untuk mendapatkan jawaban dari AI ChatGPT. Cukup ketik *!ask <your_pertanyaan>*"
    );
  }

  client.sendMessage(message.from, waitMessage);

  if (!question) {
    return message.reply(`${wrongFormat} Ketik *!ask <your question>*`);
  }

  const response: ResultProps = await ChatGPTRequest(question);

  if (!response.success) return message.reply(response.message);

  return message.reply(response.data);
};
