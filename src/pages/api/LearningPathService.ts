import { Configuration, OpenAIApi } from "openai"
import { Lesson, LessonPlan } from "../context/Lesson.types"
import { SurveyData } from "../context/Survey.types"

const configuration = new Configuration({
  accessToken: "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",
  apiKey: "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",
})

const openai = new OpenAIApi(configuration)
let chatHistory: any = []

const generateCompletion = async (
  message: string,
  isUserMessage: boolean = true
) => {
  const model = "text-davinci-003"
  const stop = "###STOP###"
  // Add the new message to chatHistory
  chatHistory.push({
    role: isUserMessage ? "user" : "assistant",
    content: message,
  })

  // Limit chatHistory to the last N messages if needed
  const maxChatHistoryLength = 9
  if (chatHistory.length > maxChatHistoryLength) {
    chatHistory = chatHistory.slice(-maxChatHistoryLength)
  }

  // Create a formatted chat log for the OpenAI prompt
  const chatLog = chatHistory
    .map((msg: any) => `${msg.role}: ${msg.content}`)
    .join("\n")

  const prompt = `${chatLog}\nassistant:`
  const response = await openai.createCompletion({
    model,
    prompt,
    temperature: 0.8,
    max_tokens: 2048,
    stop,
  })

  const data = response.data
  const choices = data?.choices || []
  const result = choices[0]?.text || ""

  // Add the generated response to chatHistory
  chatHistory.push({ role: "assistant", content: result })

  return result
}

export const resolveLessonPlan = async (prompt: string) => {
  const lessonPlan = await generateCompletion(prompt)
  return JSON.parse(lessonPlan) as unknown as LessonPlan
}

export const resolveLesson = async (prompt: string): Promise<Lesson> => {
  const lesson = await generateCompletion(prompt)
  return JSON.parse(lesson) as unknown as Lesson
}

export const resolveSurvey = async (topic: string): Promise<SurveyData> => {
  const prompt = `Generate 3-5 multiple choice survey questions for a user to complete before starting a new learning path about ${topic}. 
    
    Return in a VALID json format like this 
    [
      {
        "question": "What is your experience level with cooking steak?",
        "options": [
          "Beginner",
          "Intermediate",
          "Advanced"
        ]
      },
    ]
    `
  const surveyQuestions = await generateCompletion(prompt)
  return JSON.parse(surveyQuestions) as unknown as SurveyData
}
