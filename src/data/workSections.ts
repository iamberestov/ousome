export type WorkMedia =
  | {
      type: 'video'
      src: string
      webm?: string
      poster?: string
      aspectRatio?: number
      label?: string
    }
  | {
      type: 'image'
      src: string
      alt: string
      aspectRatio?: number
    }

export interface WorkSection {
  id: string
  title: string
  meta: string
  height: number
  projectTitle: string
  projectMeta: string
  sidebarHeading?: string
  sidebarBody: string
  media?: WorkMedia
}

const agentsProject = {
  projectTitle: 'ClickUp — AI Agents',
  projectMeta: '2025–2026',
}

const workSections: WorkSection[] = [
  {
    id: 'project-01',
    title: 'My Tasks',
    meta: 'ClickUp / 2025',
    height: 641,
    ...agentsProject,
    media: {
      type: 'video',
      src: '/work/project-01/my-tasks.mp4',
      webm: '/work/project-01/my-tasks.webm',
      poster: '/work/project-01/my-tasks-poster.webp',
      aspectRatio: 907 / 668,
      label: 'ClickUp Brain interface demo',
    },
    sidebarBody:
      'ClickUp Super Agents are AI teammates that use the context of tasks, docs, conversations, and schedules to answer questions, track progress, send updates, and automate repetitive workflows.',
  },
  {
    id: 'project-02',
    title: 'AI Agent Builder',
    meta: 'ClickUp / 2025',
    height: 800,
    ...agentsProject,
    sidebarHeading: 'My role & impact',
    sidebarBody:
      'I led product design for AI Agents from the earliest stages, turning a technically complex and ambiguous AI concept into a clear product experience inside ClickUp.',
  },
  {
    id: 'project-03',
    title: 'Brain Assistant',
    meta: 'ClickUp / 2025',
    height: 800,
    ...agentsProject,
    sidebarHeading: 'My role & impact',
    sidebarBody:
      'I shaped the full agent lifecycle: introducing the agent mental model, designing creation and configuration flows, defining how agents use workspace context, and creating patterns for triggers, skills, tools, knowledge, monitoring, editing, and continuous improvement.',
  },
  {
    id: 'project-04',
    title: 'Workspace Search',
    meta: 'ClickUp / 2024',
    height: 800,
    ...agentsProject,
    sidebarHeading: 'Cumulative impact',
    sidebarBody:
      'Helped define and design ClickUp Super Agents from concept to scaled adoption: 220K+ agents created, 151K+ creators, 139K+ workspaces creating agents, 80K+ activated agents, 41K+ adopted agents, 129K+ monthly active agents, and 9.1M+ non-intro runs. I also shaped a distinct visual language and interaction model that made Super Agents feel like trusted AI teammates, not another generic AI assistant.',
  },
  {
    id: 'project-05',
    title: 'Dashboard Platform',
    meta: 'Wrike / 2023',
    height: 800,
    projectTitle: 'Dashboard Platform',
    projectMeta: 'Wrike / 2023',
    sidebarBody: 'Placeholder copy for the Dashboard Platform case study.',
  },
  {
    id: 'project-06',
    title: 'Design System',
    meta: 'Sberbank / 2022',
    height: 800,
    projectTitle: 'Design System',
    projectMeta: 'Sberbank / 2022',
    sidebarBody: 'Placeholder copy for the Design System case study.',
  },
  {
    id: 'project-07',
    title: 'Mobile Banking',
    meta: 'Sberbank / 2021',
    height: 800,
    projectTitle: 'Mobile Banking',
    projectMeta: 'Sberbank / 2021',
    sidebarBody: 'Placeholder copy for the Mobile Banking case study.',
  },
  {
    id: 'project-08',
    title: 'Brand Refresh',
    meta: 'Freelance / 2020',
    height: 800,
    projectTitle: 'Brand Refresh',
    projectMeta: 'Freelance / 2020',
    sidebarBody: 'Placeholder copy for the Brand Refresh case study.',
  },
]

export default workSections
