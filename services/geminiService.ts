
import { GoogleGenAI } from "@google/genai";

export const getDailyBriefing = async (userName: string, barangayName: string = "Starlight Haven"): Promise<string> => {
  try {
    // FIX: Removed API key check per coding guidelines.
    // The key is assumed to be present in the environment.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `
      You are the AI for the Barangay Starship "BSS ${barangayName}", a futuristic barangay management system. 
      The user, ${userName}, has just logged into the command center dashboard. 
      Generate a short, inspiring, and slightly sci-fi "Captain's Daily Briefing".
      
      Include the following elements:
      1. A formal but inspiring greeting to the user.
      2. A fictional, positive status update on one or two key community metrics (e.g., "life support stable at 100%", "community morale is high", "resource allocation optimal").
      3. A motivational closing statement.
      
      Keep it concise, under 100 words. Format it using Markdown.
      Example Tone: Star Trek captain's log, futuristic mission control.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error fetching daily briefing from Gemini API:", error);
    return `**COMMUNICATION INTERFERENCE**

    We're experiencing unexpected solar flare activity, disrupting our connection to the AI core. The system is operating on local backups. Please try again later.
    
    *Error logged for diagnostics.*`;
  }
};
