import type { Meta, StoryObj } from '@storybook/react'
import ProjectCard from './ProjectCard'

const meta: Meta<typeof ProjectCard> = {
  title: 'UI/ProjectCard',
  component: ProjectCard,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof ProjectCard>

const sampleProject = {
  id: 1,
  title: 'Git Visualiser',
  content: 'A standalone web app for exploring GitHub repository activity through a readable workflow graph.',
  projectTechstack: 'React, TypeScript, FastAPI, Supabase',
  imageSrc: 'https://cdn.simpleicons.org/github/ffffff',
  gitLink: 'https://github.com/hillol-kr-barman/Github-Visualiser',
}

export const Featured: Story = {
  render: () => (
    <div className="w-72">
      <ProjectCard project={sampleProject} variant="featured" />
    </div>
  ),
}

export const List: Story = {
  render: () => (
    <div className="max-w-2xl">
      <ProjectCard project={sampleProject} variant="list" />
    </div>
  ),
}
