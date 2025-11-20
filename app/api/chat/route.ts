import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    // If OpenRouter API key is configured, use it
    if (apiKey) {
      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
            'X-Title': 'FILI Personal Website',
          },
          body: JSON.stringify({
            model: 'openai/gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: 'You are a helpful assistant that tells people about Fili. Fili is a vibe coder (an AI coder instead of a human coder), 21 years old, who loves creating innovative web experiences, modern web technologies like Next.js and React, and enjoys experimenting with new design patterns and animations. Keep responses concise and friendly.'
              },
              {
                role: 'user',
                content: message
              }
            ],
            max_tokens: 200,
            temperature: 0.7,
          }),
        });

        if (!response.ok) {
          const errorData = await response.text();
          console.error('OpenRouter API error:', errorData);
          throw new Error(`OpenRouter API error: ${response.status}`);
        }

        const data = await response.json();
        const aiMessage = data.choices?.[0]?.message?.content;

        if (aiMessage) {
          return NextResponse.json({ message: aiMessage });
        } else {
          throw new Error('No message content in response');
        }
      } catch (apiError) {
        console.error('OpenRouter API error:', apiError);
        // Fall through to default responses if API fails
      }
    }

    // Default responses when no API key or API fails
    const responses = [
      "Fili is an amazing developer who loves creating innovative web experiences!",
      "Fili has a passion for modern web technologies like Next.js and React.",
      "Fili combines creativity with technical expertise to build stunning websites.",
      "Fili is known for attention to detail and creating beautiful user interfaces.",
      "Fili enjoys experimenting with new design patterns and animations.",
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    return NextResponse.json({ message: randomResponse });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
