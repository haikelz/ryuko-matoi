import qrcode from "qrcode-terminal";
import { Client, LocalAuth, Message } from "whatsapp-web.js";
import {
  createSticker,
  editPhoto,
  getAnimeQuote,
  getAnswerFromAI,
  getDistroInfo,
  getDoa,
  getInfo,
  getJadwalSholat,
  getRandomImage,
  getRandomJokes,
} from "./lib/features";

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr: string) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client udah siap!");
});

client.on("message", async (message: Message) => {
  const text: string = message.body.toLowerCase() || "";

  // cek status bot dengan !salam
  if (text === "!salam") message.reply(`Assalamu'alaikum ${text} :)`);

  if (text.startsWith("!info")) await getInfo(text, message);

  // hapus background
  if (text.startsWith("!editphoto")) await editPhoto(text, message, client);

  // Chat GPT
  if (text.startsWith("!ask")) await getAnswerFromAI(text, message, client);

  // Jadwal Sholat
  if (text.startsWith("!jadwalsholat") || text.startsWith("!sholat"))
    await getJadwalSholat(text, message, client);

  // sticker
  if (text.startsWith("!sticker") || text.startsWith("!s")) await createSticker(message, client);

  // sticker to img(WIP)
  // if (text.startsWith("!toimg")) await toImg(message, client);

  // random jokes
  if (text.startsWith("!jokes")) await getRandomJokes(text, message, client);

  // random images
  if (text.startsWith("!image")) await getRandomImage(text, message, client);

  // search linux distro
  if (text.startsWith("!distro")) await getDistroInfo(text, message, client);

  // get anime quote
  if (text.startsWith("!animequote")) await getAnimeQuote(text, message, client);

  // doa
  if (text.startsWith("!doa")) await getDoa(text, message, client);
});

client.initialize();
