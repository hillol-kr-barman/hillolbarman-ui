import type { Meta, StoryObj } from '@storybook/react'
import SiteHeader from './SiteHeader'

const meta: Meta<typeof SiteHeader> = {
  title: 'Layout/SiteHeader',
  component: SiteHeader,
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof SiteHeader>

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Playground', href: '/playground' },
  { name: 'About Me', href: '/about' },
]

const logoSrc = 'https://cdn.simpleicons.org/react/9eff1f'

export const LoggedOut: Story = {
  render: () => (
    <div className="bg-background min-h-screen">
      <SiteHeader
        navItems={navItems}
        logoSrc={logoSrc}
        logoAlt="Portfolio logo"
        siteName="Hillol Barman"
        currentPath="/"
        onNavigate={(to) => console.log('navigate', to)}
      />
    </div>
  ),
}

export const LoggedIn: Story = {
  render: () => (
    <div className="bg-background min-h-screen">
      <SiteHeader
        navItems={navItems}
        logoSrc={logoSrc}
        logoAlt="Portfolio logo"
        siteName="Hillol Barman"
        currentPath="/playground"
        currentUser={{ id: '1', name: 'Hillol Barman', email: 'hillol@example.com' }}
        onNavigate={(to) => console.log('navigate', to)}
        onLogout={() => console.log('logout')}
      />
    </div>
  ),
}
