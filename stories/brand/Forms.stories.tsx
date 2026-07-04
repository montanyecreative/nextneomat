import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

type Alignment = 'left' | 'center' | 'right'

const inputClass = 'text-[16px] !shadow-none !bg-black/40 !border-white/10 hover:!bg-black/50 focus:!bg-black/50 focus:!border-white/20'
const submitClass = 'rounded-full px-10 text-white hover:bg-red hover:border-red hover:text-white cursor-pointer uppercase text-[12px]'

function FieldError({ message }: { message: string }) {
  return <p className="text-[0.8rem] font-medium text-destructive">{message}</p>
}

// ─── Controlled form component ───────────────────────────────────────────────

interface ContactFormProps {
  namePlaceholder: string
  emailPlaceholder: string
  phonePlaceholder: string
  messagePlaceholder: string
  submitLabel: string
  align: Alignment
  state: 'default' | 'errors' | 'submitting'
}

function ContactForm({
  namePlaceholder,
  emailPlaceholder,
  phonePlaceholder,
  messagePlaceholder,
  submitLabel,
  align,
  state,
}: ContactFormProps) {
  const alignClass = { left: 'text-left', center: 'text-center', right: 'text-right' }[align]
  const justifyClass = { left: 'justify-start', center: 'justify-center', right: 'justify-end' }[align]
  const hasErrors = state === 'errors'
  const isSubmitting = state === 'submitting'

  return (
    <form className={`space-y-8 aktiv-grotesk-regular glass-form-deep-blue p-8 rounded-2xl relative ${alignClass}`}>
      <div className="space-y-2">
        <Input
          placeholder={namePlaceholder}
          defaultValue={isSubmitting ? 'Jane Smith' : ''}
          className={`${inputClass}${hasErrors ? ' !border-destructive' : ''}`}
        />
        {hasErrors && <FieldError message="Name must be at least 1 character." />}
      </div>

      <div className="space-y-2">
        <Input
          placeholder={emailPlaceholder}
          type="email"
          defaultValue={isSubmitting ? 'jane@example.com' : ''}
          className={`${inputClass}${hasErrors ? ' !border-destructive' : ''}`}
        />
        {hasErrors && <FieldError message="Please enter a valid email address." />}
      </div>

      <div className="space-y-2">
        <Input
          placeholder={phonePlaceholder}
          type="tel"
          defaultValue={isSubmitting ? '(555) 867-5309' : ''}
          className={`${inputClass}${hasErrors ? ' !border-destructive' : ''}`}
        />
        {hasErrors && <FieldError message="Please enter a valid phone number." />}
      </div>

      <div className="space-y-2">
        <Textarea
          placeholder={messagePlaceholder}
          defaultValue={isSubmitting ? "I'd love to discuss a new website for my business." : ''}
          className={`${inputClass} min-h-[200px]${hasErrors ? ' !border-destructive' : ''}`}
        />
        {hasErrors && <FieldError message="Message must be at least 1 character." />}
      </div>

      <div className={`flex ${justifyClass}`}>
        <Button
          type="button"
          variant="outline"
          disabled={isSubmitting}
          className={`${submitClass} disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isSubmitting ? 'Submitting...' : submitLabel}
        </Button>
      </div>
    </form>
  )
}

// ─── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<ContactFormProps> = {
  title: 'Brand/Forms',
  component: ContactForm,
  parameters: { layout: 'padded' },
  argTypes: {
    namePlaceholder: { control: 'text', name: 'Name placeholder' },
    emailPlaceholder: { control: 'text', name: 'Email placeholder' },
    phonePlaceholder: { control: 'text', name: 'Phone placeholder' },
    messagePlaceholder: { control: 'text', name: 'Message placeholder' },
    submitLabel: { control: 'text', name: 'Submit label' },
    align: { control: 'radio', options: ['left', 'center', 'right'], name: 'Alignment' },
    state: {
      control: 'radio',
      options: ['default', 'errors', 'submitting'],
      name: 'State',
    },
  },
}

export default meta
type Story = StoryObj<ContactFormProps>

const defaultArgs: ContactFormProps = {
  namePlaceholder: 'Name',
  emailPlaceholder: 'Email',
  phonePlaceholder: 'Phone',
  messagePlaceholder: 'What can we help you with?',
  submitLabel: 'Submit',
  align: 'left',
  state: 'default',
}

export const Default: Story = {
  name: 'Contact Form — Default',
  args: defaultArgs,
  render: (args) => <ContactForm {...args} />,
}

export const ValidationErrors: Story = {
  name: 'Contact Form — Validation Errors',
  args: { ...defaultArgs, state: 'errors' },
  render: (args) => <ContactForm {...args} />,
}

export const FilledSubmitting: Story = {
  name: 'Contact Form — Filled & Submitting',
  args: { ...defaultArgs, state: 'submitting' },
  render: (args) => <ContactForm {...args} />,
}
