import axios from "axios";
import { Chat, Client, Message, MessageMedia } from "whatsapp-web.js";
import { REMOVE_BG_API_KEY, waitMessage, wrongFormat } from "../utils/constants";

const editPhotoRequest = async (base64: string, bgColor: string) => {
  const result = {
    success: false,
    base64: null,
    message: "",
  };

  return await axios({
    method: "post",
    url: "https://api.remove.bg/v1.0/removebg",
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
    .catch((error) => {
      result.message = `Error! ${error.message}`;
      return result;
    });
};

export const editPhoto = async (text: string, message: Message, client: Client) => {
  const command: string = text.split(" ").slice(1).join(" ").toLowerCase();

  if (command.length <= 2) {
    if (command.length === 0) {
      return message.reply(
        "Ini adalah perintah untuk mengubah warna background dari sebuah foto. Cukup ketik *!editphoto <your_daerah>*"
      );
    }
    return message.reply(
      "Maaf, panjang karakter yang dimasukkan tidak boleh kurang dari atau sama dengan 2!"
    );
  }

  if (!command) return message.reply(`${wrongFormat}. Ketik *edit_bg <warna>*`);

  if (message.hasMedia) {
    if (message.type != "image") {
      return message.reply("Maaf! Sepertinya file yang kamu berikan bukan gambar");
    }

    client.sendMessage(message.from, waitMessage);
    const media: MessageMedia = await message.downloadMedia();

    if (media) {
      const chat: Chat = await message.getChat();
      const color = command;
      const newPhoto = await editPhotoRequest(media.data, color);

      if (!newPhoto.success) return message.reply("Terjadi kesalahan.");

      media.data = newPhoto.base64 === null ? "" : newPhoto.base64;
      chat.sendMessage(media, { caption: "Hasilnya" });
    }
  }
};
