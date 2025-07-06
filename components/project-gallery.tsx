"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react"

interface ProjectGalleryProps {
  images: string[]
  title: string
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!images || images.length === 0) return null

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
        {images.slice(0, 6).map((image, index) => (
          <div
            key={index}
            className="aspect-square bg-muted rounded cursor-pointer overflow-hidden"
            onClick={() => {
              setCurrentIndex(index)
              setIsModalOpen(true)
            }}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`${title} - ${index + 1}`}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
        ))}
        {images.length > 6 && (
          <div
            className="aspect-square bg-muted rounded cursor-pointer flex items-center justify-center"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="text-sm font-medium">+{images.length - 6}</span>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black/70"
              onClick={() => setIsModalOpen(false)}
            >
              <XIcon className="h-4 w-4" />
            </Button>

            <img
              src={images[currentIndex] || "/placeholder.svg"}
              alt={`${title} - ${currentIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded"
            />

            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                  onClick={prevImage}
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                  onClick={nextImage}
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-white" : "bg-white/50"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
