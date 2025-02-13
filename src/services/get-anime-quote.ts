import axios from "axios";
import { Client, Message } from "whatsapp-web.js";
import { ANIME_QUOTE_API_URL, WAIT_MESSAGE } from "../utils/constants";

type QuoteByAnimeProps = {
  id: number;
  english: string;
  indo: string;
  character: string;
  anime: string;
};

export async function getAnimeQuote(
  text: string,
  message: Message,
  client: Client
): Promise<Message> {
  const anime: string = text.split(" ").slice(1).join(" ").toLowerCase();

  client.sendMessage(message.from, WAIT_MESSAGE);

  try {
    /**
     * - Jika user mengetikkan nama animenya,
     *   maka eksekusi kode di dalam if agar mendapatkan result sesuai nama anime
     */
    if (anime.length) {
      const response = await axios
        .get(`${ANIME_QUOTE_API_URL}/api/getbyanime?anime=${anime}&page=1`)
        .then((res) => res.data.result);

      return message.reply(
        response.map((value: QuoteByAnimeProps) => `- ${value.indo}`).join("\n\n")
      );
    }

    /**
     * - Jika user tidak memberikan nama animenya,
     *   maka get resultnya secara random(dari anime manapun)
     */
    const response = await axios
      .get(`${ANIME_QUOTE_API_URL}/api/getrandom`)
      .then((res) => res.data.result);

    return message.reply(
      response.map((value: QuoteByAnimeProps) => `*${value.anime}*\n- ${value.indo}`).join("\n\n")
    );
  } catch (err) {
    return message.reply(`Wah error nih, silahkan coba lagi ya!`);
  }
}
