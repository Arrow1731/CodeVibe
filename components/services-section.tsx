"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeIcon, SmartphoneIcon, BotIcon, PaletteIcon, DatabaseIcon, ShieldIcon } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function ServicesSection() {
  const { t } = useLanguage()

  const services = [
    {
      icon: CodeIcon,
      title: t("services.webDev"),
      description: t("services.webDevDesc"),
    },
    {
      icon: SmartphoneIcon,
      title: t("services.mobileDev"),
      description: t("services.mobileDevDesc"),
    },
    {
      icon: BotIcon,
      title: t("services.botDev"),
      description: t("services.botDevDesc"),
    },
    {
      icon: PaletteIcon,
      title: t("services.design"),
      description: t("services.designDesc"),
    },
    {
      icon: DatabaseIcon,
      title: t("services.backend"),
      description: t("services.backendDesc"),
    },
    {
      icon: ShieldIcon,
      title: t("services.security"),
      description: t("services.securityDesc"),
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t("services.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("services.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
