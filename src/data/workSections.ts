export type WorkMedia =
  | {
      type: 'video'
      src: string
      webm?: string
      poster?: string
      aspectRatio?: number
      label?: string
      layout?: 'default' | 'boxed'
      outerAspectRatio?: number
      boxRadius?: number
    }
  | {
      type: 'image'
      src: string
      alt: string
      aspectRatio?: number
      layout?: 'default' | 'boxed'
      outerAspectRatio?: number
      boxRadius?: number
    }
  | {
      type: 'svg'
      src: string
      alt: string
      aspectRatio?: number
      layout?: 'default' | 'boxed'
      outerAspectRatio?: number
      boxRadius?: number
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
  projectTitle: 'AI Agents',
  projectMeta: 'ClickUp / 2025–2026',
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
      outerAspectRatio: 1168 / 800,
      layout: 'boxed',
      boxRadius: 8,
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
    media: {
      type: 'video',
      src: '/work/project-02/agent-builder.mp4',
      webm: '/work/project-02/agent-builder.webm',
      poster: '/work/project-02/agent-builder-poster.webp',
      aspectRatio: 907 / 514,
      outerAspectRatio: 1168 / 800,
      layout: 'boxed',
      boxRadius: 8,
      label: 'AI Agent Builder loading interface',
    },
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
    media: {
      type: 'svg',
      src: '/work/project-03/brain-assistant.svg',
      alt: 'Brain Assistant agent builder interface',
      aspectRatio: 908 / 669,
      outerAspectRatio: 1168 / 800,
      layout: 'boxed',
      boxRadius: 8,
    },
  },
  {
    id: 'project-04',
    title: 'Workspace Search',
    meta: 'ClickUp / 2024',
    height: 800,
    ...agentsProject,
    sidebarHeading: 'Cumulative impact',
    sidebarBody:
      'Helped define and design ClickUp Super Agents from concept to scaled adoption, contributing to 250K+ agents created. My work influenced activation, retention, quality, and monetization by turning a technically complex AI system into an approachable product experience. I also shaped a distinct visual language and interaction model that became a strong product differentiator, helping Super Agents stand out in demos, sales conversations, and a crowded AI market.',
    media: {
      type: 'video',
      src: '/work/project-04/eyebrow-figma.mp4',
      poster: '/work/project-04/super-agents.png',
      aspectRatio: 3508 / 2160,
      outerAspectRatio: 1168 / 800,
      layout: 'boxed',
      boxRadius: 8,
      label: 'ClickUp Super Agents dashboard interface',
    },
  },
  {
    id: 'project-05',
    title: 'Dashboard Platform',
    meta: 'ClickUp / 2025',
    height: 800,
    ...agentsProject,
    sidebarBody: 'Placeholder copy for the Dashboard Platform case study.',
    media: {
      type: 'svg',
      src: '/work/project-05/consumption.svg',
      alt: 'Agent consumption analytics dashboard cards',
      aspectRatio: 1168 / 800,
      layout: 'default',
    },
  },
  {
    id: 'project-06',
    title: 'Design System',
    meta: 'ClickUp / 2025',
    height: 800,
    ...agentsProject,
    sidebarBody: 'Placeholder copy for the Design System case study.',
    media: {
      type: 'svg',
      src: '/work/project-06/credits.svg',
      alt: 'Design system credits interface',
      aspectRatio: 1168 / 800,
      layout: 'default',
    },
  },
  {
    id: 'project-07',
    title: 'Mobile Banking',
    meta: 'ClickUp / 2025',
    height: 800,
    ...agentsProject,
    sidebarBody: 'Placeholder copy for the Mobile Banking case study.',
    media: {
      type: 'svg',
      src: '/work/project-07/leaderboard.svg',
      alt: 'Mobile banking leaderboard interface',
      aspectRatio: 1168 / 800,
      layout: 'default',
    },
  },
  {
    id: 'project-08',
    title: 'Brand Refresh',
    meta: 'ClickUp / 2025',
    height: 800,
    ...agentsProject,
    sidebarBody: 'Placeholder copy for the Brand Refresh case study.',
    media: {
      type: 'video',
      src: '/work/project-08/agent-speak.mp4',
      aspectRatio: 2932 / 2160,
      outerAspectRatio: 1168 / 800,
      layout: 'boxed',
      boxRadius: 8,
      label: 'Brand Refresh interface demo',
    },
  },
  {
    id: 'project-09',
    title: 'Block Kit',
    meta: 'ClickUp / 2025',
    height: 800,
    ...agentsProject,
    sidebarBody: 'Placeholder copy for the Block Kit case study.',
    media: {
      type: 'svg',
      src: '/work/project-09/BlockKit.svg',
      alt: 'Block Kit interface',
      aspectRatio: 1168 / 800,
      layout: 'default',
    },
  },
  {
    id: 'project-10',
    title: 'Avatar Builder',
    meta: 'ClickUp / 2025',
    height: 800,
    ...agentsProject,
    sidebarBody: 'Placeholder copy for the Avatar Builder case study.',
    media: {
      type: 'svg',
      src: '/work/project-10/avatar%20builder%201.svg',
      alt: 'Avatar Builder interface',
      aspectRatio: 908 / 669,
      outerAspectRatio: 1168 / 800,
      layout: 'boxed',
      boxRadius: 8,
    },
  },
  {
    id: 'project-11',
    title: 'Triggers',
    meta: 'ClickUp / 2025',
    height: 800,
    ...agentsProject,
    sidebarBody: 'Placeholder copy for the Triggers case study.',
    media: {
      type: 'svg',
      src: '/work/project-11/trigger.svg',
      alt: 'Agent triggers interface',
      aspectRatio: 1168 / 800,
      layout: 'default',
    },
  },
  {
    id: 'project-12',
    title: 'Skills',
    meta: 'ClickUp / 2025',
    height: 800,
    ...agentsProject,
    sidebarBody: 'Placeholder copy for the Skills case study.',
    media: {
      type: 'svg',
      src: '/work/project-12/skills.svg',
      alt: 'Agent skills interface',
      aspectRatio: 1168 / 800,
      layout: 'default',
    },
  },
  {
    id: 'project-13',
    title: 'Forms',
    meta: 'ClickUp / 2024',
    height: 800,
    projectTitle: 'Forms',
    projectMeta: 'ClickUp / 2024',
    sidebarBody: 'Placeholder copy for the Forms case study.',
    media: {
      type: 'video',
      src: '/work/project-13/_main_x2_new.mp4',
      aspectRatio: 2880 / 1800,
      outerAspectRatio: 1168 / 800,
      layout: 'boxed',
      boxRadius: 8,
      label: 'ClickUp Forms interface demo',
    },
  },
  {
    id: 'project-14',
    title: 'My Tasks',
    meta: 'ClickUp 2025',
    height: 800,
    projectTitle: 'My Tasks',
    projectMeta: 'ClickUp 2025',
    sidebarBody: 'Placeholder copy for the My Tasks case study.',
    media: {
      type: 'video',
      src: '/work/project-14/My%20Tasks.mp4',
      aspectRatio: 2788 / 2160,
      outerAspectRatio: 1168 / 800,
      layout: 'boxed',
      boxRadius: 8,
      label: 'ClickUp My Tasks interface demo',
    },
  },
]

export default workSections
