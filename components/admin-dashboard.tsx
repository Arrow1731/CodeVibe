"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { PlusIcon, LogOutIcon, EditIcon, TrashIcon } from "lucide-react"
import { addProject, getProjects, updateProject, deleteProject } from "@/lib/firebase"
import { ImageUpload } from "@/components/image-upload"
import { UrlImageInput } from "@/components/url-image-input"

interface AdminDashboardProps {
  onLogout: () => void
}

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

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState<Project>({
    title: "",
    description: "",
    category: "website",
    image: "",
    technologies: [],
    liveUrl: "",
    githubUrl: "",
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const projectsData = await getProjects()
      setProjects(projectsData)
    } catch (error) {
      console.error("Error fetching projects:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const projectData = {
        ...formData,
        technologies:
          formData.technologies.length > 0
            ? formData.technologies
            : formData.technologies
                .toString()
                .split(",")
                .map((tech) => tech.trim())
                .filter(Boolean),
      }

      if (editingProject?.id) {
        await updateProject(editingProject.id, projectData)
        toast({
          title: "Проект обновлен",
          description: "Проект успешно обновлен",
        })
      } else {
        await addProject(projectData)
        toast({
          title: "Проект добавлен",
          description: "Новый проект успешно добавлен",
        })
      }

      setFormData({
        title: "",
        description: "",
        category: "website",
        image: "",
        technologies: [],
        liveUrl: "",
        githubUrl: "",
      })
      setEditingProject(null)
      fetchProjects()
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить проект",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setFormData(project)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Вы уверены, что хотите удалить этот проект?")) {
      try {
        await deleteProject(id)
        toast({
          title: "Проект удален",
          description: "Проект успешно удален",
        })
        fetchProjects()
      } catch (error) {
        toast({
          title: "Ошибка",
          description: "Не удалось удалить проект",
          variant: "destructive",
        })
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    onLogout()
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Админ панель</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOutIcon className="h-4 w-4 mr-2" />
            Выйти
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add/Edit Project Form */}
          <Card>
            <CardHeader>
              <CardTitle>{editingProject ? "Редактировать проект" : "Добавить новый проект"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Название</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Описание</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Категория</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value: "website" | "program" | "bot") =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Веб-сайт</SelectItem>
                      <SelectItem value="program">Программа</SelectItem>
                      <SelectItem value="bot">Telegram бот</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <ImageUpload
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  label="Изображение проекта"
                />

                <div className="text-center text-sm text-muted-foreground my-2">или</div>

                <UrlImageInput
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  label="Ссылка на изображение"
                />

                <div>
                  <Label htmlFor="technologies">Технологии (через запятую)</Label>
                  <Input
                    id="technologies"
                    value={
                      Array.isArray(formData.technologies) ? formData.technologies.join(", ") : formData.technologies
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        technologies: e.target.value
                          .split(",")
                          .map((tech) => tech.trim())
                          .filter(Boolean),
                      })
                    }
                    placeholder="React, Next.js, TypeScript"
                  />
                </div>

                <div>
                  <Label htmlFor="liveUrl">Ссылка на проект (опционально)</Label>
                  <Input
                    id="liveUrl"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="githubUrl">GitHub ссылка (опционально)</Label>
                  <Input
                    id="githubUrl"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/username/repo"
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={loading}>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    {loading ? "Сохранение..." : editingProject ? "Обновить" : "Добавить"}
                  </Button>
                  {editingProject && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setEditingProject(null)
                        setFormData({
                          title: "",
                          description: "",
                          category: "website",
                          image: "",
                          technologies: [],
                          liveUrl: "",
                          githubUrl: "",
                        })
                      }}
                    >
                      Отмена
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Projects List */}
          <Card>
            <CardHeader>
              <CardTitle>Существующие проекты</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {projects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{project.title}</h3>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(project)}>
                          <EditIcon className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => project.id && handleDelete(project.id)}>
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                    <div className="flex gap-2 text-xs">
                      <span className="bg-primary/10 px-2 py-1 rounded">{project.category}</span>
                      {Array.isArray(project.technologies) &&
                        project.technologies.map((tech, index) => (
                          <span key={index} className="bg-muted px-2 py-1 rounded">
                            {tech}
                          </span>
                        ))}
                    </div>
                  </div>
                ))}
                {projects.length === 0 && <p className="text-center text-muted-foreground py-8">Проекты не найдены</p>}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
