// Telegram Bot API integration
interface ContactForm {
  name: string
  email: string
  phone: string
  projectType: string
  message: string
}

export async function sendToTelegram(formData: ContactForm): Promise<void> {
  // Replace with your actual bot token and chat ID
  const BOT_TOKEN = "YOUR_BOT_TOKEN"
  const CHAT_ID = "YOUR_CHAT_ID"

  const message = `
🔔 Новая заявка с сайта!

👤 Имя: ${formData.name}
📧 Email: ${formData.email}
📱 Телефон: ${formData.phone}
🎯 Тип проекта: ${formData.projectType}
💬 Сообщение: ${formData.message}

Время: ${new Date().toLocaleString("ru-RU")}
  `.trim()

  // For demo purposes, we'll just log the message
  // In a real project, you would send this to Telegram API
  console.log("Sending to Telegram:", message)

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Uncomment and configure for real Telegram integration:
  /*
  const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'HTML',
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to send message to Telegram')
  }
  */
}
