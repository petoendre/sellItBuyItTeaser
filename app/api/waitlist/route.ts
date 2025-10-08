import { NextResponse } from 'next/server'

// Demo serverless endpoint for Vercel. In production, forward to a real service (Mailchimp, Beehiiv, Google Sheets, Customer.io, etc.).
export async function POST(request: Request) {
  try {
    const body = await request.json()
    // Basic validation
    if (!body?.email) {
      return NextResponse.json({ ok: false, error: 'Email required' }, { status: 400 })
    }
    // You could forward to an external service here. Example:
    // await fetch(process.env.WAITLIST_WEBHOOK_URL!, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body) })
    // For now, just echo back success.
    return NextResponse.json({ ok: true, received: { ...body, ts: new Date().toISOString() } })
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 })
  }
}
