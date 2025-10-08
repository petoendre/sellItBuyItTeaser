import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    if (!body?.email) {
      return NextResponse.json({ ok: false, error: 'Email required' }, { status: 400 })
    }
    // Forward to your provider here if desired:
    await fetch("https://formspree.io/f/mdkwlpzd", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});
    return NextResponse.json({ ok: true, received: { ...body, ts: new Date().toISOString() } })
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 })
  }
}
