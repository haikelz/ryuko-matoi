import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "../utils/env";

export const gemini = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
  apiVersion: "v1",
});
