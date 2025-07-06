"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircleIcon, XCircleIcon } from "lucide-react"

export function FirebaseStatus() {
  const [status, setStatus] = useState<"checking" | "connected" | "disconnected">("checking")

  useEffect(() => {
    const checkFirebase = async () => {
      try {
        // Try to import Firebase
        await import("firebase/app")
        setStatus("connected")
      } catch (error) {
        setStatus("disconnected")
      }
    }

    checkFirebase()
  }, [])

  if (status === "checking") {
    return null
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {status === "connected" ? (
              <>
                <CheckCircleIcon className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium text-green-700">Firebase подключен</p>
                  <p className="text-sm text-green-600">Данные сохраняются в облаке</p>
                </div>
              </>
            ) : (
              <>
                <XCircleIcon className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="font-medium text-orange-700">Firebase не установлен</p>
                  <p className="text-sm text-orange-600">Используется локальное хранилище</p>
                </div>
              </>
            )}
          </div>

          {status === "disconnected" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                window.open("https://firebase.google.com/docs/web/setup", "_blank")
              }}
            >
              Установить Firebase
            </Button>
          )}
        </div>

        {status === "disconnected" && (
          <div className="mt-3 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
            <p className="text-sm text-orange-700 dark:text-orange-300">
              <strong>Для установки Firebase:</strong>
            </p>
            <code className="block mt-1 text-xs bg-orange-100 dark:bg-orange-900/30 p-2 rounded">
              npm install firebase
            </code>
          </div>
        )}
      </CardContent>
    </Card>
  )
}