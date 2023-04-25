import React, { ReactNode } from "react"
import { LessonContextProvider } from "./LessonContextProvider"
import { SurveyContextProvider } from "./SurveyContextProvider"
import { LessonPlansContextProvider } from "./LessonPlansContextProvider"
import { LoadingContextProvider } from "./LoadingContextProvider"
import { LessonPlanContextProvider } from "./LessonPlanContextProvider"

interface Props {
  children: ReactNode
}

const Providers = ({ children }: Props) => {
  return (
    <LoadingContextProvider>
      <SurveyContextProvider>
        <LessonContextProvider>
          <LessonPlansContextProvider>
            <LessonPlanContextProvider>{children}</LessonPlanContextProvider>
          </LessonPlansContextProvider>
        </LessonContextProvider>
      </SurveyContextProvider>
    </LoadingContextProvider>
  )
}

export default Providers
