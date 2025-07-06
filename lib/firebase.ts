// // Firebase configuration and functions
// // Note: In a real project, you would install firebase SDK
// // For this demo, we'll simulate Firebase functions

// interface Project {
//   id?: string
//   title: string
//   description: string
//   category: "website" | "program" | "bot"
//   image: string
//   technologies: string[]
//   liveUrl?: string
//   githubUrl?: string
// }

// // Simulated Firebase functions
// let projects: Project[] = [
//   {
//     id: "1",
//     title: "E-commerce Website",
//     description: "Современный интернет-магазин с корзиной и оплатой",
//     category: "website",
//     image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
//     technologies: ["React", "Next.js", "Stripe", "Tailwind CSS"],
//     liveUrl: "https://example.com",
//     githubUrl: "https://github.com/example/repo",
//   },
//   {
//     id: "2",
//     title: "Task Management App",
//     description: "Приложение для управления задачами команды",
//     category: "program",
//     image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
//     technologies: ["React Native", "Node.js", "MongoDB"],
//     liveUrl: "https://example.com",
//     githubUrl: "https://github.com/example/repo",
//   },
//   {
//     id: "3",
//     title: "Customer Support Bot",
//     description: "Telegram бот для поддержки клиентов",
//     category: "bot",
//     image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=300&fit=crop",
//     technologies: ["Node.js", "Telegram API", "PostgreSQL"],
//     githubUrl: "https://github.com/example/repo",
//   },
//   {
//     id: "4",
//     title: "Restaurant Website",
//     description: "Сайт ресторана с онлайн бронированием",
//     category: "website",
//     image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
//     technologies: ["Vue.js", "Nuxt.js", "Firebase"],
//     liveUrl: "https://example.com",
//     githubUrl: "https://github.com/example/repo",
//   },
//   {
//     id: "5",
//     title: "Inventory Management System",
//     description: "Система управления складскими запасами",
//     category: "program",
//     image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
//     technologies: ["Python", "Django", "PostgreSQL", "React"],
//     liveUrl: "https://example.com",
//     githubUrl: "https://github.com/example/repo",
//   },
//   {
//     id: "6",
//     title: "Weather Notification Bot",
//     description: "Бот для уведомлений о погоде",
//     category: "bot",
//     image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop",
//     technologies: ["Node.js", "Telegram API", "Weather API"],
//     githubUrl: "https://github.com/example/repo",
//   },
// ]

// export async function getProjects(): Promise<Project[]> {
//   // Simulate API delay
//   await new Promise((resolve) => setTimeout(resolve, 1000))
//   return projects
// }

// export async function addProject(project: Omit<Project, "id">): Promise<void> {
//   // Simulate API delay
//   await new Promise((resolve) => setTimeout(resolve, 500))
//   const newProject = {
//     ...project,
//     id: Date.now().toString(),
//   }
//   projects.push(newProject)
// }

// export async function updateProject(id: string, project: Omit<Project, "id">): Promise<void> {
//   // Simulate API delay
//   await new Promise((resolve) => setTimeout(resolve, 500))
//   const index = projects.findIndex((p) => p.id === id)
//   if (index !== -1) {
//     projects[index] = { ...project, id }
//   }
// }

// export async function deleteProject(id: string): Promise<void> {
//   // Simulate API delay
//   await new Promise((resolve) => setTimeout(resolve, 500))
//   projects = projects.filter((p) => p.id !== id)
// }




























// Firebase configuration and functions
// Note: Install firebase with: npm install firebase

import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

interface Project {
  id?: string
  title: string
  description: string
  category: "website" | "program" | "bot"
  image: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  createdAt?: Date
  updatedAt?: Date
}

// Check if Firebase is available
let firebaseAvailable = false
let db: any = null
let storage: any = null

try {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyA8u1j9VzXRIyGMss-oeoZPvPFVJKtdvSY",
    authDomain: "codevibe-3d4e6.firebaseapp.com",
    projectId: "codevibe-3d4e6",
    storageBucket: "codevibe-3d4e6.firebasestorage.app",
    messagingSenderId: "433367407995",
    appId: "1:433367407995:web:7e2deff44d87cf8400f1de",
  }

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  db = getFirestore(app)
  storage = getStorage(app)
  firebaseAvailable = true

  console.log("✅ Firebase подключен успешно!")
} catch (error) {
  console.warn("⚠️ Firebase не установлен. Используется локальное хранилище.")
  console.warn("Для установки выполните: npm install firebase")
  firebaseAvailable = false
}

// Local storage fallback
let localProjects: Project[] = [
  {
    id: "1",
    title: "E-commerce Website",
    description: "Современный интернет-магазин с корзиной и оплатой",
    category: "website",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
    technologies: ["React", "Next.js", "Stripe", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example/repo",
    createdAt: new Date(),
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
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "Customer Support Bot",
    description: "Telegram бот для поддержки клиентов",
    category: "bot",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=300&fit=crop",
    technologies: ["Node.js", "Telegram API", "PostgreSQL"],
    githubUrl: "https://github.com/example/repo",
    createdAt: new Date(),
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
    createdAt: new Date(),
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
    createdAt: new Date(),
  },
  {
    id: "6",
    title: "Weather Notification Bot",
    description: "Бот для уведомлений о погоде",
    category: "bot",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop",
    technologies: ["Node.js", "Telegram API", "Weather API"],
    githubUrl: "https://github.com/example/repo",
    createdAt: new Date(),
  },
]

// Get all projects from Firestore
export async function getProjects(): Promise<Project[]> {
  if (firebaseAvailable && db) {
    try {
      const querySnapshot = await getDocs(collection(db, "projects"))
      const projects: Project[] = []

      querySnapshot.forEach((doc) => {
        projects.push({
          id: doc.id,
          ...doc.data(),
        } as Project)
      })

      return projects.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return b.createdAt.getTime() - a.createdAt.getTime()
        }
        return 0
      })
    } catch (error) {
      console.error("Firebase error, using local storage:", error)
    }
  }

  // Fallback to local storage
  await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate loading
  return [...localProjects]
}

// Add new project to Firestore
export async function addProject(project: Omit<Project, "id">): Promise<void> {
  if (firebaseAvailable && db) {
    try {
      await addDoc(collection(db, "projects"), {
        ...project,
        createdAt: new Date(),
      })
      return
    } catch (error) {
      console.error("Firebase error, using local storage:", error)
    }
  }

  // Fallback to local storage
  await new Promise((resolve) => setTimeout(resolve, 500))
  const newProject = {
    ...project,
    id: Date.now().toString(),
    createdAt: new Date(),
  }
  localProjects.unshift(newProject)
}

// Update existing project in Firestore
export async function updateProject(id: string, project: Omit<Project, "id">): Promise<void> {
  if (firebaseAvailable && db) {
    try {
      const projectRef = doc(db, "projects", id)
      await updateDoc(projectRef, {
        ...project,
        updatedAt: new Date(),
      })
      return
    } catch (error) {
      console.error("Firebase error, using local storage:", error)
    }
  }

  // Fallback to local storage
  await new Promise((resolve) => setTimeout(resolve, 500))
  const index = localProjects.findIndex((p) => p.id === id)
  if (index !== -1) {
    localProjects[index] = { ...project, id, updatedAt: new Date() }
  }
}

// Delete project from Firestore
export async function deleteProject(id: string): Promise<void> {
  if (firebaseAvailable && db) {
    try {
      await deleteDoc(doc(db, "projects", id))
      return
    } catch (error) {
      console.error("Firebase error, using local storage:", error)
    }
  }

  // Fallback to local storage
  await new Promise((resolve) => setTimeout(resolve, 500))
  localProjects = localProjects.filter((p) => p.id !== id)
}

// Upload image to Firebase Storage
export async function uploadImage(file: File, path: string): Promise<string> {
  if (firebaseAvailable && storage) {
    try {
      const storageRef = ref(storage, `images/${path}/${Date.now()}_${file.name}`)
      const snapshot = await uploadBytes(storageRef, file)
      const downloadURL = await getDownloadURL(snapshot.ref)
      return downloadURL
    } catch (error) {
      console.error("Firebase Storage error:", error)
    }
  }

  // Fallback to local file URL
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      resolve(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  })
}

export { db, storage }