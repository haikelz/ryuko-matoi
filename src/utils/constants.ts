import dotenv from "dotenv";

dotenv.config();

// API KEY from .env
export const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY as string;
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY as string;
export const REMOVE_BG_API_KEY = process.env.REMOVE_BG_API_KEY as string;
export const REMOVE_BG_API_URL = process.env.REMOVE_BG_API_URL as string;
export const JOKES_API_URL = process.env.JOKES_API_URL as string;
export const ANIME_QUOTE_API_URL = process.env.ANIME_QUOTE_API_URL as string;
export const DISTRO_INFO_API_URL = process.env.DISTRO_INFO_API_URL as string;
export const DOA_API_URL = process.env.DOA_API_URL as string;
export const QURAN_API_URL = process.env.QURAN_API_URL as string;
export const IMAGE_API_URL = process.env.IMAGE_API_URL as string;
export const ASMAUL_HUSNA_API = process.env.ASMAUL_HUSNA_API as string;

// Format Message
export const WAIT_MESSAGE: string = "Sedang memproses....";
export const WRONG_FORMAT: string = "Format yang dimasukkan Salah!";
export const ERROR_MESSAGE: string = "Error!";
