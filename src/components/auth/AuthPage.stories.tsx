import type { Meta, StoryObj } from '@storybook/react'
import type { AuthUser } from '../../types'
import AuthPage from './AuthPage'

const meta: Meta<typeof AuthPage> = {
  title: 'Auth/AuthPage',
  component: AuthPage,
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof AuthPage>

const logoSrc = 'https://cdn.simpleicons.org/react/9eff1f'

const mockUser: AuthUser = { id: '1', name: 'Hillol Barman', email: 'hillol@example.com' }

const authProps = {
  logoSrc,
  logoAlt: 'Portfolio logo',
  onNavigate: (to: string) => console.log('navigate', to),
  onAuthChange: (user: AuthUser | null) => console.log('auth change', user),
  onLogin: async () => mockUser,
  onRegister: async () => mockUser,
  onForgotPassword: async () => {},
  onResetPassword: async () => mockUser,
  onLogout: async () => {},
}

export const Login: Story = {
  render: () => <AuthPage {...authProps} mode="login" />,
}

export const Register: Story = {
  render: () => <AuthPage {...authProps} mode="register" />,
}

export const ForgotPassword: Story = {
  render: () => <AuthPage {...authProps} mode="forgot-password" />,
}

export const ResetPassword: Story = {
  render: () => <AuthPage {...authProps} mode="reset-password" isPasswordRecoveryActive />,
}
