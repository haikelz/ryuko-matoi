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
  puppeteer: { headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] },
});

client.on("qr", (qr: string) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client udah siap!");
});

client.on("message_create", async (message: Message) => {
  const text: string = message.body.toLowerCase() || "";

  // Cek status bot dengan !salam
  if (text.startsWith("!salam")) return message.reply("Assalamu'alaikum");

  // Info
  if (text.startsWith("!info")) await getInfo(text, message);

  // hapus background foto
  if (text.startsWith("!editphoto")) await editPhoto(text, message, client);

  // Open AI
  if (text.startsWith("!ask")) await getAnswerFromAI(text, message, client);

  // Jadwal Sholat
  if (text.startsWith("!jadwalsholat") || text.startsWith("!sholat"))
    await getJadwalSholat(text, message, client);

  // Sticker
  if (text.startsWith("!sticker") || text.startsWith("!s")) await createSticker(message, client);

  // Random jokes bapak-bapak
  if (text.startsWith("!jokes")) await getRandomJokes(message, client);

  // Random images from Unsplash
  if (text.startsWith("!image")) await getRandomImage(text, message, client);

  // Search linux distro
  if (text.startsWith("!distro")) await getDistroInfo(text, message, client);

  // Anime quote
  if (text.startsWith("!animequote")) await getAnimeQuote(text, message, client);

  // Kumpulan do'a
  if (text.startsWith("!doa")) await getDoa(text, message, client);
});

client.initialize();
