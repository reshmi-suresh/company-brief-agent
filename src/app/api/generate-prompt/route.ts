export const maxDuration = 60;

import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const { company, contact, role, additionalInfo } = await req.json();

  const message = await client.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `You are Agent 1 in a two-agent research pipeline. Your job is to create a precise, structured research prompt (max 1 page) that Agent 2 will use to produce a comprehensive 20-25 page company briefing document.

Inputs:
- Company: ${company}
- Target Contact: ${contact || "Not specified"}
- Target Role: ${role}
${additionalInfo?.trim() ? `- Additional context from user: ${additionalInfo.trim()}` : ""}

Create a research prompt that instructs Agent 2 to cover:
1. Company history and founding story
2. Business model and revenue streams
3. Current valuation and funding history
4. Key products and roadmap
5. Go-to-market strategy
6. Competitive landscape and positioning
7. Leadership team and culture
8. Recent news and strategic moves
9. Role-specific talking points for a ${role}
${contact ? `10. Insights relevant to a conversation with ${contact}` : ""}
${additionalInfo?.trim() ? `11. Address any themes or priorities from the user's additional context` : ""}

The prompt should be specific, structured, and no longer than one page. Format it so Agent 2 knows exactly what depth and format to produce.`,
      },
    ],
  });

  const prompt = message.content[0].type === "text" ? message.content[0].text : "";

  return NextResponse.json({ prompt });
}
