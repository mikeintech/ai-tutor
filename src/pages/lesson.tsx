import { useContext } from "react"
import { Box, Button, Typography } from "@material-ui/core"
import { LessonContext } from "./context/LessonContextProvider"

const LessonPage: React.FC = () => {
  const { lessons, currentLesson, nextLesson } = useContext(LessonContext)

  const displayLesson = lessons ? lessons[currentLesson] : null

  console.log(lessons)

  return (
    <Box my={4}>
      {displayLesson ? (
        <Box>
          <Typography variant="h4">{displayLesson.chapterTitle}</Typography>
          <Typography variant="h5">{displayLesson.title}</Typography>
          <Typography>{displayLesson.content}</Typography>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="contained" color="primary" onClick={nextLesson}>
              Next Lesson
            </Button>
          </Box>
        </Box>
      ) : null}
    </Box>
  )
}

export default LessonPage
