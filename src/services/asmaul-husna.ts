import axios from "axios";
import slugify from "slugify";
import { Client, Message } from "whatsapp-web.js";
import { ASMAUL_HUSNA_API_URL } from "../utils/env";
import { WAIT_MESSAGE } from "../utils/string";

type AsmaulHusna = {
  urutan: number;
  arab: string;
  latin: string;
  arti: string;
};

export async function getAsmaulHusna(
  text: string,
  message: Message,
  client: Client
): Promise<Message> {
  const command: string = `${text.split(" ").slice(1).join(" ").toLowerCase()}`;

  client.sendMessage(message.from, WAIT_MESSAGE);

  try {
    if (command === "info") {
      return message.reply(
        `Ini adalah perintah untuk mendapatkan Asmaul Husna.\n      
- Masukkan nomor urut untuk mendapatkan Asma'ul Husna berdasarkan nomor urut.
- Masukkan nama latin untuk mendapatkan Asma'ul Husna berdasarkan nama latin.
- Biarkan kosong untuk mendapatkan semua daftar Asma'ul Husna.`,
        message.from
      );
    }

    if (command === "") {
      const response = await axios.get(`${ASMAUL_HUSNA_API_URL}/api/all`);
      return message.reply(
        `
        ${response.data.data
          .map(
            (item: AsmaulHusna) =>
              `
${item.urutan} - ${item.arab}
${item.latin}
${item.arti}
        `
          )
          .join("\n")}
        `,
        message.from
      );
    }

    if (Number.isInteger(Number(command))) {
      const response = await axios.get(`${ASMAUL_HUSNA_API_URL}/api/${command}`);
      return message.reply(
        `
${response.data.data.urutan} - ${response.data.data.arab}
${response.data.data.latin}
${response.data.data.arti}
        `,
        message.from
      );
    }

    const response = await axios.get(
      `${ASMAUL_HUSNA_API_URL}/api/latin/${slugify(command, { lower: true })}`
    );

    return message.reply(
      `
${response.data.data.urutan} - ${response.data.data.arab}
${response.data.data.latin}
${response.data.data.arti}
      `,
      message.from
    );
  } catch (err) {
    return message.reply(`Wah error nih, silahkan coba lagi ya!`, message.from);
  }
}
