import { useEffect, useMemo, useState } from 'react'
import { ArrowLongLeftIcon } from '@heroicons/react/20/solid'
import type { AuthUser } from '../../types'
import BackgroundBeams from '../ui/BackgroundBeams'

type AuthMode = 'login' | 'register' | 'forgot-password' | 'reset-password'

interface AuthPageProps {
  mode?: AuthMode
  logoSrc: string
  logoAlt?: string
  onNavigate: (to: string) => void
  routeSearch?: string
  currentUser?: AuthUser | null
  onAuthChange: (user: AuthUser | null) => void
  isPasswordRecoveryActive?: boolean
  onPasswordRecoveryConsumed?: () => void
  defaultRedirect?: string
  onLogin: (credentials: { email: string; password: string }) => Promise<AuthUser>
  onRegister: (data: { name: string; email: string; password: string }) => Promise<AuthUser>
  onForgotPassword: (email: string) => Promise<void>
  onResetPassword: (password: string) => Promise<AuthUser>
  onLogout: () => Promise<void>
}

interface FormState {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export default function AuthPage({
  mode = 'login',
  logoSrc,
  logoAlt = 'Logo',
  onNavigate,
  routeSearch = '',
  currentUser,
  onAuthChange,
  isPasswordRecoveryActive = false,
  onPasswordRecoveryConsumed = () => {},
  defaultRedirect = '/playground',
  onLogin,
  onRegister,
  onForgotPassword,
  onResetPassword,
  onLogout,
}: AuthPageProps) {
  const isRegistered = mode === 'register'
  const isForgotPassword = mode === 'forgot-password'
  const isResetPassword = mode === 'reset-password'

  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasCheckedRecovery, setHasCheckedRecovery] = useState(!isResetPassword)

  const recoveryHashPresent = typeof window !== 'undefined' && window.location.hash.includes('type=recovery')
  const canResetPassword = isPasswordRecoveryActive || recoveryHashPresent || Boolean(currentUser)

  const redirectPath = useMemo(() => {
    const params = new URLSearchParams(routeSearch)
    return params.get('redirect') || defaultRedirect
  }, [routeSearch, defaultRedirect])

  const title = useMemo(() => {
    if (isRegistered) return 'Set up your account'
    if (isForgotPassword) return 'Reset your password'
    if (isResetPassword) return 'Choose a new password'
    return 'Welcome back'
  }, [isForgotPassword, isRegistered, isResetPassword])

  const subtitle = useMemo(() => {
    if (isRegistered) return 'Create an account to save and manage your documents.'
    if (isForgotPassword) return 'Enter your email address to receive a password reset link.'
    if (isResetPassword) return 'Set a new password for your account.'
    return 'Log in to access your saved documents.'
  }, [isForgotPassword, isRegistered, isResetPassword])

  useEffect(() => {
    if (isResetPassword) return
    if (currentUser) {
      onNavigate(redirectPath)
    }
  }, [currentUser, isResetPassword, onNavigate, redirectPath])

  useEffect(() => {
    if (!isResetPassword) return

    if (canResetPassword) {
      setHasCheckedRecovery(true)
      setErrorMessage('')
      return
    }

    setHasCheckedRecovery(true)
    setErrorMessage('That reset link is invalid or has expired. Request a fresh password reset email.')
  }, [canResetPassword, isResetPassword])

  const handleRouteChange = (event: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    event.preventDefault()
    onNavigate(to)
  }

  const handleHeadBack = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (isResetPassword) {
      try {
        await onLogout()
      } catch {
        // Ignore logout errors — still move the user out of the recovery flow.
      }

      onPasswordRecoveryConsumed()
      onAuthChange(null)
      onNavigate('/login')
      return
    }

    onNavigate(redirectPath === defaultRedirect ? defaultRedirect : '/')
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormState((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')
    setIsSubmitting(true)

    try {
      if (isForgotPassword) {
        await onForgotPassword(formState.email)
        setSuccessMessage('Password reset email sent. Check your inbox for the recovery link.')
        return
      }

      if (isResetPassword) {
        if (!canResetPassword) {
          throw new Error('That reset link is invalid or has expired. Request a fresh password reset email.')
        }

        if (formState.password !== formState.confirmPassword) {
          throw new Error('Passwords do not match.')
        }

        const user = await onResetPassword(formState.password)
        onPasswordRecoveryConsumed()
        onAuthChange(user)
        onNavigate('/login')
        return
      }

      const user = isRegistered
        ? await onRegister({ name: formState.name, email: formState.email, password: formState.password })
        : await onLogin({ email: formState.email, password: formState.password })

      onAuthChange(user)
      onNavigate(redirectPath)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col justify-center px-4 py-4 sm:px-5 lg:px-6">
      <BackgroundBeams className="-z-10" />

      <div className="grid grid-cols-3 items-center sm:mx-auto sm:w-full sm:max-w-md">
        <div className="justify-self-start px-1 py-1 sm:px-3.5">
          <button
            type="button"
            onClick={handleHeadBack}
            className="inline-flex items-center gap-x-2 rounded-md bg-accent/20 px-2.5 py-1.5 text-xs font-semibold text-accent shadow-none transition-shadow duration-300 hover:shadow-[0_0_18px_color-mix(in_srgb,var(--color-accent)_45%,transparent)]"
          >
            <ArrowLongLeftIcon aria-hidden="true" className="-ml-0.5 size-5" />
            Back
          </button>
        </div>

        <img alt={logoAlt} src={logoSrc} className="justify-self-center h-10 w-auto" />
        <div aria-hidden="true" className="justify-self-end" />
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-xs">
        <h2 className="mt-3 text-center text-base/7 font-bold tracking-tight text-white">{title}</h2>
        <p className="mt-2 text-center text-sm/7 font-medium tracking-tight text-muted">{subtitle}</p>

        <div className="mt-4 bg-surface px-4 py-4 shadow-none outline -outline-offset-1 outline-white/10 sm:rounded-lg sm:px-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegistered ? (
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-white">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    disabled={isSubmitting}
                    value={formState.name}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-sm text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-accent"
                  />
                </div>
              </div>
            ) : null}

            {!isResetPassword ? (
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-white">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    disabled={isSubmitting}
                    autoComplete="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-sm text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-accent"
                  />
                </div>
              </div>
            ) : null}

            {!isForgotPassword ? (
              <div>
                <label htmlFor="password" className="block text-xs font-medium text-white">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    disabled={isSubmitting || (isResetPassword && !canResetPassword)}
                    autoComplete={isRegistered ? 'new-password' : 'current-password'}
                    value={formState.password}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-sm text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-accent"
                  />
                </div>
              </div>
            ) : null}

            {isResetPassword ? (
              <div>
                <label htmlFor="confirmPassword" className="block text-xs font-medium text-white">
                  Confirm password
                </label>
                <div className="mt-2">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    disabled={isSubmitting || !canResetPassword}
                    autoComplete="new-password"
                    value={formState.confirmPassword}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-sm text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-accent"
                  />
                </div>
              </div>
            ) : null}

            {!isRegistered && !isForgotPassword && !isResetPassword ? (
              <div className="-mt-1 text-right">
                <a
                  href={`/forgot-password?redirect=${encodeURIComponent(redirectPath)}`}
                  onClick={(e) => handleRouteChange(e, `/forgot-password?redirect=${encodeURIComponent(redirectPath)}`)}
                  className="text-xs font-semibold text-accent hover:text-accent/80"
                >
                  Forgot password?
                </a>
              </div>
            ) : null}

            {errorMessage ? (
              <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                {errorMessage}
              </p>
            ) : null}

            {successMessage ? (
              <p className="rounded-md border border-accent/30 bg-accent/10 px-3 py-2 text-sm text-white">
                {successMessage}
              </p>
            ) : null}

            <div>
              <button
                type="submit"
                disabled={isSubmitting || (isResetPassword && hasCheckedRecovery && !canResetPassword)}
                className="flex w-full justify-center rounded-md bg-accent px-3 py-1.5 text-sm/6 font-semibold text-black shadow-none transition-shadow duration-300 hover:shadow-[0_0_22px_color-mix(in_srgb,var(--color-accent)_55%,transparent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? 'Submitting...'
                  : isRegistered
                    ? 'Create account'
                    : isForgotPassword
                      ? 'Send reset link'
                      : isResetPassword
                        ? 'Update password'
                        : 'Sign in'}
              </button>
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-sm/6 text-muted">
          {isForgotPassword || isResetPassword ? (
            <>
              {isResetPassword ? 'Need a fresh recovery link?' : 'Remembered it?'}{' '}
              <a
                href={
                  isResetPassword
                    ? `/forgot-password?redirect=${encodeURIComponent(redirectPath)}`
                    : `/login?redirect=${encodeURIComponent(redirectPath)}`
                }
                onClick={(e) =>
                  handleRouteChange(
                    e,
                    isResetPassword
                      ? `/forgot-password?redirect=${encodeURIComponent(redirectPath)}`
                      : `/login?redirect=${encodeURIComponent(redirectPath)}`,
                  )
                }
                className="font-semibold text-accent hover:text-accent/80"
              >
                {isResetPassword ? 'Request password reset' : 'Back to sign in'}
              </a>
            </>
          ) : (
            <>
              {isRegistered ? 'Already have an account?' : 'Need an account?'}{' '}
              <a
                href={
                  isRegistered
                    ? `/login?redirect=${encodeURIComponent(redirectPath)}`
                    : `/register?redirect=${encodeURIComponent(redirectPath)}`
                }
                onClick={(e) =>
                  handleRouteChange(
                    e,
                    `${isRegistered ? '/login' : '/register'}?redirect=${encodeURIComponent(redirectPath)}`,
                  )
                }
                className="font-semibold text-accent hover:text-accent/80"
              >
                {isRegistered ? 'Sign in' : 'Register now'}
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
