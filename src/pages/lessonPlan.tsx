import { SurveyQuestion } from "./survey"
import { useState } from "react"
import { Box, Button, Container, Typography } from "@material-ui/core"
import { Configuration, OpenAIApi } from "openai"

interface LessonPlanProps {
  surveyResults: string[]
}

interface Lesson {
  title: string
  content: string
}

interface LessonPlan {
  summary: string
  lessons: Lesson[]
}

const configuration = new Configuration({
  apiKey: "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",
})

const openai = new OpenAIApi(configuration)

export const LessonPlan: React.FC<LessonPlanProps> = ({ surveyResults }) => {
  const [lessonPlan, setLessonPlan] = useState<LessonPlan | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [nextLesson, setNextLesson] = useState<Lesson | null>(null)
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0)

  const handleNextLesson = () => {
    setCurrentLessonIndex(currentLessonIndex + 1)
  }

  const handleCreateLessonPlan = async (lessonNumber: number = 0) => {
    setIsLoading(true)

    const prompt =
      lessonNumber === 0
        ? `Create a lesson plan for a new learning path about cooking steak based on the following user survey results: ${JSON.stringify(
            surveyResults
          )}
        Return in a VALID json format something like this 
        {
            lessons: [
                {
                    title: "",
                    content: "",
                    summary: ""
                }
            ]
        }
        `
        : `Generate the next lesson for the learning path about cooking steak. Lesson ${lessonNumber}. Return in a VALID json format something like this 
      {
        title: "",
        content: "",
        summary: ""
      }`

    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt,
      n: 1,
      temperature: 0.5,
      max_tokens: 2048,
      stop: "###STOP###",
    })

    const data = response.data
    const choices = data?.choices || []
    const text = choices[0]?.text || ""

    console.log(text)

    if (lessonNumber === 0) {
      setLessonPlan(JSON.parse(text))
    } else {
      setNextLesson(JSON.parse(text))
    }

    setIsLoading(false)
  }

  if (!lessonPlan) {
    return (
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" align="center">
            Lesson Plan Summary
          </Typography>
        </Box>

        <Box my={4} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleCreateLessonPlan()}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Create Lesson Plan"}
          </Button>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" align="center">
          {lessonPlan.summary}
        </Typography>
      </Box>

      <Box my={4}>
        {lessonPlan.lessons.map((lesson, index) => (
          <Box key={index} my={4}>
            <Typography variant="h5">{lesson.title}</Typography>
            <Typography>{lesson.content}</Typography>
          </Box>
        ))}
      </Box>
      {currentLessonIndex < lessonPlan.lessons.length - 1 ? (
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextLesson}
          >
            Next Lesson
          </Button>
        </Box>
      ) : null}
    </Container>
  )
}
