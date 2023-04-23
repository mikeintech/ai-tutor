import { useState } from "react"
import Head from "next/head"
import { Box, Button, TextField, ThemeProvider } from "@material-ui/core"
import { createTheme } from "@material-ui/core/styles"
import { Configuration, OpenAIApi } from "openai"
import { Survey, SurveyQuestion } from "./survey"
import { LessonPlan } from "./lessonPlan"

const theme = createTheme({
  palette: {
    primary: {
      main: "#1a73e8",
    },
  },
})

const configuration = new Configuration({
  apiKey: "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",
})

const openai = new OpenAIApi(configuration)

export default function Home(): JSX.Element {
  const [topic, setTopic] = useState<string>("")
  const [showSurvey, setShowSurvey] = useState<boolean>(false)
  const [questions, setQuestions] = useState<SurveyQuestion[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [showLessonPlan, setShowLessonPlan] = useState<boolean>(false)
  const [surveyResults, setSurveyResults] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)

    const surveyQuestions = await resolveSurvey(topic)

    setLoading(false)

    console.log(surveyQuestions)

    setShowSurvey(true)
    setQuestions(JSON.parse(surveyQuestions ?? ""))
  }

  const handleSurveySubmit = (surveyResults: string[]) => {
    setSurveyResults(surveyResults)
    setShowLessonPlan(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value)
  }

  const resolveSurvey = async (topic: string) => {
    const prompt = `Generate 2-4 multiple choice survey questions for a user to complete before starting a new learning path about ${topic}. 
    
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

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      n: 1,
      temperature: 0.1,
      max_tokens: 3500,
      stop: "###STOP###",
    })

    const completionData = response.data || {}
    const choices = completionData.choices || []
    const surveyQuestions = choices[0].text

    return surveyQuestions
  }

  return (
    <>
      <Head>
        <title>AI Tutor App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider theme={theme}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          {showLessonPlan ? (
            <LessonPlan surveyResults={surveyResults} />
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              p={2}
              border="1px solid #ddd"
              borderRadius="16px"
            >
              <form onSubmit={handleSubmit}>
                <Box display="flex" alignItems="center" mb={2}>
                  <TextField
                    id="topic"
                    name="topic"
                    label="Type a topic to learn it fast with AI"
                    value={topic}
                    onChange={handleChange}
                  />
                </Box>

                <Button variant="contained" color="primary" type="submit">
                  Start Learning
                </Button>
              </form>

              {questions.length > 0 && (
                <Survey
                  questions={questions}
                  handleSurveySubmit={handleSurveySubmit}
                />
              )}
            </Box>
          )}
        </Box>
      </ThemeProvider>
    </>
  )
}
