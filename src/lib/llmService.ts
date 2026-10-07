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
    // Format conversation history for Gemini API
    const contents = history.map((msg) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    }));

    // Add current user prompt
    contents.push({
      role: 'user',
      parts: [{ text: userPrompt }],
    });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents: contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 600,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.warn('Gemini API Error, falling back:', errorData);
      return getFallbackResponse(userPrompt);
    }

    const data = await response.json();
    const replyText =
      data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (replyText) {
      return replyText;
    }

    return getFallbackResponse(userPrompt);
  } catch (error) {
    console.error('Error contacting Gemini API:', error);
    return getFallbackResponse(userPrompt);
  }
}

/**
 * Intelligent local fallback responder for when no Gemini API key is set
 */
function getFallbackResponse(prompt: string): string {
  const lower = prompt.toLowerCase();

  if (lower.includes('skill') || lower.includes('stack') || lower.includes('technolog') || lower.includes('language')) {
    return `**Kehinde's Core Skills & Tech Stack:**\n\n` +
      `• **Frontend:** React 19, Next.js, TypeScript, Tailwind CSS, Redux Toolkit, Framer Motion\n` +
      `• **3D Web:** Three.js, React Three Fiber (R3F), WebGL, Blender\n` +
      `• **Backend & Tools:** Node.js, Express, Python, Vite, Git\n\n` +
      `He specializes in combining high-performance frontend code with interactive 3D WebGL experiences!`;
  }

  if (lower.includes('service') || lower.includes('offer') || lower.includes('do') || lower.includes('hire') || lower.includes('work')) {
    return `**Kehinde Offers the Following Services:**\n\n` +
      `1. **Frontend Engineering:** Scalable React/Next.js/TypeScript applications with high performance.\n` +
      `2. **3D Web Development:** Immersive 3D environments, web interactive models, and Three.js setups.\n` +
      `3. **UI/UX Design:** Dark mode interfaces, glassmorphism, and responsive design systems.\n\n` +
      `Feel free to reach out via the **#contact** section or email him directly at **${PORTFOLIO_KNOWLEDGE.email}**!`;
  }

  if (lower.includes('contact') || lower.includes('email') || lower.includes('reach') || lower.includes('twitter') || lower.includes('github') || lower.includes('linkedin')) {
    return `**How to Contact Kehinde:**\n\n` +
      `• **Email:** [${PORTFOLIO_KNOWLEDGE.email}](mailto:${PORTFOLIO_KNOWLEDGE.email})\n` +
      `• **GitHub:** [github.com/Kehad](${PORTFOLIO_KNOWLEDGE.socials.github})\n` +
      `• **LinkedIn:** [linkedin.com/in/kehinde-adigun](${PORTFOLIO_KNOWLEDGE.socials.linkedin})\n` +
      `• **Twitter / X:** [@devKehad](${PORTFOLIO_KNOWLEDGE.socials.twitter})\n\n` +
      `You can also use the contact form at the bottom of the page!`;
  }

  if (lower.includes('project') || lower.includes('work') || lower.includes('portfolio') || lower.includes('experience')) {
    return `**Kehinde's Portfolio & Projects:**\n\n` +
      `Kehinde has built several 3D web applications, modern landing pages, interactive 3D rooms, and full-stack web applications. You can explore his featured projects right here on the portfolio page!\n\n` +
      `Would you like to know more about his 3D development or frontend engineering experience?`;
  }

  if (lower.includes('resume') || lower.includes('cv') || lower.includes('download')) {
    return `You can download Kehinde's resume directly from the **Hero Section** button at the top of the homepage, or contact him at **${PORTFOLIO_KNOWLEDGE.email}** for a detailed copy!`;
  }

  return `Hi! I'm **Kehinde's AI Assistant**. I can help answer questions about Kehinde Adigun (Kehad), his **skills** (React, Three.js, TypeScript), **3D web projects**, **services**, or **contact information**.\n\n` +
    `What would you like to know about his portfolio?`;
}
