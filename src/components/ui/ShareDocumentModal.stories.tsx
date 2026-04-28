import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import ShareDocumentModal from './ShareDocumentModal'

const meta: Meta<typeof ShareDocumentModal> = {
  title: 'UI/ShareDocumentModal',
  component: ShareDocumentModal,
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof ShareDocumentModal>

function ModalWrapper() {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button className="btn" onClick={() => setOpen(true)}>Share</button>
      <ShareDocumentModal
        open={open}
        onClose={() => setOpen(false)}
        shareUrl="https://example.com/snippet/abc123"
      />
    </div>
  )
}

export const Default: Story = {
  render: () => <ModalWrapper />,
}
