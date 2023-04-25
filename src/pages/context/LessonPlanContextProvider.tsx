import { useRouter } from "next/router"
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react"
import { resolveLessonPlan } from "../api/LearningPathService"
import { LessonPlan } from "./Lesson.types"
import { LoadingContext } from "./LoadingContextProvider"
import { SurveyContext } from "./SurveyContextProvider"

interface LessonPlanContextValue {
  lessonPlan: LessonPlan
  setLessonPlan: React.Dispatch<React.SetStateAction<LessonPlan>>
  getLessonPlan: () => Promise<void>
}

export const LessonPlanContext = createContext<LessonPlanContextValue>({
  lessonPlan: { summary: "", chapters: [] },
  setLessonPlan: () => {},
  getLessonPlan: async () => {},
})

export const LessonPlanContextProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const { topic, surveyResults } = useContext(SurveyContext)
  const [lessonPlan, setLessonPlan] = useState<any>(null)
  const { setIsLoading } = useContext(LoadingContext)
  const router = useRouter()

  const getLessonPlan = useCallback(async () => {
    if (surveyResults) {
      const prompt = `Create a lesson plan for a new learning path about ${topic} based on the following user survey results: ${JSON.stringify(
        surveyResults
      )}
    
      focus on the 80/20 of the topic and keep it to 5 lessons per chapter.
      
      Return in a VALID json format something like this 
      {
        "chapters": [
          {
            "title": "",
            "lessons": [
              {
                "title": "",
                "content": "",
                "summary": ""
              }
            ]
          }
        ]
      }`

      setIsLoading(true)
      const lessonPlan = await resolveLessonPlan(prompt)
      setIsLoading(false)

      const { chapters, summary } = lessonPlan

      setLessonPlan({ summary, chapters })
    }
  }, [setIsLoading, surveyResults, topic])

  useEffect(() => {
    if (surveyResults && surveyResults.length > 0) {
      getLessonPlan()
      router.push("/lessonPlan")
    }
  }, [getLessonPlan, surveyResults])

  const value: LessonPlanContextValue = {
    lessonPlan,
    setLessonPlan,
    getLessonPlan,
  }

  return (
    <LessonPlanContext.Provider value={value}>
      {children}
    </LessonPlanContext.Provider>
  )
}
