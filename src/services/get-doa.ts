import axios from "axios";
import { Client, Message } from "whatsapp-web.js";
import { DOA_API_URL, WAIT_MESSAGE } from "../utils/constants";

type DoaProps = {
  id: string;
  doa: string;
  ayat: string;
  latin: string;
  artinya: string;
};

export async function getDoa(text: string, message: Message, client: Client): Promise<Message> {
  const command: string = `${text.split(" ").slice(1).join(" ").toLowerCase()}`;
  client.sendMessage(message.from, WAIT_MESSAGE);

  if (command === "info") {
    return message.reply(
      "Ini adalah perintah untuk mendapatkan Do'a secara spesifik, maupun secara random. Ketik *!doa* untuk mendapatkan hasil random, dan *!doa semua* untuk mendapatkan semua"
    );
  }

  try {
    const randomDoa = await axios.get(`${DOA_API_URL}/api/doa/v1/random`).then((res) => res.data);

    // bila command yang diberikan kosong
    if (command === "") {
      return message.reply(
        randomDoa
          .map(
            (value: DoaProps) =>
              `*${value.doa}*:
      
${value.ayat}
Artinya: ${value.artinya}`
          )
          .join("\n")
      );
    }

    const semuaDoa = await axios
      .get("https://doa-doa-api-ahmadramadhan.fly.dev/api")
      .then((res) => res.data);

    // bila command = semua
    if (command === "semua") {
      return message.reply(
        semuaDoa
          .map(
            (value: DoaProps) =>
              `*${value.doa}*:    
${value.ayat}
Artinya: ${value.artinya}`
          )
          .join("\n\n")
      );
    }

    // buat nyari doa sesuai keinginan user. Hasilnya langsung berupa object bukan array of object lagi
    const targetDoa: DoaProps = await axios
      .get(`https://doa-doa-api-ahmadramadhan.fly.dev/api/doa/${command}`)
      .then((res) => res.data);
    return message.reply(
      `*${targetDoa.doa}*:    

${targetDoa.ayat}
Artinya: ${targetDoa.artinya}`
    );
  } catch (err) {
    return message.reply(`Wah error nih, silahkan coba lagi ya!`);
  }
}
