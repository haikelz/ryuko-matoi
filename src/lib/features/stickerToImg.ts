import { Client, Message } from "whatsapp-web.js";

export const toImg = {}; /*async (message: Message, client: Client) => {
  const quotedMessage = await message
    .getQuotedMessage()
    .then(async (msg) => await msg.downloadMedia());

  return message.reply(quotedMessage, message.from, {
    sendMediaAsDocument: true,
  });
};
*/
