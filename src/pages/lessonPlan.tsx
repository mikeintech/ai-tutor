import react, { useEffect } from "react"
import { Box, Button, Container, Typography } from "@material-ui/core"
import { useRouter } from "next/router"
import { LessonPlanContext } from "./context/LessonPlanContextProvider"
import { LessonContext } from "./context/LessonContextProvider"

const LessonPlanPage: React.FC = () => {
  const { lessonPlan, getLessonPlan } = react.useContext(LessonPlanContext)
  const { getLesson } = react.useContext(LessonContext)
  const { chapters } = lessonPlan || {}
  const router = useRouter()

  const handleStartLesson = () => {
    getLesson()
    router.push("/lesson")
  }

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" align="center">
          {lessonPlan?.summary}
        </Typography>
      </Box>
      {(chapters || []).map((chapter, chapterIndex) => (
        <Box key={chapterIndex}>
          <Box my={4}>
            <Typography variant="h5">{chapter.title}</Typography>
          </Box>
          {(chapter.lessons || []).map((lesson, lessonIndex) => (
            <Box my={4} key={`${chapterIndex}-${lessonIndex}`}>
              <Box>
                <Typography variant="h6">{lesson.title}</Typography>
                <Typography>{lesson.content}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      ))}
      <Button variant="contained" color="primary" onClick={handleStartLesson}>
        Start Lesson Plan
      </Button>
      <hr />
    </Container>
  )
}

export default LessonPlanPage
