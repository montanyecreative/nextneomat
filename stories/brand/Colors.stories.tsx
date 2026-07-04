import type { Meta, StoryObj } from '@storybook/react'

const palette = [
  { name: 'Red / mcRed', hex: '#c6284a', usage: 'Primary accent, CTAs, underlines' },
  { name: 'Blue', hex: '#40609C', usage: 'Primary blue, HR dividers' },
  { name: 'Navy', hex: '#002b49', usage: 'Dark backgrounds, brand depth' },
  { name: 'Nav Navy', hex: '#112032', usage: 'Navigation background' },
  { name: 'Teal', hex: '#059cad', usage: 'Accent, highlights' },
  { name: 'Orange', hex: '#E25B26', usage: 'Secondary accent' },
  { name: 'Black', hex: '#222222', usage: 'Body text on light' },
  { name: 'Charcoal', hex: '#646464', usage: 'Secondary text' },
  { name: 'Gray', hex: '#9d9e9e', usage: 'Muted text, borders' },
  { name: 'Light Gray', hex: '#f2f2f2', usage: 'Light backgrounds' },
  { name: 'White', hex: '#FFFFFF', usage: 'Primary text on dark' },
  { name: 'Danger', hex: '#e3342f', usage: 'Error states' },
]

function ColorSwatch({ name, hex, usage }: { name: string; hex: string; usage: string }) {
  const isDark = ['#222222', '#002b49', '#112032', '#c6284a', '#40609C', '#059cad', '#E25B26', '#e3342f', '#646464'].includes(hex)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 160 }}>
      <div
        style={{
          background: hex,
          height: 100,
          borderRadius: 8,
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '8px 10px',
        }}
      >
        <span style={{ color: isDark ? '#fff' : '#222', fontSize: 11, fontFamily: 'monospace', opacity: 0.85 }}>{hex}</span>
      </div>
      <div>
        <p style={{ color: '#fff', fontSize: 13, fontWeight: 600, margin: 0 }}>{name}</p>
        <p style={{ color: '#9d9e9e', fontSize: 11, margin: '2px 0 0' }}>{usage}</p>
      </div>
    </div>
  )
}

function ColorPalette() {
  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ color: '#fff', fontFamily: '"proxima-nova", sans-serif', fontSize: 28, fontWeight: 600, marginBottom: 8 }}>
        Brand Colors
      </h2>
      <p style={{ color: '#9d9e9e', marginBottom: 32, fontSize: 14 }}>The Montanye Creative color palette.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {palette.map((c) => (
          <ColorSwatch key={c.hex} {...c} />
        ))}
      </div>
    </div>
  )
}

const meta: Meta<typeof ColorPalette> = {
  title: 'Brand/Colors',
  component: ColorPalette,
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof ColorPalette>

export const Palette: Story = {}
