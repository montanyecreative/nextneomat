import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components/ui/button'

// The site uses one button pattern: outline variant, rounded-full, uppercase, hover red.
const siteClass = 'rounded-full px-10 text-white hover:bg-red hover:border-red hover:text-white cursor-pointer uppercase text-[12px]'

const meta: Meta<typeof Button> = {
  title: 'Brand/Button',
  component: Button,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  name: 'CTA — Default',
  args: {
    variant: 'outline',
    className: siteClass,
    children: 'Learn More',
  },
}

export const WithIcon: Story = {
  name: 'CTA — With Icon',
  render: () => (
    <Button variant="outline" className={siteClass}>
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 6 }}>
        <path d="M7.5 1C3.91 1 1 3.91 1 7.5S3.91 14 7.5 14 14 11.09 14 7.5 11.09 1 7.5 1zm.75 9.75h-1.5v-4.5h1.5v4.5zm0-6h-1.5v-1.5h1.5v1.5z" fill="currentColor" />
      </svg>
      View Resume
    </Button>
  ),
}

export const Disabled: Story = {
  name: 'CTA — Disabled',
  args: {
    variant: 'outline',
    className: `${siteClass} disabled:opacity-50 disabled:cursor-not-allowed`,
    children: 'Submitting…',
    disabled: true,
  },
}
