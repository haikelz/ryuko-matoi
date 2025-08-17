import { api } from "@/configs/axios";
import { logger } from "@/configs/logger";
import { bulan, hari, tahun } from "@/utils/date";
import { QURAN_API_URL } from "@/utils/env";
import { WAIT_MESSAGE } from "@/utils/string";
import { Client, Message } from "whatsapp-web.js";

export async function getJadwalSholat(
  text: string,
  message: Message,
  client: Client
): Promise<Message> {
  const date: string = `${tahun}/${bulan}/${hari}`;
  const target: string = `${text.split(" ").slice(1).join(" ").toLowerCase()}`;
  const indonesianDate = new Date().toLocaleDateString("id-Id", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  client.sendMessage(message.from, WAIT_MESSAGE);

  if (target.length <= 2) {
    if (target.length === 0) {
      logger.info(`User ${message.from} is requesting jadwal sholat by default`);
      return message.reply(
        "Ini adalah perintah untuk mendapatkan jadwal sholat sesuai dengan nama daerah yang dimasukkan. Cukup ketik *!jadwalsholat <your_daerah>*",
        message.from
      );
    }

    logger.error(`Get jadwal sholat failed: ${target} from ${message.from}`);
    return message.reply(
      "Maaf, panjang karakter daerah yang dimasukkan tidak boleh kurang dari atau sama dengan 2!",
      message.from
    );
  }

  try {
    const getId = await api
      .get(`${QURAN_API_URL}/v2/sholat/kota/cari/${target}`)
      .then((res) => res.data.data[0].id);

    const response = await api
      .get(`${QURAN_API_URL}/v2/sholat/jadwal/${getId}/${date}`)
      .then((res) => res.data);

    const { imsak, subuh, terbit, dhuha, dzuhur, ashar, maghrib, isya } = response.data.jadwal;

    logger.info(`User ${message.from} is requesting jadwal sholat by name: ${target}`);
    return message.reply(
      `*Jadwal Sholat hari ini, ${indonesianDate} di Kota ${
        target[0].toUpperCase() + target.slice(1).toLowerCase()
      }*

Imsak = ${imsak}  
Subuh = ${subuh}   
Terbit = ${terbit}  
Dhuha = ${dhuha}  
Dzuhur = ${dzuhur}  
Ashar = ${ashar}  
Maghrib = ${maghrib}
Isya = ${isya}`,
      message.from
    );
  } catch (err) {
    logger.error(`Error in getJadwalSholat from ${message.from}: ${err}`);
    return message.reply(`Wah error nih, silahkan coba lagi ya!`, message.from);
  }
}
