import { logger } from "@/configs/logger";
import { WAIT_MESSAGE } from "@/utils/string";
import { Client, Message } from "whatsapp-web.js";

export async function getSalam(message: Message, client: Client): Promise<Message> {
  client.sendMessage(message.from, WAIT_MESSAGE);

  logger.info(`User ${message.from} is requesting salam`);
  return message.reply("Assalamu'alaikum", message.from);
}
