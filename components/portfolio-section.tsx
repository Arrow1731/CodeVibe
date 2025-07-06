// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { ExternalLinkIcon, GithubIcon } from "lucide-react"
// import { useLanguage } from "@/components/language-provider"
// import { getProjects } from "@/lib/firebase"

// interface Project {
//   id: string
//   title: string
//   description: string
//   category: "website" | "program" | "bot"
//   image: string
//   technologies: string[]
//   liveUrl?: string
//   githubUrl?: string
// }

// export function PortfolioSection() {
//   const { t } = useLanguage()
//   const [projects, setProjects] = useState<Project[]>([])
//   const [selectedCategory, setSelectedCategory] = useState<string>("all")
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const projectsData = await getProjects()
//         setProjects(projectsData)
//       } catch (error) {
//         console.error("Error fetching projects:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchProjects()
//   }, [])

//   const categories = [
//     { id: "all", name: t("portfolio.all") },
//     { id: "website", name: t("portfolio.websites") },
//     { id: "program", name: t("portfolio.programs") },
//     { id: "bot", name: t("portfolio.bots") },
//   ]

//   const filteredProjects =
//     selectedCategory === "all" ? projects : projects.filter((project) => project.category === selectedCategory)

//   if (loading) {
//     return (
//       <section className="py-20 px-4 sm:px-6 lg:px-8">
//         <div className="container mx-auto">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
//             <p className="mt-4 text-muted-foreground">{t("common.loading")}</p>
//           </div>
//         </div>
//       </section>
//     )
//   }

//   return (
//     <section className="py-20 px-4 sm:px-6 lg:px-8">
//       <div className="container mx-auto">
//         <div className="text-center mb-16">
//           <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t("portfolio.title")}</h1>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("portfolio.subtitle")}</p>
//         </div>

//         {/* Category Filter */}
//         <div className="flex flex-wrap justify-center gap-4 mb-12">
//           {categories.map((category) => (
//             <Button
//               key={category.id}
//               variant={selectedCategory === category.id ? "default" : "outline"}
//               onClick={() => setSelectedCategory(category.id)}
//             >
//               {category.name}
//             </Button>
//           ))}
//         </div>

//         {/* Projects Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredProjects.map((project) => (
//             <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
//               <div className="aspect-video bg-muted">
//                 <img
//                   src={project.image || "/placeholder.svg"}
//                   alt={project.title}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <CardHeader>
//                 <div className="flex justify-between items-start">
//                   <CardTitle className="text-xl">{project.title}</CardTitle>
//                   <Badge variant="secondary">{t(`portfolio.${project.category}`)}</Badge>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-muted-foreground mb-4">{project.description}</p>

//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {project.technologies.map((tech, index) => (
//                     <Badge key={index} variant="outline" className="text-xs">
//                       {tech}
//                     </Badge>
//                   ))}
//                 </div>

//                 <div className="flex gap-2">
//                   {project.liveUrl && (
//                     <Button size="sm" asChild>
//                       <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
//                         <ExternalLinkIcon className="h-4 w-4 mr-2" />
//                         {t("portfolio.viewLive")}
//                       </a>
//                     </Button>
//                   )}
//                   {project.githubUrl && (
//                     <Button size="sm" variant="outline" asChild>
//                       <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
//                         <GithubIcon className="h-4 w-4 mr-2" />
//                         {t("portfolio.viewCode")}
//                       </a>
//                     </Button>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {filteredProjects.length === 0 && (
//           <div className="text-center py-12">
//             <p className="text-muted-foreground text-lg">{t("portfolio.noProjects")}</p>
//           </div>
//         )}
//       </div>
//     </section>
//   )
// }















"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLinkIcon, GithubIcon } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { getProjects } from "@/lib/firebase"

interface Project {
  id?: string // Сделать id необязательным
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

export function PortfolioSection() {
  const { t } = useLanguage()
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        setError(null)
        const projectsData = await getProjects()
        setProjects(projectsData)
      } catch (error) {
        console.error("Error fetching projects:", error)
        setError("Не удалось загрузить проекты")
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const categories = [
    { id: "all", name: t("portfolio.all") },
    { id: "website", name: t("portfolio.websites") },
    { id: "program", name: t("portfolio.programs") },
    { id: "bot", name: t("portfolio.bots") },
  ]

  const filteredProjects =
    selectedCategory === "all" ? projects : projects.filter((project) => project.category === selectedCategory)

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">{t("common.loading")}</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center">
            <p className="text-destructive text-lg">{error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Попробовать снова
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t("portfolio.title")}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("portfolio.subtitle")}</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Card key={project.id || index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-muted">
                <img
                  src={project.image || "/placeholder.svg?height=300&width=400"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=300&width=400"
                  }}
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <Badge variant="secondary">{t(`portfolio.${project.category}`)}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  {project.liveUrl && (
                    <Button size="sm" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLinkIcon className="h-4 w-4 mr-2" />
                        {t("portfolio.viewLive")}
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <GithubIcon className="h-4 w-4 mr-2" />
                        {t("portfolio.viewCode")}
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">{t("portfolio.noProjects")}</p>
          </div>
        )}
      </div>
    </section>
  )
}