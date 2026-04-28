import type { NavItem, SocialItem } from '../../types'

interface SiteFooterProps {
  navItems: NavItem[]
  socials: SocialItem[]
  ownerName: string
  copyrightSuffix?: string
}

export default function SiteFooter({ navItems, socials, ownerName, copyrightSuffix }: SiteFooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer>
      <div className="mx-auto max-w-6xl overflow-hidden px-5 py-16 sm:py-20 lg:px-6">
        <nav aria-label="Footer" className="-mb-6 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs">
          {navItems.map((item) => (
            <a key={item.name} href={item.href} className="text-muted hover:text-white">
              {item.name}
            </a>
          ))}
        </nav>
        <div className="mt-12 flex justify-center gap-x-8">
          {socials.map((item) => (
            <a key={item.name} href={item.href} target="_blank" rel="noreferrer" className="text-muted hover:text-white">
              <span className="sr-only">{item.name}</span>
              <item.icon aria-hidden="true" className="size-5" />
            </a>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-muted">
          &copy; {year} {ownerName}{copyrightSuffix ? `. ${copyrightSuffix}` : ''}
        </p>
      </div>
    </footer>
  )
}
