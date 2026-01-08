import { GoogleGenAI, Type } from "@google/genai";
import { FocusAdvice, Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFocusAdvice = async (distraction: string, language: Language): Promise<FocusAdvice> => {
  try {
    const langPrompt = language === 'ru' 
      ? "Answer in Russian language." 
      : "Answer in English language.";

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `The user is struggling with this distraction: "${distraction}". 
      Act as a high-end digital wellness coach (like the voice of the Opal app). 
      ${langPrompt}
      Provide a short, philosophical "mantra" (under 15 words) that inspires focus, 
      and one concrete, immediate "action" (under 20 words) to take back control.`,
      config: {
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

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as FocusAdvice;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      mantra: language === 'ru' ? "Фокус — это выбор, который ты делаешь каждую секунду." : "Focus is a choice you make every second.",
      action: language === 'ru' ? "Отключи телефон на 10 минут прямо сейчас." : "Turn off your phone for 10 minutes right now."
    };
  }
};