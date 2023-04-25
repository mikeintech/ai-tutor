import React, { useState, useContext } from "react"
import {
  Container,
  Box,
  Typography,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core"
import { SurveyContext } from "./context/SurveyContextProvider"

const SurveyPage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const { surveyData, setSurveyResults, setSelectedOption, selectedOption } =
    useContext(SurveyContext)

  const currentQuestion = surveyData[currentQuestionIndex]

  const [tempSurveyResults, setTempSurveyResults] = useState<string[]>([])

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value)
  }

  const handleNext = () => {
    setTempSurveyResults([...tempSurveyResults, selectedOption])
    setSelectedOption("")
    setCurrentQuestionIndex(currentQuestionIndex + 1)
  }

  const handleSurveySubmitAndNavigate = () => {
    setSurveyResults(tempSurveyResults)
  }

  return (
    <Container maxWidth="sm">
      <Box mt={4} mb={2}>
        <Typography variant="h4" align="center">
          {currentQuestion.question}
        </Typography>
      </Box>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="survey-option"
          name="survey-option"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          {(currentQuestion.options || []).map(
            (option: string, index: number) => (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio />}
                label={option}
              />
            )
          )}
        </RadioGroup>
      </FormControl>
      <Box mt={2} display="flex" justifyContent="flex-end">
        {currentQuestionIndex < surveyData.length - 1 ? (
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSurveySubmitAndNavigate}
          >
            Submit
          </Button>
        )}
      </Box>
    </Container>
  )
}

export default SurveyPage
