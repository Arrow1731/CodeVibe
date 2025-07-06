// // Telegram Bot API integration
// interface ContactForm {
//   name: string
//   email: string
//   phone: string
//   projectType: string
//   message: string
// }

// export async function sendToTelegram(formData: ContactForm): Promise<void> {
//   // Replace with your actual bot token and chat ID
//   const BOT_TOKEN = "7251139888:AAFiNwGVceAoSYr6HSkwLbcaQoX6aoi42W8"
//   const CHAT_ID = "6536432455"

//   const message = `
// 🔔 Новая заявка с сайта!

// 👤 Имя: ${formData.name}
// 📧 Email: ${formData.email}
// 📱 Телефон: ${formData.phone}
// 🎯 Тип проекта: ${formData.projectType}
// 💬 Сообщение: ${formData.message}

// Время: ${new Date().toLocaleString("ru-RU")}
//   `.trim()

//   // For demo purposes, we'll just log the message
//   // In a real project, you would send this to Telegram API
//   console.log("Sending to Telegram:", message)

//   // Simulate API call
//   await new Promise((resolve) => setTimeout(resolve, 1000))

//   // Uncomment and configure for real Telegram integration:
//   /*
//   const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       chat_id: CHAT_ID,
//       text: message,
//       parse_mode: 'HTML',
//     }),
//   })

//   if (!response.ok) {
//     throw new Error('Failed to send message to Telegram')
//   }
//   */
// }























// Telegram Bot API integration
interface ContactForm {
  name: string
  email: string
  phone: string
  projectType: string
  message: string
}

const BOT_TOKEN = "7251139888:AAFiNwGVceAoSYr6HSkwLbcaQoX6aoi42W8"
const CHAT_ID = "@CodeVibe_combot" // Или ваш личный chat ID

export async function sendToTelegram(formData: ContactForm): Promise<void> {
  const message = `
🔔 *Новая заявка с сайта DevTeam!*

👤 *Имя:* ${formData.name}
📧 *Email:* ${formData.email}
📱 *Телефон:* ${formData.phone || "Не указан"}
🎯 *Тип проекта:* ${formData.projectType || "Не указан"}

💬 *Сообщение:*
${formData.message}

⏰ *Время:* ${new Date().toLocaleString("ru-RU", {
    timeZone: "Asia/Tashkent",
  })}

---
Отправлено с сайта: DevTeam
  `.trim()

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error("Telegram API error:", result)
      throw new Error(`Telegram API error: ${result.description || "Unknown error"}`)
    }

    console.log("Message sent successfully to Telegram:", result)
  } catch (error) {
    console.error("Error sending message to Telegram:", error)
    throw new Error("Failed to send message to Telegram")
  }
}

// Функция для отправки уведомления о новом проекте в админ панели
export async function notifyNewProject(projectTitle: string): Promise<void> {
  const message = `
🎉 *Новый проект добавлен!*

📝 *Название:* ${projectTitle}
⏰ *Время:* ${new Date().toLocaleString("ru-RU", {
    timeZone: "Asia/Tashkent",
  })}

Проект добавлен через админ панель сайта DevTeam.
  `.trim()

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    })
  } catch (error) {
    console.error("Error sending project notification:", error)
    // Не выбрасываем ошибку, чтобы не прерывать основной процесс
  }
}