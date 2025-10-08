'use client'
import React, { useState } from 'react'
import Image from 'next/image'

export default function Page() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [suburb, setSuburb] = useState('')
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, suburb, source: 'teaser' })
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
    } catch (e) {
      setStatus('error')
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="w-full text-center text-xs sm:text-sm bg-gradient-to-r from-primary to-secondary text-white py-2">
        Soft launch in South Australia · Join the early access list
      </div>

      <header className="container-xl py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
  <Image
    src="/logo.jpg"
    alt="Sell It Buy It logo"
    width={100}
    height={100}
    className="rounded-xl object-cover"
  />
</div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
          <a href="#about" className="hover:text-slate-900">About</a>
          <a href="#features" className="hover:text-slate-900">Features</a>
          <a href="#how" className="hover:text-slate-900">How it works</a>
          <a href="#faq" className="hover:text-slate-900">FAQ</a>
          <a href="#waitlist" className="btn btn-primary">Get early access</a>
        </nav>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 bg-secondary/20 rounded-full blur-3xl" />
        <div className="container-xl py-14 grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <h1 className="h1">
              A seller‑first marketplace for <span className="text-primary">pre‑owned</span> & <span className="text-secondary">handmade</span> goods.
            </h1>
            <p className="mt-5 p max-w-2xl">
              Simple listings. Clean browsing. Secure payments with escrow‑style protection. List for free — buyer pays a small transparent amount at checkout.
            </p>

            <form onSubmit={onSubmit} className="mt-8 max-w-xl">
              {status === 'success' ? (
                <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800">
                  Thanks! You’re on the early access list. We’ll email you before the pilot goes live.
                </div>
              ) : (
                <div className="grid sm:grid-cols-3 gap-3">
                  <input type="text" placeholder="Your name" value={name} onChange={(e)=>setName(e.target.value)} className="input" />
                  <input type="email" placeholder="you@email.com" required value={email} onChange={(e)=>setEmail(e.target.value)} className="input" />
                  <button type="submit" disabled={status==='loading'} className="sm:col-span-3 btn btn-primary disabled:opacity-60">
                    {status==='loading' ? 'Joining…' : 'Join the Waitlist'}
                  </button>
                  {status==='error' && <p className="text-sm text-red-600 sm:col-span-3">Something went wrong. Please try again.</p>}
                </div>
              )}
              <p className="mt-2 small">No spam. Opt out anytime.</p>
            </form>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-primary/10 via-secondary/10 to-transparent blur-xl" />
            <div className="relative rounded-[2rem] border border-slate-200 bg-white shadow-2xl p-5 w-[320px] sm:w-[360px] mx-auto">
              <div className="rounded-xl bg-slate-100 border border-slate-200 p-4">
                <div className="flex items-center justify-between mb-4">
                  <Image
    src="/logo.jpg"
    alt="Sell It Buy It logo"
    width={50}
    height={50}
    className="rounded-xl object-cover"
  />
  <div className="mt-3 text-center small">Your Search Result</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
  {[
    {src: '/previews/bike.jpg', title: 'Mountain Bike', price: '$240'},
    {src: '/previews/sofa.jpg', title: '2-Seater Sofa', price: '$150'},
    {src: '/previews/phone.jpg', title: 'iPhone 13 Pro', price: '$780'},
    {src: '/previews/laptop.jpg', title: 'MacBook Air', price: '$990'},
    {src: '/previews/lamp.jpg', title: 'Vintage Lamp', price: '$35'},
    {src: '/previews/sneakers.jpg', title: 'Nike Air Max', price: '$85'},
  ].map((item) => (
    <div key={item.src} className="rounded-xl border border-slate-200 bg-white p-3 hover:shadow transition">
      <div className="aspect-[4/3] rounded-lg overflow-hidden mb-3">
        <Image
          src={item.src}
          alt={item.title}
          width={300}
          height={225}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="font-medium text-slate-800 truncate">{item.title}</div>
      <div className="text-sm text-emerald-600 font-semibold">{item.price}</div>
    </div>
  ))}
</div>
              </div>
              <div className="mt-3 text-center small">App preview</div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section">
        <div className="container-xl grid gap-8 lg:grid-cols-2 items-start">
          <div>
            <h2 className="h2">Meet Sell It Buy It</h2>
            <p className="mt-3 p max-w-prose">
              We’re an Australian marketplace focused on simple listings, transparent checkout and escrow‑backed payouts. Our mission is to make buying and selling pre‑owned and handmade items
              easier, faster and more trustworthy — keeping great things in use and out of landfill.
            </p>
            <ul className="mt-6 grid sm:grid-cols-3 gap-3 text-sm">
              {['Fast listings','Trusted community','Built for Australia'].map(t => (
                <li key={t} className="rounded-xl bg-slate-50 border border-slate-200 p-4 font-medium">{t}</li>
              ))}
            </ul>
          </div>
          <div className="card p-8">
            <h3 className="h3">Our pledge</h3>
            <p className="mt-2 p">Fair, simple amounts shown clearly at checkout. Seller‑first by design. We only succeed when you do.</p>
            <ul className="mt-4 space-y-2 text-slate-700 text-sm">
              <li>• Funds held until delivery is confirmed</li>
              <li>• Optional ID verification for a Verified badge</li>
              <li>• Report / block tools for safety</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="features" className="container-xl pb-8">
        <h2 className="h2">Features</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            ['Quick, clean listings','Snap photos, set a price and post in under a minute.'],
            ['Secure checkout','Escrow‑style protection; release on delivery confirmation.'],
            ['Local‑first search','See nearby items first; opt into shipping when you want.'],
            ['Smart alerts','Save searches and get notified when matches appear.'],
            ['Shipping labels','Buy labels in‑app and track automatically.'],
            ['Fair, transparent amounts','Small, clearly shown amount paid by the buyer at checkout.'],
          ].map(([title, body]) => (
            <div key={title} className="rounded-2xl bg-slate-50 border border-slate-200 p-6 hover:border-slate-300 transition">
              <h3 className="h3">{title}</h3>
              <p className="p mt-2">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how" className="section">
        <div className="container-xl card p-8">
          <h2 className="h2">How it works</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {[{n:1,t:'List',b:'Upload photos, add a short description, choose a price and suburb.'},{n:2,t:'Sell',b:'Buyer checks out — funds are held until delivery is confirmed.'},{n:3,t:'Payout',b:'We release the money to the seller after tracking confirms arrival.'}].map(s=> (
              <li key={s.n} className="rounded-2xl bg-white border border-slate-200 p-6">
                <div className="h-8 w-8 rounded-full grid place-items-center bg-primary text-slate-900 font-bold">{s.n}</div>
                <h3 className="h3 mt-3">{s.t}</h3>
                <p className="p mt-2">{s.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="waitlist" className="container-xl pb-20">
        <div className="card p-8 sm:p-12 text-center bg-gradient-to-br from-slate-50 to-white">
          <h2 className="h2">Be amongst the first</h2>
          <p className="mt-2 p">Sign up to be notified when we launch and get early pilot invites.</p>

          {status==='success' ? (
            <div className="mt-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 max-w-xl mx-auto">
              You’re on the list — talk soon!
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 max-w-xl mx-auto grid sm:grid-cols-3 gap-3">
              <input className="input" type="text" placeholder="Your name" value={name} onChange={(e)=>setName(e.target.value)} />
              <input className="input" type="email" placeholder="you@email.com" required value={email} onChange={(e)=>setEmail(e.target.value)} />
              <button className="btn btn-primary sm:col-span-3" disabled={status==='loading'}>{status==='loading'?'Joining…':'Get early access'}</button>
            </form>
          )}

          <p className="mt-3 small">Questions? <a className="underline" href="mailto:hello@sellitbuyit.com.au">hello@sellitbuyit.com.au</a></p>
        </div>
      </section>

      <section id="faq" className="container-xl pb-24">
        <h2 className="h2">FAQ</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            ['What can I list?','Pre‑owned and handmade goods. A clear prohibited‑items policy applies.'],
            ['Who pays at checkout?','Buyers pay a small, transparent amount; sellers list for free.'],
            ['How do payouts work?','Funds are held until tracking confirms delivery, then released.'],
            ['Mobile or web?','iOS & Android at launch; web browsing to follow.'],
            ['Crypto at launch?','Exploring compliance; cards and wallets first.'],
            ['Where do you launch?','South Australia pilot, then national rollout once KPIs look great.'],
          ].map(([q,a]) => (
            <div key={q} className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
              <h3 className="h3">{q}</h3>
              <p className="p mt-2">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-200/80 py-10">
        <div className="container-xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start text-sm text-slate-600">
          <div>
            <div className="flex items-center gap-3">
  <Image
    src="/logo.jpg"
    alt="Sell It Buy It logo"
    width={100}
    height={100}
    className="rounded-xl object-cover"
  />
</div>
            <p className="mt-2 max-w-sm">Keeping great finds in the loop. © {new Date().getFullYear()} Sell It Buy It Pty Ltd</p>
          </div>
          <div>
            <h4 className="h3">Company</h4>
            <ul className="mt-2 space-y-1">
              <li><a className="hover:text-slate-900" href="#about">About</a></li>
              <li><a className="hover:text-slate-900" href="#features">Features</a></li>
              <li><a className="hover:text-slate-900" href="#how">How it works</a></li>
              <li><a className="hover:text-slate-900" href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="h3">Contact</h4>
            <ul className="mt-2 space-y-1">
              <li><a className="hover:underline" href="mailto:hello@sellitbuyit.com.au">hello@sellitbuyit.com.au</a></li>
              <li className="text-slate-500">Instagram · LinkedIn · Facebook</li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  )
}
