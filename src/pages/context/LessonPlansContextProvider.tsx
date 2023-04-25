import React, { createContext, useState, useContext, useCallback } from "react"
import { resolveLessonPlan } from "../api/LearningPathService"
import { LessonPlan } from "./Lesson.types"
import { LoadingContext } from "./LoadingContextProvider"

interface LessonPlansContextValue {
  lessonPlans: LessonPlan[]
  getLessonPlans: (topic: string) => Promise<void>
}

export const LessonPlansContext = createContext<LessonPlansContextValue>({
  lessonPlans: [],
  getLessonPlans: async (topic: string) => {},
})

export const LessonPlansContextProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>([])
  const { setIsLoading } = useContext(LoadingContext)

  const getLessonPlans = useCallback(
    async (topic: string) => {
      const criteria = [
        "age",
        "background",
        "experience level",
        "learning speed",
        "learning type",
        "personality",
        "tendency to game",
      ]

      const newLessonPlans: LessonPlan[] = []

      for (let i = 0; i < criteria.length; i++) {
        const prompt = `Create a few lesson plans for a learning path about ${topic} that are tailored to people with different ${criteria[i]}.
  
        The titles of each Lesson Plan should sound like a youtube video from Johnny Harris.
        
        Return in a VALID json format something like this 
        {
          "summary": "",
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
        const lessonPlanJson = await resolveLessonPlan(prompt)
        setIsLoading(false)

        const lessonPlan = lessonPlanJson

        newLessonPlans.push({
          ...lessonPlan,
        })
      }

      setLessonPlans((prevLessonPlans) => [
        ...prevLessonPlans,
        ...newLessonPlans,
      ])
    },
    [setIsLoading]
  )

  const value: LessonPlansContextValue = {
    lessonPlans,
    getLessonPlans,
  }

  return (
    <LessonPlansContext.Provider value={value}>
      {children}
    </LessonPlansContext.Provider>
  )
}
