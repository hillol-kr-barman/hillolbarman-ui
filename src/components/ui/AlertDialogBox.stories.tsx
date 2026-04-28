import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TrashIcon } from '@heroicons/react/24/outline'
import AlertDialogBox from './AlertDialogBox'

const meta: Meta<typeof AlertDialogBox> = {
  title: 'UI/AlertDialogBox',
  component: AlertDialogBox,
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof AlertDialogBox>

function DialogWrapper(props: Partial<React.ComponentProps<typeof AlertDialogBox>>) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button className="btn" onClick={() => setOpen(true)}>Open dialog</button>
      <AlertDialogBox
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        title="Are you sure?"
        description="This action cannot be undone."
        {...props}
      />
    </div>
  )
}

export const Danger: Story = {
  render: () => <DialogWrapper />,
}

export const CustomIcon: Story = {
  render: () => (
    <DialogWrapper
      title="Delete document?"
      description="The document will be permanently removed."
      confirmLabel="Delete"
      icon={TrashIcon}
    />
  ),
}
