import axios from "axios";
import { Client, Message } from "whatsapp-web.js";
import { waitMessage } from "../utils/constants";

export const getDistroInfo = async (text: string, message: Message, client: Client) => {
  const distro: string = `${text.split(" ").slice(1).join(" ")}`;

  client.sendMessage(message.from, waitMessage);

  if (distro.length <= 2) {
    if (distro.length === 0) {
      return message.reply(
        "Ini adalah perintah untuk mencari informasi tentang Linux Distro yang diinginkan. Cukup ketik *!distro <nama_distro>*"
      );
    }

    return message.reply(
      "Maaf, panjang karakter nama distro yang dimasukkan tidak boleh kurang dari atau sama dengan 2!"
    );
  }

  try {
    const result = await axios
      .get(`https://diwa.demo-web-fahmi.my.id/api/v2/distributions/${distro}`)
      .then((res) => res.data);

    return message.reply(`
*About:*
${result.about}

*Architectures:*
${result.architectures.map((value: string) => `- ${value}`).join("\n")}

*Available Desktop Environment:*
${result.desktop_environments.map((value: string) => `- ${value}`).join("\n")}

*Documentation:*
${result.documentations.map((value: string) => `- ${value}`).join("\n")}

*Download ${result.distribution}:*
${result.download_mirrors.map((value: string) => `- ${value}`).join("\n")}
`);
  } catch (err) {
    message.reply(`${err}`);
  }
};
