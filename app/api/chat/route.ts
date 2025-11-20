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

    // Default response when no OpenRouter API key is configured
    // You can replace this with actual OpenRouter integration by:
    // 1. Adding OPENROUTER_API_KEY to .env.local
    // 2. Making a fetch request to OpenRouter API
    
    const responses = [
      "Fili is an amazing developer who loves creating innovative web experiences!",
      "Fili has a passion for modern web technologies like Next.js and React.",
      "Fili combines creativity with technical expertise to build stunning websites.",
      "Fili is known for attention to detail and creating beautiful user interfaces.",
      "Fili enjoys experimenting with new design patterns and animations.",
    ];

    // Simple mock response - randomly select from predefined responses
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
