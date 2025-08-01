"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GithubIcon, SendIcon, Target, InstagramIcon } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function TeamSection() {
  const { t } = useLanguage()

  const team = [
    {
      name: "Azizbek Kamilov",
      role: t("team.developer1Role"),
      image: "/placeholder.svg?height=300&width=300",
      bio: t("team.developer1Bio"),
      social: {
        github: "https://github.com/Arrow1731",
        send: "https://t.me/KamilovAzizbek",
        instagram: "https://www.instagram.com/azizbek17.01/",
      },
    },
    {
      name: "Sobirjon otajonov",
      role: t("team.developer2Role"),
      image: "/placeholder.svg?height=300&width=300",
      bio: t("team.developer2Bio"),
      social: {
        github: "https://github.com/SOB1Rake",
        send: "https://t.me/otajanovv_s",
        instagram: "https://www.instagram.com/otajanovv_s/",
      },
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t("team.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("team.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="text-center">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground mb-6">{member.bio}</p>

                  <div className="flex justify-center space-x-4">
                    <Button variant="ghost" size="sm" asChild>
                      <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                        <GithubIcon className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={member.social.send} target="_blank" rel="noopener noreferrer">
                        <SendIcon className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={member.social.instagram} target="_blank" rel="noopener noreferrer">
                        <InstagramIcon className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
