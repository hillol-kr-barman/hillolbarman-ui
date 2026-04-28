import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import ConfirmationMessage from './ConfirmationMessage'

const meta: Meta<typeof ConfirmationMessage> = {
  title: 'UI/ConfirmationMessage',
  component: ConfirmationMessage,
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof ConfirmationMessage>

function ToastWrapper({ message }: { message?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="p-8">
      <button className="btn" onClick={() => { setOpen(true); setTimeout(() => setOpen(false), 3000) }}>
        Trigger toast
      </button>
      <ConfirmationMessage open={open} message={message} />
    </div>
  )
}

export const Default: Story = {
  render: () => <ToastWrapper />,
}

export const CustomMessage: Story = {
  render: () => <ToastWrapper message="Document shared successfully." />,
}
