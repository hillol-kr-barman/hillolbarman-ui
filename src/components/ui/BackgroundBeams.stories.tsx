import type { Meta, StoryObj } from '@storybook/react'
import BackgroundBeams from './BackgroundBeams'

const meta: Meta<typeof BackgroundBeams> = {
  title: 'UI/BackgroundBeams',
  component: BackgroundBeams,
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof BackgroundBeams>

export const Default: Story = {
  render: () => (
    <div className="relative h-screen bg-background">
      <BackgroundBeams />
      <div className="relative z-10 flex h-full items-center justify-center">
        <p className="text-white text-xl">BackgroundBeams behind content</p>
      </div>
    </div>
  ),
}
