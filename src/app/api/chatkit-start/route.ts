import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { workflow_id } = await request.json();
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error('OPENAI_API_KEY is not set in environment variables.');
      return NextResponse.json({ error: 'Server configuration error: Missing API key.' }, { status: 500 });
    }
    
    if (!workflow_id) {
      return NextResponse.json({ error: 'workflow_id is required.' }, { status: 400 });
    }

    // Generate a minimal, anonymous user id for the ChatKit session
    // Using crypto.randomUUID if available; fallback to a timestamp-based id.
    const userId =
      typeof crypto !== 'undefined' && typeof (crypto as any).randomUUID === 'function'
        ? (crypto as any).randomUUID()
        : `anonymous-${Date.now()}`;

    // ChatKit expects `user` to be a string id (not an object).
    const payload = {
      workflow: { id: workflow_id },
      user: userId
    };

    const response = await fetch('https://api.openai.com/v1/chatkit/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        // Required for ChatKit beta APIs
        'OpenAI-Beta': 'chatkit_beta=v1',
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('OpenAI API Error:', {
        status: response.status,
        body: data
      });
      return NextResponse.json({ error: data.error?.message || 'Failed to create session with OpenAI.' }, { status: response.status });
    }

    // Ensure we return exactly client_secret to the client as expected by the ChatKit SDK
    if (!data?.client_secret) {
      console.error('OpenAI session created but client_secret missing:', data);
      return NextResponse.json({ error: 'OpenAI did not return client_secret.' }, { status: 500 });
    }

    return NextResponse.json({ client_secret: data.client_secret });
  } catch (e) {
    console.error('Error creating ChatKit session:', e);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}