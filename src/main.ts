import qrcode from "qrcode-terminal";
import { Client, Message } from "whatsapp-web.js";
import { waWebConfig } from "./configs/wa-web";
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
} from "./services";

async function main() {
  const client = new Client(waWebConfig);

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
    if (text.startsWith("!info")) await getInfo(message);

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
}

main();
