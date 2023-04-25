import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react"
import { resolveLesson } from "../api/LearningPathService"
import { Lesson } from "./Lesson.types"
import { LessonPlanContext } from "./LessonPlanContextProvider"
import { LoadingContext } from "./LoadingContextProvider"

interface LessonContextValue {
  currentLesson: number
  setCurrentLesson: React.Dispatch<React.SetStateAction<number>>
  lessons: Lesson[]
  setLessons: React.Dispatch<React.SetStateAction<any[]>>
  getLesson: () => Promise<void>
  nextLesson: () => void
}

export const LessonContext = createContext<LessonContextValue>({
  currentLesson: 0,
  setCurrentLesson: () => {},
  lessons: [],
  setLessons: () => {},
  getLesson: async () => {},
  nextLesson: () => {},
})

export const LessonContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { lessonPlan } = useContext(LessonPlanContext)
  const [currentLesson, setCurrentLesson] = useState<number>(0)
  const [lessons, setLessons] = useState<any[]>([])
  const { setIsLoading } = useContext(LoadingContext)

  const getLesson = useCallback(async () => {
    if (lessonPlan) {
      const prompt = `Based on the lesson plan, Generate the next lesson in the chapter if no chapter has been started lets start at chapter 1.
          
          "contents" of json should contain:
          1. try to relate the lesson to something we use in real life and use a metaphor to help explain it further
          2. include an interactive diagram description
          
          Return in a VALID json format something like this 
          {
            "chapterTitle": "",
            "title": "",
            "content": "",
            "summary": ""
          }`
      setIsLoading(true)
      const lesson = await resolveLesson(prompt)
      setIsLoading(false)

      setLessons([...lessons, lesson])
    }
  }, [lessonPlan, lessons, setIsLoading])

  const nextLesson = useCallback(async () => {
    await getLesson()
    setCurrentLesson(currentLesson + 1)
  }, [currentLesson, getLesson])

  const value: LessonContextValue = {
    currentLesson,
    setCurrentLesson,
    lessons,
    setLessons,
    getLesson,
    nextLesson,
  }

  return (
    <LessonContext.Provider value={value}>{children}</LessonContext.Provider>
  )
}
