import axios from "axios";

// OpenAI API client yapılandırması
const openaiApi = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  },
});

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function generateChatCompletion(messages: ChatMessage[]) {
  "use server";

  try {
    const response = await openaiApi.post("/chat/completions", {
      model: "gpt-4-turbo",
      messages,
      temperature: 0.7,
      max_tokens: 1500,
    });

    return response.data.choices[0].message;
  } catch (error) {
    console.error("OpenAI API çağrısı sırasında hata:", error);
    throw new Error("Kod üretimi sırasında bir hata oluştu.");
  }
}

export async function generateCode(prompt: string) {
  "use server";

  const messages: ChatMessage[] = [
    {
      role: "system",
      content:
        "Sen deneyimli bir yazılım geliştiricisisin. Temiz, hatasız ve iyi yapılandırılmış kod üretiyorsun.",
    },
    { role: "user", content: prompt },
  ];

  return generateChatCompletion(messages);
}

export async function explainCode(code: string) {
  "use server";

  const messages: ChatMessage[] = [
    {
      role: "system",
      content:
        "Sen deneyimli bir yazılım geliştiricisisin. Kod parçalarını açık ve anlaşılır şekilde açıklayabilirsin.",
    },
    {
      role: "user",
      content: `Aşağıdaki kodu analiz et ve ne yaptığını açıkla:\n\n${code}`,
    },
  ];

  return generateChatCompletion(messages);
}
