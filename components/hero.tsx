"use client"

import { Button } from "@/components/ui/button"
import { ArrowRightIcon, CodeIcon, SmartphoneIcon, BotIcon } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">{t("hero.title")}</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">{t("hero.subtitle")}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button asChild size="lg">
              <Link href="/portfolio">
                {t("hero.viewWork")}
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">{t("hero.contact")}</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CodeIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t("services.websites")}</h3>
              <p className="text-muted-foreground text-sm">{t("services.websitesDesc")}</p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <SmartphoneIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t("services.programs")}</h3>
              <p className="text-muted-foreground text-sm">{t("services.programsDesc")}</p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BotIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t("services.bots")}</h3>
              <p className="text-muted-foreground text-sm">{t("services.botsDesc")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
