"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { MailIcon, PhoneIcon, MapPinIcon, SendIcon } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { sendToTelegram } from "@/lib/telegram"

export function ContactSection() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await sendToTelegram(formData)
      toast({
        title: t("contact.success"),
        description: t("contact.successMessage"),
      })
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        message: "",
      })
    } catch (error) {
      toast({
        title: t("contact.error"),
        description: t("contact.errorMessage"),
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t("contact.title")}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("contact.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>{t("contact.formTitle")}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">{t("contact.name")}</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label htmlFor="email">{t("contact.email")}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">{t("contact.phone")}</Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="projectType">{t("contact.projectType")}</Label>
                    <Input
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      placeholder={t("contact.projectTypePlaceholder")}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">{t("contact.message")}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <SendIcon className="h-4 w-4 mr-2" />
                  )}
                  {loading ? t("contact.sending") : t("contact.send")}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>{t("contact.info")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MailIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{t("contact.emailLabel")}</p>
                    <p className="text-muted-foreground">info@devteam.uz</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <PhoneIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{t("contact.phoneLabel")}</p>
                    <p className="text-muted-foreground">+998 90 123 45 67</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPinIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{t("contact.locationLabel")}</p>
                    <p className="text-muted-foreground">{t("contact.location")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("contact.workingHours")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{t("contact.weekdays")}</span>
                    <span className="text-muted-foreground">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("contact.saturday")}</span>
                    <span className="text-muted-foreground">10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("contact.sunday")}</span>
                    <span className="text-muted-foreground">{t("contact.closed")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
