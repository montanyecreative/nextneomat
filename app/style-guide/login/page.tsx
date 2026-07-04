'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function StyleGuideLogin() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/style-guide/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push('/style-guide/dashboard')
      } else {
        setError('Incorrect password.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #151515 50%, #1a1a1a 100%)' }}
    >
      <div className="glass-card rounded-xl p-10 w-full max-w-sm flex flex-col items-center gap-8">
        <Image src="/logo.webp" alt="Montanye Creative" width={160} height={102} className="object-contain" priority />

        <div className="w-full text-center">
          <h1 className="text-white proxima-nova-semibold text-2xl mb-1">Style Guide</h1>
          <p className="text-gray-400 text-sm aktiv-grotesk-regular">Enter the password to access the brand style guide.</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            autoFocus
            className="glass-input w-full rounded-md px-4 py-3 text-sm outline-none transition-all"
          />

          {error && (
            <p className="text-sm text-center" style={{ color: '#c6284a' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md py-3 text-white text-sm font-semibold tracking-widest transition-all disabled:opacity-50"
            style={{ background: loading ? 'rgba(198,40,74,0.4)' : '#c6284a' }}
          >
            {loading ? 'Verifying...' : 'Enter'}
          </button>
        </form>
      </div>
    </main>
  )
}
