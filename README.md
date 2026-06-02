# Company Brief Agent

A two-agent AI pipeline that turns a company name, a target contact, and a desired role into a 20-25 page strategic briefing document.

**Agent 1 (Claude Sonnet)** — Takes your three inputs and generates a concise 1-page research prompt, which you review and edit before anything expensive runs.

**Agent 2 (Claude Opus)** — Takes the approved prompt and produces a comprehensive strategic briefing document covering company history, valuation, products, GTM, competitors, leadership, and role-specific talking points.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **AI**: Anthropic API (Claude Sonnet + Claude Opus)
- **Deploy**: Vercel

## Getting Started

```bash
git clone https://github.com/YOUR_USERNAME/company-brief-agent
cd company-brief-agent
npm install
cp .env.example .env.local
# Add your Anthropic API key to .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key — get one at [console.anthropic.com](https://console.anthropic.com) |

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/company-brief-agent)

1. Push to GitHub
2. Import repo in [Vercel](https://vercel.com)
3. Add `ANTHROPIC_API_KEY` in Vercel Environment Variables
4. Deploy

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── generate-prompt/route.ts   # Agent 1
│   │   └── generate-brief/route.ts    # Agent 2
│   ├── page.tsx                       # Main UI + state machine
│   ├── layout.tsx
│   └── globals.css
└── components/
    ├── InputForm.tsx                  # Step 1: inputs
    ├── PromptReview.tsx               # Step 2: review & edit prompt
    └── BriefOutput.tsx                # Step 3: view & download brief
```

## Roadmap

- [ ] PDF export (not just .txt)
- [ ] Save and version prompts per company
- [ ] Multi-company comparison mode
- [ ] Interviewer-specific section (LinkedIn scan for named contacts)
- [ ] Streaming output for Agent 2
