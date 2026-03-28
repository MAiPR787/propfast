import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are a professional proposal writer for freelancers. Write a complete, professional project proposal based on the details provided. Include: Executive Summary, Scope of Work (with specific deliverables based on the project type and description), Project Timeline (broken into phases based on the timeline given), Investment section with the price and 50/50 payment terms, Terms & Conditions, and Next Steps. Make it warm but professional. Use the client's name naturally. Make the scope of work specific to what they actually described, not generic. Format with clear section headers using ALL CAPS and divider lines.`;

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey || apiKey === 'your_anthropic_api_key_here') {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  let body: {
    projectType: string;
    clientName: string;
    clientCompany: string;
    clientEmail: string;
    projectDescription: string;
    timeline: string;
    price: string;
    userName: string;
    userBusiness: string;
    userEmail: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const {
    projectType, clientName, clientCompany, clientEmail,
    projectDescription, timeline, price, userName, userBusiness, userEmail,
  } = body;

  const userMessage = `Please write a professional proposal with the following details:

PROJECT TYPE: ${projectType}

CLIENT INFORMATION:
- Client Name: ${clientName}
- Client Company: ${clientCompany || 'N/A'}
- Client Email: ${clientEmail}

PROJECT DETAILS:
- Description: ${projectDescription}
- Timeline: ${timeline}
- Price: $${parseFloat(price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}

SERVICE PROVIDER:
- Name: ${userName}
- Business: ${userBusiness || userName}
- Email: ${userEmail}
- Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

Write the full proposal now. Start directly with the proposal header — no preamble or commentary.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2048,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userMessage }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Anthropic API error:', response.status, err);
      return NextResponse.json({ error: 'Upstream API error' }, { status: 502 });
    }

    const data = await response.json();
    const proposalText: string = data.content?.[0]?.text ?? '';

    if (!proposalText) {
      return NextResponse.json({ error: 'Empty response from API' }, { status: 502 });
    }

    return NextResponse.json({ proposal: proposalText });
  } catch (err) {
    console.error('Generate route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
