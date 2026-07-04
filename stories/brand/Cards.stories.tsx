import type { Meta, StoryObj } from '@storybook/react'

type Alignment = 'left' | 'center' | 'right'

// --- Content Card ---
interface ContentCardProps {
  heading: string
  body: string
  buttonLabel: string
  showButton: boolean
  align: Alignment
}

function ContentCard({ heading, body, buttonLabel, showButton, align }: ContentCardProps) {
  const alignClass = { left: 'text-left', center: 'text-center', right: 'text-right' }[align]
  const justifyClass = { left: 'justify-start', center: 'justify-center', right: 'justify-end' }[align]
  return (
    <div className={`glass-card rounded-2xl p-8 md:p-12 max-w-2xl mx-auto text-white ${alignClass}`}>
      <h2 className="mb-5 text-white proxima-nova-semibold">{heading}</h2>
      <p className="mb-8 aktiv-grotesk-regular">{body}</p>
      {showButton && (
        <div className={`flex ${justifyClass}`}>
          <button className="rounded-full px-10 text-white border border-white/30 hover:bg-red hover:border-red cursor-pointer uppercase text-[12px] py-2 transition-colors">
            {buttonLabel}
          </button>
        </div>
      )}
    </div>
  )
}

// --- Process / Step Card ---
interface StepCardProps {
  stepNumber: string
  title: string
  description: string
  showGlow: boolean
  align: Alignment
}

function StepCard({ stepNumber, title, description, showGlow, align }: StepCardProps) {
  const alignClass = { left: 'text-left', center: 'text-center', right: 'text-right' }[align]
  const headerJustify = { left: 'justify-start', center: 'justify-center', right: 'justify-end' }[align]
  return (
    <div className={`glass-card rounded-2xl p-8 md:p-10 relative overflow-hidden max-w-sm text-white ${alignClass}`}>
      <div className={`mb-6 flex items-center gap-3 ${headerJustify}`}>
        <span className="text-[24px] font-bold text-white/60 proxima-nova-semibold leading-none">{stepNumber}</span>
        <div className="w-[2px] h-8 bg-mcRed" />
        <h3 className="text-[24px] text-white proxima-nova-semibold">{title}</h3>
      </div>
      <p className="text-white/80 text-sm aktiv-grotesk-regular leading-relaxed">{description}</p>
      {showGlow && (
        <div
          className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(198,40,74,0.4) 0%, transparent 70%)', transform: 'translate(20%, -20%)' }}
        />
      )}
    </div>
  )
}

// --- Clickable Selection Card ---
interface ClickableCardProps {
  label: string
}

function ClickableCard({ label }: ClickableCardProps) {
  return (
    <div className="max-w-sm">
      <div className="glass-form-deep-blue text-white p-4 rounded group hover:cursor-pointer text-left">
        <p className="aktiv-grotesk-regular transition-colors text-[16px] animated-underline">{label}</p>
      </div>
    </div>
  )
}

// --- All Cards Overview (no controls — just a reference) ---
function AllCards() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48, padding: 32 }}>
      <section>
        <p style={{ color: '#c6284a', fontSize: 11, fontFamily: 'monospace', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Content Card — glass-card rounded-2xl p-8
        </p>
        <ContentCard
          heading="About This Site"
          body="This website was developed using Next.js, React, TypeScript, shadcn/ui, and Tailwind CSS. The design draws from Neumorphism and Glassmorphism to create a textured, depth-rich feel."
          buttonLabel="View on GitHub"
          showButton
        />
      </section>

      <section>
        <p style={{ color: '#c6284a', fontSize: 11, fontFamily: 'monospace', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Process / Step Card — glass-card + step number + red divider
        </p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {[['01', 'Discovery'], ['02', 'Design'], ['03', 'Build']].map(([num, title]) => (
            <StepCard
              key={title}
              stepNumber={num}
              title={title}
              description="Supporting description text explaining what happens during this phase of the project."
              showGlow
            />
          ))}
        </div>
      </section>

      <section>
        <p style={{ color: '#c6284a', fontSize: 11, fontFamily: 'monospace', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Clickable Selection Card — glass-form-deep-blue p-4 rounded + animated-underline
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 320 }}>
          {['E-Commerce & Online Store', 'Portfolio & Personal Brand', 'Business / Corporate Site'].map((label) => (
            <ClickableCard key={label} label={label} />
          ))}
        </div>
      </section>
    </div>
  )
}

// ─── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Brand/Cards',
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj

// ─── Overview (no controls) ───────────────────────────────────────────────────

export const Overview: Story = {
  name: 'All Card Types',
  render: () => <AllCards />,
}

// ─── Content Card (with controls) ────────────────────────────────────────────

const contentCardMeta: Meta<ContentCardProps> = {
  component: ContentCard,
  argTypes: {
    heading: { control: 'text', name: 'Heading' },
    body: { control: 'text', name: 'Body text' },
    buttonLabel: { control: 'text', name: 'Button label' },
    showButton: { control: 'boolean', name: 'Show button' },
    align: { control: 'radio', options: ['left', 'center', 'right'], name: 'Alignment' },
  },
}

export const Content: StoryObj<ContentCardProps> = {
  name: 'Content Card',
  ...contentCardMeta,
  parameters: { layout: 'padded' },
  args: {
    heading: 'About This Site',
    body: 'This website was developed using Next.js, React, TypeScript, shadcn/ui, and Tailwind CSS. The design draws from Neumorphism and Glassmorphism to create a textured, depth-rich feel.',
    buttonLabel: 'View on GitHub',
    showButton: true,
    align: 'center',
  },
  render: (args) => <ContentCard {...args} />,
}

// ─── Step Card (with controls) ───────────────────────────────────────────────

const stepCardMeta: Meta<StepCardProps> = {
  component: StepCard,
  argTypes: {
    stepNumber: { control: 'text', name: 'Step number' },
    title: { control: 'text', name: 'Title' },
    description: { control: 'text', name: 'Description' },
    showGlow: { control: 'boolean', name: 'Show corner glow' },
    align: { control: 'radio', options: ['left', 'center', 'right'], name: 'Alignment' },
  },
}

export const ProcessStep: StoryObj<StepCardProps> = {
  name: 'Process / Step Card',
  ...stepCardMeta,
  parameters: { layout: 'padded' },
  args: {
    stepNumber: '01',
    title: 'Discovery',
    description: 'We start by understanding your goals, audience, and existing brand to map out the right approach before writing a single line of code.',
    showGlow: true,
    align: 'left',
  },
  render: (args) => <StepCard {...args} />,
}

// ─── Clickable Card (with controls) ──────────────────────────────────────────

const clickableCardMeta: Meta<ClickableCardProps> = {
  component: ClickableCard,
  argTypes: {
    label: { control: 'text', name: 'Label' },
  },
}

export const Clickable: StoryObj<ClickableCardProps> = {
  name: 'Clickable Selection Card',
  ...clickableCardMeta,
  parameters: { layout: 'padded' },
  args: {
    label: 'E-Commerce & Online Store',
  },
  render: (args) => <ClickableCard {...args} />,
}
