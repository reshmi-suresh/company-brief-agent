export const maxDuration = 60;

import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const { prompt, company, contact, role, additionalInfo } = await req.json();

  const stream = client.messages.stream({
    model: "claude-opus-4-5",
    max_tokens: 8192,
    messages: [
      {
        role: "user",
        content: `You are Agent 2 — a senior research analyst producing a strategic company briefing document. 

Use the following research brief to produce a comprehensive, well-structured document about ${company}.

RESEARCH BRIEF:
${prompt}
${additionalInfo?.trim() ? `\nADDITIONAL CONTEXT FROM USER:\n${additionalInfo.trim()}\n` : ""}

REQUIREMENTS:
- Produce a 20-25 page equivalent document (aim for 4,000-5,000 words)
- Write in full sentences — no bullet-heavy walls of text
- Structure with clear section headers
- Flag any speculative claims explicitly
- Include a role-specific section tailored for: ${role}
${contact ? `- Include a section with insights relevant to speaking with: ${contact}` : ""}
${additionalInfo?.trim() ? `- Incorporate the user's additional context where relevant throughout the document` : ""}
- End with a "Self-Upskilling" section: 3-5 resources to go deeper (with URLs where possible)
- Title format: "${company} Strategic Briefing Document"

Begin the document now.`,
      },
    ],
  });

  const readableStream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });

  return new Response(readableStream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
