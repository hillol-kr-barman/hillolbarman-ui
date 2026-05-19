import { useState, useEffect, type ReactNode } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import type { AuthUser, NavItem } from '../../types'
import AlertDialogBox from '../ui/AlertDialogBox'

interface SiteHeaderProps {
  logo: ReactNode
  siteName?: string
  badge?: string
  navItems?: NavItem[]
  currentPath?: string
  currentUser?: AuthUser | null
  onNavigate?: (to: string) => void
  onLogout?: () => void
  /** Classes applied to the inner content wrapper. Defaults to 'mx-16 px-6'. Override to change the inner layout e.g. 'px-4 sm:px-8' for full-width projects. */
  containerClassName?: string
}

export default function SiteHeader({
  logo,
  siteName = '',
  badge,
  navItems = [],
  currentPath = '/',
  currentUser,
  onNavigate,
  onLogout,
  containerClassName = 'mx-16 px-6',
}: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    onNavigate?.(to)
  }

  const openLogoutDialog = () => {
    setMobileMenuOpen(false)
    setLogoutDialogOpen(true)
  }

  const handleConfirmLogout = () => {
    setLogoutDialogOpen(false)
    onLogout?.()
  }

  const loginPath = `/login${currentPath !== '/' ? `?redirect=${encodeURIComponent(currentPath)}` : ''}`

  return (
    <header className={`w-full sticky top-0 z-100 shrink-0 border-b transition-all duration-300 ${scrolled ? 'border-border bg-[rgba(13,15,14,0.72)] backdrop-blur-md' : 'border-transparent bg-transparent'}`}>
      <div className={`flex items-center ${scrolled ? 'h-14' : 'h-18'} ${containerClassName}`}>

      {/* Brand */}
      <div className="flex items-center gap-2.5 flex-1 min-w-0">
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); onNavigate?.('/') }}
          className="flex items-center gap-2.5 no-underline hover:no-underline"
        >
          {logo}
          {siteName && (
            <span className="text-text text-[0.95rem] font-semibold tracking-[-0.01em]">
              {siteName}
            </span>
          )}
        </a>
        {badge && (
          <span className="font-mono text-[0.6rem] text-subtle border border-border rounded px-1.5 py-0.5 flex-shrink-0">
            {badge}
          </span>
        )}
      </div>

      {/* Desktop nav */}
      {navItems.length > 0 && (
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavigate(e, item.href)}
              className={`group text-[0.82rem] font-medium transition-colors no-underline hover:no-underline ${
                currentPath === item.href ? 'text-accent' : 'text-muted hover:text-text'
              }`}
            >
              {item.name}
              <span
                className={`block h-px w-full origin-center bg-accent transition-transform duration-300 ${
                  currentPath === item.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />
            </a>
          ))}
        </nav>
      )}

      {/* Right: user pill / login + mobile hamburger */}
      <div className="flex items-center justify-end gap-3 flex-1">
        {currentUser ? (
          <div className="flex items-center gap-2 bg-surface border border-border rounded-full px-3 py-1">
            <span className="size-[7px] rounded-full bg-success flex-shrink-0" />
            <span className="font-mono text-[0.72rem] text-muted max-w-[14rem] truncate">
              {currentUser.name || currentUser.email}
            </span>
            <button
              type="button"
              onClick={openLogoutDialog}
              className="text-[0.72rem] text-subtle hover:text-accent transition-colors bg-transparent border-0 cursor-pointer p-0 ml-1 font-sans"
            >
              Sign out
            </button>
          </div>
        ) : (
          <a
            href={loginPath}
            onClick={(e) => handleNavigate(e, loginPath)}
            className="text-[0.82rem] font-semibold text-text no-underline hover:no-underline hover:text-accent transition-colors"
          >
            Log in <span aria-hidden="true">→</span>
          </a>
        )}

        {navItems.length > 0 && (
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden -m-2 p-2 text-muted hover:text-text transition-colors bg-transparent border-0 cursor-pointer"
          >
            <span className="sr-only">Open menu</span>
            <Bars3Icon className="size-5" aria-hidden="true" />
          </button>
        )}
      </div>
      </div>

      {/* Mobile menu */}
      {navItems.length > 0 && (
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-[200] bg-black/40" />
          <DialogPanel className="fixed inset-y-0 right-0 z-[200] w-full max-w-sm bg-surface border-l border-border overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2.5">
                {logo}
                {siteName && (
                  <span className="text-text text-[0.95rem] font-semibold tracking-[-0.01em]">
                    {siteName}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2 p-2 text-muted hover:text-text transition-colors bg-transparent border-0 cursor-pointer"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="size-5" aria-hidden="true" />
              </button>
            </div>

            <div className="grid gap-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavigate(e, item.href)}
                  className={`block rounded-[5px] px-3 py-2.5 text-[0.88rem] font-medium no-underline hover:no-underline transition-colors ${
                    currentPath === item.href
                      ? 'bg-soft text-accent'
                      : 'text-muted hover:bg-surface-strong hover:text-text'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              {currentUser ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="size-[7px] rounded-full bg-success flex-shrink-0" />
                    <span className="font-mono text-[0.72rem] text-muted truncate">
                      {currentUser.name || currentUser.email}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={openLogoutDialog}
                    className="text-[0.78rem] font-medium text-subtle hover:text-accent transition-colors bg-transparent border-0 cursor-pointer p-0 ml-3 flex-shrink-0 font-sans"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <a
                  href={loginPath}
                  onClick={(e) => handleNavigate(e, loginPath)}
                  className="text-[0.88rem] font-semibold text-text no-underline hover:no-underline hover:text-accent transition-colors"
                >
                  Log in →
                </a>
              )}
            </div>
          </DialogPanel>
        </Dialog>
      )}

      {onLogout && (
        <AlertDialogBox
          open={logoutDialogOpen}
          onClose={() => setLogoutDialogOpen(false)}
          onConfirm={handleConfirmLogout}
          title="Sign out?"
          description="Your session will end on this device."
          confirmLabel="Sign out"
          cancelLabel="Cancel"
        />
      )}
    </header>
  )
}
