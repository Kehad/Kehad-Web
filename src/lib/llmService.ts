import { GoogleGenAI } from '@google/genai';
import { PORTFOLIO_KNOWLEDGE, SYSTEM_PROMPT } from './portfolioData';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export async function sendChatMessage(
  userPrompt: string,
  history: ChatMessage[] = []
): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // If no Gemini API key is configured in .env, use smart local fallback
  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY' || apiKey.trim() === '') {
    return getFallbackResponse(userPrompt);
  }

  try {
    // Initialize Official GoogleGenAI SDK
    const ai = new GoogleGenAI({ apiKey });

    // Format conversation history for Gemini API
    const contents = history.map((msg) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    }));

    contents.push({
      role: 'user',
      parts: [{ text: userPrompt }],
    });

    // Valid Google Gemini API models to try in order
    const validModels = ['gemini-3.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];

    for (const modelName of validModels) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: contents as any,
          config: {
            systemInstruction: SYSTEM_PROMPT,
            temperature: 0.3,
            // maxOutputTokens: 200,
          },
        });

        if (response?.text) {
          return response.text;
        }
      } catch (modelErr) {
        console.warn(`Model ${modelName} attempt error:`, modelErr);
      }
    }

    return getFallbackResponse(userPrompt);
  } catch (error) {
    console.error('Error in GoogleGenAI SDK execution:', error);
    return getFallbackResponse(userPrompt);
  }
}

/**
 * Short & direct fallback responses when API key is unconfigured or fails
 */
function getFallbackResponse(prompt: string): string {
  const lower = prompt.toLowerCase();

  if (lower.includes('skill') || lower.includes('stack') || lower.includes('technolog') || lower.includes('language')) {
    return `**Tech Stack:**\n` +
      `• **Frontend:** React 19, Next.js, TypeScript, Tailwind, Redux\n` +
      `• **3D Web:** Three.js, React Three Fiber, WebGL, Blender\n` +
      `• **Backend:** Node.js, Express, Python, Git`;
  }

  if (lower.includes('service') || lower.includes('offer') || lower.includes('do') || lower.includes('hire') || lower.includes('work')) {
    return `**Services Offered:**\n` +
      `1. **Frontend Dev:** High-performance React/Next.js apps.\n` +
      `2. **3D Web Dev:** Interactive Three.js/WebGL experiences.\n` +
      `3. **UI/UX Design:** Dark-mode glassmorphic web design.`;
  }

  if (lower.includes('contact') || lower.includes('email') || lower.includes('reach') || lower.includes('twitter') || lower.includes('github') || lower.includes('linkedin')) {
    return `**Contact Kehinde:**\n` +
      `• **Email:** keahnney01@gmail.com\n` +
      `• **GitHub:** [github.com/Kehad](${PORTFOLIO_KNOWLEDGE.socials.github})\n` +
      `• **LinkedIn:** [linkedin.com/in/kehinde-adigun](${PORTFOLIO_KNOWLEDGE.socials.linkedin})\n` +
      `• **Twitter:** [@devKehad](${PORTFOLIO_KNOWLEDGE.socials.twitter})`;
  }

  if (lower.includes('project') || lower.includes('work') || lower.includes('portfolio') || lower.includes('experience')) {
    return `Kehinde builds 3D web applications, interactive rooms, and full-stack React/Next.js projects. Check out the featured projects section above!`;
  }

  if (lower.includes('resume') || lower.includes('cv') || lower.includes('download')) {
    return `Download Kehinde's resume directly via the **Resume** button in the top Hero section, or email **keahnney01@gmail.com**.`;
  }

  return `Kehad AI: I answer questions about Kehinde's **skills**, **3D web projects**, **services**, and **contact info**. What do you need?`;
}
