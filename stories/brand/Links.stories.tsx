import type { Meta, StoryObj } from '@storybook/react'

function LinkShowcase() {
  return (
    <div style={{ padding: 40, display: 'flex', flexDirection: 'column', gap: 48, maxWidth: 600 }}>

      {/* Nav Links */}
      <section>
        <p style={{ color: '#c6284a', fontSize: 11, fontFamily: 'monospace', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Nav Link
        </p>
        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-end' }}>
          {/* All three share the same padding-bottom + transparent border so size never shifts */}
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontFamily: '"proxima-nova", sans-serif',
              fontSize: 17,
              fontWeight: 700,
              letterSpacing: '4.4px',
              paddingBottom: 5,
              borderBottom: '2px solid transparent',
            }}
          >
            Default
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontFamily: '"proxima-nova", sans-serif',
              fontSize: 17,
              fontWeight: 700,
              letterSpacing: '4.4px',
              paddingBottom: 5,
              borderBottom: '2px solid #c6284a',
            }}
          >
            Active
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontFamily: '"proxima-nova", sans-serif',
              fontSize: 17,
              fontWeight: 700,
              letterSpacing: '4.4px',
              paddingBottom: 5,
              borderBottom: '2px solid transparent',
              transition: 'border-color 0.2s ease-in',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = '#c6284a')}
            onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = 'transparent')}
          >
            Hover me
          </a>
        </div>
        <p style={{ color: '#646464', fontSize: 12, marginTop: 12, fontFamily: 'monospace' }}>
          default · <span style={{ color: '#9d9e9e' }}>.custom-underline (active) · hover:.custom-hover</span>
        </p>
      </section>

      {/* Animated Underline */}
      <section>
        <p style={{ color: '#c6284a', fontSize: 11, fontFamily: 'monospace', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Animated Underline
        </p>
        <div className="group" style={{ display: 'inline-block', cursor: 'pointer' }}>
          <span
            className="animated-underline"
            style={{ color: '#fff', fontFamily: '"proxima-nova", sans-serif', fontSize: 20, fontWeight: 600 }}
          >
            Hover over this heading
          </span>
        </div>
        <p style={{ color: '#646464', fontSize: 12, marginTop: 12, fontFamily: 'monospace' }}>
          <span style={{ color: '#9d9e9e' }}>parent .group · span .animated-underline</span>
          <br />
          Red underline scales in from left on hover, out from right on leave.
        </p>
      </section>

      {/* Inline Link */}
      <section>
        <p style={{ color: '#c6284a', fontSize: 11, fontFamily: 'monospace', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Inline / Body Link
        </p>
        <p style={{ color: '#fff', fontFamily: '"aktiv-grotesk", sans-serif', fontSize: 18, lineHeight: 1.6 }}>
          Check out our{' '}
          <a href="#" onClick={(e) => e.preventDefault()} className="underline hover:text-red" style={{ color: '#fff', transition: 'color 0.2s' }}>
            website development services
          </a>{' '}
          or{' '}
          <a href="#" onClick={(e) => e.preventDefault()} className="underline hover:text-red" style={{ color: '#fff', transition: 'color 0.2s' }}>
            get in touch
          </a>
          .
        </p>
        <p style={{ color: '#646464', fontSize: 12, marginTop: 12, fontFamily: 'monospace' }}>
          <span style={{ color: '#9d9e9e' }}>.underline hover:text-red</span>
        </p>
      </section>

    </div>
  )
}

const meta: Meta<typeof LinkShowcase> = {
  title: 'Brand/Links',
  component: LinkShowcase,
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof LinkShowcase>

export const AllStyles: Story = {}
