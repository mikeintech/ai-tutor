import React, { createContext, useContext, useState } from "react"
import { resolveSurvey } from "../api/LearningPathService"
import { LoadingContext } from "./LoadingContextProvider"
import { SurveyData } from "./Survey.types"

interface SurveyContextValue {
  surveyData: SurveyData
  setSurveyData: React.Dispatch<React.SetStateAction<SurveyData>>
  topic: string
  surveyResults: string[]
  setSurveyResults: React.Dispatch<React.SetStateAction<string[]>>
  selectedOption: string
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>
  currentQuestionIndex: number
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>
  getSurvey: (topic: string) => Promise<void>
  handleSubmitSurvey: (results: string[]) => void
}

export const SurveyContext = createContext<SurveyContextValue>({
  surveyData: [],
  setSurveyData: () => {},
  topic: "",
  surveyResults: [],
  setSurveyResults: () => {},
  selectedOption: "",
  setSelectedOption: () => {},
  currentQuestionIndex: 0,
  setCurrentQuestionIndex: () => {},
  getSurvey: async () => {},
  handleSubmitSurvey: (results: string[]) => {},
})

export const SurveyContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [surveyData, setSurveyData] = useState<SurveyData>([])
  const [topic, setTopic] = useState("")
  const [surveyResults, setSurveyResults] = useState<string[]>([])
  const [selectedOption, setSelectedOption] = useState("")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const { setIsLoading } = useContext(LoadingContext)

  const getSurvey = async (topic: string) => {
    setIsLoading(true)
    const survey = await resolveSurvey(topic)
    setIsLoading(false)
    setSurveyData(survey)
    setTopic(topic)
  }

  const handleSubmitSurvey = (results: string[]) => {
    setSurveyResults(results)
  }

  const value: SurveyContextValue = {
    surveyData,
    setSurveyData,
    topic,
    surveyResults,
    setSurveyResults,
    selectedOption,
    setSelectedOption,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    getSurvey,
    handleSubmitSurvey,
  }

  return (
    <SurveyContext.Provider value={value}>{children}</SurveyContext.Provider>
  )
}
