import { api } from "@/configs/axios";
import { logger } from "@/configs/logger";
import { ANIME_QUOTE_API_URL } from "@/utils/env";
import { WAIT_MESSAGE } from "@/utils/string";
import axios from "axios";
import { Client, Message } from "whatsapp-web.js";

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
      const response = await api
        .get(`${ANIME_QUOTE_API_URL}/api/getbyanime?anime=${anime}&page=1`)
        .then((res) => res.data.result);

      logger.info(`User ${message.from} is requesting anime quote by anime name: ${anime}`);
      return message.reply(
        response.map((value: QuoteByAnimeProps) => `- ${value.indo}`).join("\n\n"),
        message.from
      );
    }

    /**
     * - Jika user tidak memberikan nama animenya,
     *   maka get resultnya secara random(dari anime manapun)
     */
    const response = await axios
      .get(`${ANIME_QUOTE_API_URL}/api/getrandom`)
      .then((res) => res.data.result);

    logger.info(`User ${message.from} is requesting random anime quote`);
    return message.reply(
      response.map((value: QuoteByAnimeProps) => `*${value.anime}*\n- ${value.indo}`).join("\n\n"),
      message.from
    );
  } catch (err) {
    logger.error(`Error in getAnimeQuote from ${message.from}: ${err}`);
    return message.reply(`Wah error nih, silahkan coba lagi ya!`, message.from);
  }
}
