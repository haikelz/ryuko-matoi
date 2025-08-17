/**
 * IMPORTANT
 * Since the API is no longer working, I don't use this command/feature anymore
 */
import { api } from "@/configs/axios";
import { DISTRO_INFO_API_URL } from "@/utils/env";
import { WAIT_MESSAGE } from "@/utils/string";
import { Client, Message } from "whatsapp-web.js";

export async function getDistroInfo(
  text: string,
  message: Message,
  client: Client
): Promise<Message> {
  const distro: string = `${text.split(" ").slice(1).join(" ")}`;

  client.sendMessage(message.from, WAIT_MESSAGE);

  if (distro.length <= 2) {
    if (distro.length === 0) {
      return message.reply(
        "Ini adalah perintah untuk mencari informasi tentang Linux Distro yang diinginkan. Cukup ketik *!distro <nama_distro>*",
        message.from
      );
    }

    return message.reply(
      "Maaf, panjang karakter nama distro yang dimasukkan tidak boleh kurang dari atau sama dengan 2!",
      message.from
    );
  }

  try {
    const result = await api
      .get(`${DISTRO_INFO_API_URL}/api/v2/distributions/${distro}`)
      .then((res) => res.data);

    return message.reply(
      `
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
`,
      message.from
    );
  } catch (err) {
    return message.reply(`Wah error nih, silahkan coba lagi ya!`, message.from);
  }
}
