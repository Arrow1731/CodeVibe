// Firebase configuration and functions
// Note: In a real project, you would install firebase SDK
// For this demo, we'll simulate Firebase functions

interface Project {
  id?: string
  title: string
  description: string
  category: "website" | "program" | "bot"
  image: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
}

// Simulated Firebase functions
let projects: Project[] = [
  {
    id: "1",
    title: "E-commerce Website",
    description: "Современный интернет-магазин с корзиной и оплатой",
    category: "website",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
    technologies: ["React", "Next.js", "Stripe", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example/repo",
  },
  {
    id: "2",
    title: "Task Management App",
    description: "Приложение для управления задачами команды",
    category: "program",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
    technologies: ["React Native", "Node.js", "MongoDB"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example/repo",
  },
  {
    id: "3",
    title: "Customer Support Bot",
    description: "Telegram бот для поддержки клиентов",
    category: "bot",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=300&fit=crop",
    technologies: ["Node.js", "Telegram API", "PostgreSQL"],
    githubUrl: "https://github.com/example/repo",
  },
  {
    id: "4",
    title: "Restaurant Website",
    description: "Сайт ресторана с онлайн бронированием",
    category: "website",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    technologies: ["Vue.js", "Nuxt.js", "Firebase"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example/repo",
  },
  {
    id: "5",
    title: "Inventory Management System",
    description: "Система управления складскими запасами",
    category: "program",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
    technologies: ["Python", "Django", "PostgreSQL", "React"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example/repo",
  },
  {
    id: "6",
    title: "Weather Notification Bot",
    description: "Бот для уведомлений о погоде",
    category: "bot",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop",
    technologies: ["Node.js", "Telegram API", "Weather API"],
    githubUrl: "https://github.com/example/repo",
  },
]

export async function getProjects(): Promise<Project[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return projects
}

export async function addProject(project: Omit<Project, "id">): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  const newProject = {
    ...project,
    id: Date.now().toString(),
  }
  projects.push(newProject)
}

export async function updateProject(id: string, project: Omit<Project, "id">): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  const index = projects.findIndex((p) => p.id === id)
  if (index !== -1) {
    projects[index] = { ...project, id }
  }
}

export async function deleteProject(id: string): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  projects = projects.filter((p) => p.id !== id)
}
