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

const LogoPlaceholder = () => (
  <img
    src="https://cdn.simpleicons.org/react/9eff1f"
    alt="Logo"
    style={{ height: '2rem', width: 'auto' }}
  />
)

export const LoggedOut: Story = {
  render: () => (
    <div className="bg-background min-h-screen">
      <SiteHeader
        logo={<LogoPlaceholder />}
        siteName="Hillol Barman"
        navItems={navItems}
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
        logo={<LogoPlaceholder />}
        siteName="Hillol Barman"
        navItems={navItems}
        currentPath="/playground"
        currentUser={{ id: '1', name: 'hillol_dev', email: 'hillol@example.com' }}
        onNavigate={(to) => console.log('navigate', to)}
        onLogout={() => console.log('logout')}
      />
    </div>
  ),
}

export const AppShell: Story = {
  render: () => (
    <div className="bg-background min-h-screen">
      <SiteHeader
        logo={
          <div style={{ width: 28, height: 28, borderRadius: 6, background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0a0c0d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </div>
        }
        siteName="Grounded"
        badge="beta"
        currentUser={{ id: '1', name: 'hillol_dev', email: 'hillol@example.com' }}
        onLogout={() => console.log('logout')}
      />
    </div>
  ),
}
