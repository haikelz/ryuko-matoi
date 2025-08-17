import { GEMINI_API_KEY } from "@/utils/env";
import { GoogleGenAI } from "@google/genai";

export const gemini = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
  apiVersion: "v1",
});
