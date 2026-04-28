import type { FC, SVGProps } from 'react'

export interface AuthUser {
  id: string
  name: string
  email: string
}

export interface NavItem {
  name: string
  href: string
}

export interface SocialItem {
  name: string
  href: string
  icon: FC<SVGProps<SVGSVGElement>>
}

export interface Project {
  id: number | string
  title: string
  content: string
  projectTechstack: string
  imageSrc: string
  gitLink: string
}
