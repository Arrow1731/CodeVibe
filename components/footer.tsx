"use client"

import Link from "next/link"
import { GithubIcon, LinkedinIcon, TwitterIcon, MailIcon } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-primary mb-4 block">
              DevTeam
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">{t("footer.description")}</p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <GithubIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="mailto:info@devteam.uz" className="text-muted-foreground hover:text-primary transition-colors">
                <MailIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("footer.services")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/portfolio" className="hover:text-primary transition-colors">
                  {t("services.websites")}
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-primary transition-colors">
                  {t("services.programs")}
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-primary transition-colors">
                  {t("services.bots")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  {t("services.design")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("footer.contact")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>info@devteam.uz</li>
              <li>+998 90 123 45 67</li>
              <li>{t("contact.location")}</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} DevTeam. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  )
}
