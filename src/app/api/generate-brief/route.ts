import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const { prompt, company, contact, role, additionalInfo } = await req.json();

  const message = await client.messages.create({
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

  const brief = message.content[0].type === "text" ? message.content[0].text : "";

  return NextResponse.json({ brief });
}
