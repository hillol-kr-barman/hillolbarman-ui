import type { Preview } from '@storybook/react'
import '../src/css/styles.css'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark',  value: '#0d0f0e' },
        { name: 'light', value: '#ffffff' },
      ],
    },
    layout: 'centered',
  },
}

export default preview
