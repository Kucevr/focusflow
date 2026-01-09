import { GoogleGenAI, Type } from "@google/genai";
import { FocusAdvice, Language } from "../types";

export const getFocusAdvice = async (distraction: string, language: Language): Promise<FocusAdvice> => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || "";

  // If no API key is set, return a fallback immediately without calling the SDK
  if (!apiKey || apiKey === "undefined" || apiKey === "") {
    console.warn("Gemini API Key is missing. Returning fallback advice.");
    return {
      mantra: language === 'ru' ? "Фокус — это выбор, который ты делаешь каждую секунду." : "Focus is a choice you make every second.",
      action: language === 'ru' ? "Отключи телефон на 10 минут прямо сейчас." : "Turn off your phone for 10 minutes right now."
    };
  }

  try {
    const ai = new GoogleGenAI(apiKey);
    const langPrompt = language === 'ru' 
      ? "Answer in Russian language." 
      : "Answer in English language.";

    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [{
          text: `The user is struggling with this distraction: "${distraction}". 
          Act as a high-end digital wellness coach (like the voice of the Opal app). 
          ${langPrompt}
          Provide a short, philosophical "mantra" (under 15 words) that inspires focus, 
          and one concrete, immediate "action" (under 20 words) to take back control.`
        }]
      }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            mantra: { type: Type.STRING },
            action: { type: Type.STRING },
          },
          required: ["mantra", "action"],
        },
      },
    });

    const text = result.response.text();
    return JSON.parse(text) as FocusAdvice;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      mantra: language === 'ru' ? "Фокус — это выбор, который ты делаешь каждую секунду." : "Focus is a choice you make every second.",
      action: language === 'ru' ? "Отключи телефон на 10 минут прямо сейчас." : "Turn off your phone for 10 minutes right now."
    };
  }
};