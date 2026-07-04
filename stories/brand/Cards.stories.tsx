import type { Meta, StoryObj } from '@storybook/react'

// --- Content Card ---
function ContentCard() {
  return (
    <div className="glass-card rounded-2xl p-8 md:p-12 max-w-2xl mx-auto text-center text-white">
      <h2 className="mb-5 text-white proxima-nova-semibold">About This Site</h2>
      <p className="mb-8 aktiv-grotesk-regular">
        This website was developed using Next.js, React, TypeScript, shadcn/ui, and Tailwind CSS. The design
        draws from Neumorphism and Glassmorphism to create a textured, depth-rich feel.
      </p>
      <button
        className="rounded-full px-10 text-white border border-white/30 hover:bg-red hover:border-red cursor-pointer uppercase text-[12px] py-2 transition-colors"
      >
        View on GitHub
      </button>
    </div>
  )
}

// --- Process / Step Card ---
function StepCard() {
  return (
    <div className="glass-card rounded-2xl p-8 md:p-10 relative overflow-hidden max-w-sm text-white">
      <div className="mb-6 flex items-center gap-3">
        <span className="text-[24px] font-bold text-white/60 proxima-nova-semibold leading-none">01</span>
        <div className="w-[2px] h-8 bg-mcRed" />
        <h3 className="text-[24px] text-white proxima-nova-semibold">Discovery</h3>
      </div>
      <p className="text-white/80 text-sm aktiv-grotesk-regular leading-relaxed">
        We start by understanding your goals, audience, and existing brand to map out the right approach
        before writing a single line of code.
      </p>
      {/* Corner glow */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(198,40,74,0.4) 0%, transparent 70%)', transform: 'translate(20%, -20%)' }}
      />
    </div>
  )
}

// --- Clickable Selection Card ---
function ClickableCard() {
  return (
    <div className="max-w-sm">
      <div className="glass-form-deep-blue text-white p-4 rounded group hover:cursor-pointer text-left">
        <p className="aktiv-grotesk-regular transition-colors text-[16px] animated-underline">
          E-Commerce & Online Store
        </p>
      </div>
    </div>
  )
}

// --- All Cards Overview ---
function AllCards() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48, padding: 32 }}>
      <section>
        <p style={{ color: '#c6284a', fontSize: 11, fontFamily: 'monospace', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Content Card — glass-card rounded-2xl p-8
        </p>
        <ContentCard />
      </section>

      <section>
        <p style={{ color: '#c6284a', fontSize: 11, fontFamily: 'monospace', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Process / Step Card — glass-card + step number + red divider
        </p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {['Discovery', 'Design', 'Build'].map((title, i) => (
            <div key={title} className="glass-card rounded-2xl p-8 relative overflow-hidden text-white" style={{ width: 260 }}>
              <div className="mb-4 flex items-center gap-3">
                <span className="text-[24px] font-bold text-white/60 proxima-nova-semibold leading-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="w-[2px] h-8 bg-mcRed" />
                <h3 className="text-[20px] text-white proxima-nova-semibold">{title}</h3>
              </div>
              <p className="text-white/80 text-sm aktiv-grotesk-regular leading-relaxed">
                Supporting description text explaining what happens during this phase of the project.
              </p>
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(198,40,74,0.4) 0%, transparent 70%)', transform: 'translate(20%, -20%)' }}
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <p style={{ color: '#c6284a', fontSize: 11, fontFamily: 'monospace', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Clickable Selection Card — glass-form-deep-blue p-4 rounded + animated-underline
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 320 }}>
          {['E-Commerce & Online Store', 'Portfolio & Personal Brand', 'Business / Corporate Site'].map((label) => (
            <div key={label} className="glass-form-deep-blue text-white p-4 rounded group hover:cursor-pointer text-left">
              <p className="aktiv-grotesk-regular transition-colors text-[16px] animated-underline">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

const meta: Meta = {
  title: 'Brand/Cards',
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj

export const Overview: Story = {
  name: 'All Card Types',
  render: () => <AllCards />,
}

export const Content: Story = {
  name: 'Content Card',
  render: () => (
    <div style={{ padding: 32 }}>
      <ContentCard />
    </div>
  ),
}

export const ProcessStep: Story = {
  name: 'Process / Step Card',
  render: () => (
    <div style={{ padding: 32 }}>
      <StepCard />
    </div>
  ),
}

export const Clickable: Story = {
  name: 'Clickable Selection Card',
  render: () => (
    <div style={{ padding: 32 }}>
      <ClickableCard />
    </div>
  ),
}
