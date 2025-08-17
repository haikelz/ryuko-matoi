import { api } from "@/configs/axios";
import { logger } from "@/configs/logger";
import { REMOVE_BG_API_KEY, REMOVE_BG_API_URL } from "@/utils/env";
import { WAIT_MESSAGE, WRONG_FORMAT } from "@/utils/string";
import { Chat, Client, Message, MessageMedia } from "whatsapp-web.js";

type ResultProps = {
  success: boolean;
  base64: null;
  message: string;
};

async function editBackgroundPhotoRequest(base64: string, bgColor: string): Promise<ResultProps> {
  const result: ResultProps = {
    success: false,
    base64: null,
    message: "",
  };

  return await api({
    method: "post",
    url: `${REMOVE_BG_API_URL}/v1.0/removebg`,
    data: {
      image_file_b64: base64,
      bg_color: bgColor,
    },
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-Api-Key": REMOVE_BG_API_KEY,
    },
  })
    .then((response) => {
      if (response.status == 200) {
        result.success = true;
        result.base64 = response.data.data.result_b64;
      } else {
        result.message = `Response Failed! Status: ${response.status}`;
      }

      return result;
    })
    .catch(() => {
      result.message = `Wah error nih, silahkan coba lagi ya!`;
      return result;
    });
}

export async function editBackgroundPhoto(text: string, message: Message, client: Client) {
  client.sendMessage(message.from, WAIT_MESSAGE);

  try {
    const command: string = text.split(" ").slice(1).join(" ").toLowerCase();

    if (command.length <= 2) {
      if (command.length === 0) {
        logger.info(`User ${message.from} is editing background photo`);
        return message.reply(
          "Ini adalah perintah untuk mengubah warna background dari sebuah foto. Nama warna yang dimasukkan harus dalam bahasa Inggris.  Contoh: *!editphoto red*",
          message.from
        );
      }

      logger.error(`Edit background photo failed: ${command} from ${message.from}`);
      return message.reply(
        "Maaf, panjang karakter yang dimasukkan tidak boleh kurang dari atau sama dengan 2!",
        message.from
      );
    }

    if (!command) {
      logger.error(`Edit background photo failed: ${command} from ${message.from}`);
      return message.reply(`${WRONG_FORMAT}. Ketik *editphoto <warna>*`, message.from);
    }

    if (message.hasMedia) {
      if (message.type != "image") {
        logger.error(`Edit background photo failed: ${message.type} from ${message.from}`);
        return message.reply("Maaf! Sepertinya file yang kamu berikan bukan gambar", message.from);
      }

      const media: MessageMedia = await message.downloadMedia();

      if (media) {
        const chat: Chat = await message.getChat();
        const color = command;
        const newPhoto = await editBackgroundPhotoRequest(media.data, color);

        if (!newPhoto.success) {
          logger.error(`Edit background photo failed: ${newPhoto.message} from ${message.from}`);
          return message.reply(
            "Terjadi kesalahan saat mengedit gambar. Silahkan coba lagi!",
            message.from
          );
        }

        media.data = newPhoto.base64 === null ? "" : newPhoto.base64;
        logger.info(`User ${message.from} is editing background photo`);
        return chat.sendMessage(media, { caption: "Hasilnya" });
      }
    }
  } catch (err) {
    logger.error(`Error in editBackgroundPhoto from ${message.from}: ${err}`);
    return message.reply(`Wah error nih, silahkan coba lagi ya!`, message.from);
  }
}
