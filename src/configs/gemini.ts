import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "../utils/constants";

export const gemini = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
  apiVersion: "v1",
});
