"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { LinkIcon, CheckIcon } from "lucide-react"

interface UrlImageInputProps {
  value: string
  onChange: (url: string) => void
  label?: string
}

export function UrlImageInput({ value, onChange, label = "URL изображения" }: UrlImageInputProps) {
  const [tempUrl, setTempUrl] = useState(value)
  const [isValidUrl, setIsValidUrl] = useState(false)

  const validateAndSetUrl = () => {
    if (tempUrl && (tempUrl.startsWith("http://") || tempUrl.startsWith("https://"))) {
      onChange(tempUrl)
      setIsValidUrl(true)
      setTimeout(() => setIsValidUrl(false), 2000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      validateAndSetUrl()
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          value={tempUrl}
          onChange={(e) => setTempUrl(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="https://example.com/image.jpg"
          className="flex-1"
        />
        <Button type="button" variant="outline" size="sm" onClick={validateAndSetUrl} className="px-3 bg-transparent">
          {isValidUrl ? <CheckIcon className="h-4 w-4 text-green-500" /> : <LinkIcon className="h-4 w-4" />}
        </Button>
      </div>

      {value && (
        <div className="mt-2">
          <img
            src={value || "/placeholder.svg"}
            alt="Preview"
            className="w-full h-32 object-cover rounded border"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = "none"
            }}
          />
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Вставьте прямую ссылку на изображение или используйте загрузку файла выше
      </p>
    </div>
  )
}
