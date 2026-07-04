import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const inputClass = 'text-[16px] !shadow-none !bg-black/40 !border-white/10 hover:!bg-black/50 focus:!bg-black/50 focus:!border-white/20'
const submitClass = 'rounded-full px-10 text-white hover:bg-red hover:border-red hover:text-white cursor-pointer uppercase text-[12px]'

function FieldError({ message }: { message: string }) {
  return <p className="text-[0.8rem] font-medium text-destructive">{message}</p>
}

function ContactFormDefault() {
  return (
    <form className="space-y-8 aktiv-grotesk-regular glass-form-deep-blue p-8 rounded-2xl relative">
      <Input placeholder="Name" className={inputClass} />
      <Input placeholder="Email" type="email" className={inputClass} />
      <Input placeholder="Phone" type="tel" className={inputClass} />
      <Textarea placeholder="What can we help you with?" className={`${inputClass} min-h-[200px]`} />
      <Button type="button" variant="outline" className={submitClass}>Submit</Button>
    </form>
  )
}

function ContactFormErrors() {
  return (
    <form className="space-y-8 aktiv-grotesk-regular glass-form-deep-blue p-8 rounded-2xl relative">
      <div className="space-y-2">
        <Input placeholder="Name" className={`${inputClass} !border-destructive`} />
        <FieldError message="Name must be at least 1 character." />
      </div>
      <div className="space-y-2">
        <Input placeholder="Email" className={`${inputClass} !border-destructive`} />
        <FieldError message="Please enter a valid email address." />
      </div>
      <div className="space-y-2">
        <Input placeholder="Phone" className={`${inputClass} !border-destructive`} />
        <FieldError message="Please enter a valid phone number." />
      </div>
      <div className="space-y-2">
        <Textarea placeholder="What can we help you with?" className={`${inputClass} min-h-[200px] !border-destructive`} />
        <FieldError message="Message must be at least 1 character." />
      </div>
      <Button type="button" variant="outline" className={submitClass}>Submit</Button>
    </form>
  )
}

function ContactFormFilled() {
  return (
    <form className="space-y-8 aktiv-grotesk-regular glass-form-deep-blue p-8 rounded-2xl relative">
      <Input defaultValue="Jane Smith" className={inputClass} />
      <Input defaultValue="jane@example.com" type="email" className={inputClass} />
      <Input defaultValue="(555) 867-5309" type="tel" className={inputClass} />
      <Textarea defaultValue="I'd love to discuss a new website for my business." className={`${inputClass} min-h-[200px]`} />
      <Button type="button" variant="outline" disabled className={`${submitClass} disabled:opacity-50 disabled:cursor-not-allowed`}>
        Submitting...
      </Button>
    </form>
  )
}

const meta: Meta = {
  title: 'Brand/Forms',
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  name: 'Contact Form — Default',
  render: () => <ContactFormDefault />,
}

export const ValidationErrors: Story = {
  name: 'Contact Form — Validation Errors',
  render: () => <ContactFormErrors />,
}

export const FilledSubmitting: Story = {
  name: 'Contact Form — Filled & Submitting',
  render: () => <ContactFormFilled />,
}
