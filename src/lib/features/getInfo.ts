import { Message } from "whatsapp-web.js";

export const getInfo = async (text: string, message: Message) => {
  return message.reply(`
\t*Ryuko Matoi*\t\t

\t*Menu:*\t\t
\t!salam\t\t
\t!info\t\t
\t!ask\t\t
\t!editphoto\t\t
\t!jadwalsholat\t\t
\t!sticker\t\t
\t!image\t\t
\t!distro\t\t
\t!animequote\t\t
`);
};
