'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

const STORYBOOK_URL = process.env.NEXT_PUBLIC_STORYBOOK_URL ?? 'http://localhost:6006'

export default function StyleGuideDashboard() {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/style-guide/logout', { method: 'POST' })
    router.push('/style-guide/login')
  }

  return (
    <div className="fixed inset-0 flex flex-col" style={{ background: '#0f0f0f' }}>
      {/* Toolbar */}
      <header
        className="flex items-center justify-between px-5 shrink-0"
        style={{
          height: 52,
          background: 'rgba(0,0,0,0.85)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="flex items-center gap-3">
          <Image src="/logo.webp" alt="Montanye Creative" width={57} height={36} className="object-contain" priority />
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: '#9d9e9e', borderLeft: '1px solid rgba(255,255,255,0.15)', paddingLeft: '0.75rem' }}
          >
            Style Guide
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="text-xs tracking-widest uppercase transition-colors"
          style={{ color: '#9d9e9e', letterSpacing: '0.12em' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#c6284a')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#9d9e9e')}
        >
          Log out
        </button>
      </header>

      {/* Storybook iframe */}
      <iframe
        src={STORYBOOK_URL}
        className="flex-1 w-full border-0"
        title="Brand Style Guide — Storybook"
        allow="clipboard-write"
      />
    </div>
  )
}
