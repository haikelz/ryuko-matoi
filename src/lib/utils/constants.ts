import dotenv from "dotenv";

dotenv.config();

// API KEY
export const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY;
export const REMOVE_BG_API_KEY: string | undefined = process.env.REMOVE_BG_API_KEY;

// message
export const waitMessage: string = "Sedang memproses....";
export const wrongFormat: string = "Format yang dimasukkan Salah!";
export const errorMessage: string = "Error!";
