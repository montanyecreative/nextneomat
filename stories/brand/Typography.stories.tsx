import type { Meta, StoryObj } from '@storybook/react'

const typeScale = [
  { label: 'Display', tag: 'h1', size: '3rem', weight: 700, family: 'proxima-nova', sample: 'Montanye Creative' },
  { label: 'Heading 2', tag: 'h2', size: '2.5rem', weight: 600, family: 'proxima-nova', sample: 'Web Development & Design' },
  { label: 'Heading 3', tag: 'h3', size: '1.75rem', weight: 600, family: 'proxima-nova', sample: 'Strategy. Design. Execution.' },
  { label: 'Subtitle', tag: 'p', size: '1rem', weight: 700, family: 'proxima-nova', sample: 'SERVICES', extra: 'letter-spacing: 0.1em; text-transform: uppercase' },
  { label: 'Body', tag: 'p', size: '1.125rem', weight: 400, family: 'aktiv-grotesk', sample: 'We build clean, fast, purposeful digital experiences tailored to your brand.' },
  { label: 'Body Small', tag: 'p', size: '0.9rem', weight: 400, family: 'aktiv-grotesk', sample: 'Supporting copy, captions, and helper text live at this scale.' },
  { label: 'Button', tag: 'span', size: '0.875rem', weight: 600, family: 'proxima-nova', sample: 'GET STARTED', extra: 'letter-spacing: 1.5px; text-transform: uppercase' },
]

function TypographyShowcase() {
  return (
    <div style={{ padding: 32, maxWidth: 800 }}>
      <h2 style={{ color: '#fff', fontFamily: '"proxima-nova", sans-serif', fontSize: 28, fontWeight: 600, marginBottom: 8 }}>
        Typography
      </h2>
      <p style={{ color: '#9d9e9e', marginBottom: 40, fontSize: 14 }}>
        Primary typeface: <strong style={{ color: '#fff' }}>Proxima Nova</strong> (Adobe Fonts) for headings & UI.{' '}
        Secondary: <strong style={{ color: '#fff' }}>Aktiv Grotesk</strong> (Adobe Fonts) for body copy.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        {typeScale.map(({ label, size, weight, family, sample, extra }) => (
          <div key={label} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 32 }}>
            <div style={{ display: 'flex', gap: 24, marginBottom: 12, alignItems: 'baseline' }}>
              <span style={{ color: '#c6284a', fontSize: 11, fontFamily: 'monospace', width: 96, flexShrink: 0 }}>{label}</span>
              <span style={{ color: '#9d9e9e', fontSize: 11, fontFamily: 'monospace' }}>
                {size} / {weight} / {family}
              </span>
            </div>
            <p
              style={{
                color: '#fff',
                fontFamily: `"${family}", sans-serif`,
                fontSize: size,
                fontWeight: weight,
                margin: 0,
                lineHeight: 1.3,
                ...(extra
                  ? Object.fromEntries(
                      extra.split(';').filter(Boolean).map((s) => {
                        const [k, v] = s.split(':').map((x) => x.trim())
                        const camel = k.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
                        return [camel, v]
                      })
                    )
                  : {}),
              }}
            >
              {sample}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

const meta: Meta<typeof TypographyShowcase> = {
  title: 'Brand/Typography',
  component: TypographyShowcase,
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof TypographyShowcase>

export const TypeScale: Story = {}
