import { useState } from "react"
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

export interface SurveyQuestion {
  question: string
  options: string[]
}

interface SurveyProps {
  questions: SurveyQuestion[]
  handleSurveySubmit: (surveyResults: string[]) => void
}

export const Survey: React.FC<SurveyProps> = ({
  questions,
  handleSurveySubmit,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState("")
  const [surveyResults, setSurveyResults] = useState<string[]>([])

  const currentQuestion = questions[currentQuestionIndex]

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value)
  }

  const handleNext = () => {
    // Handle saving the selected option somewhere
    setSurveyResults([...surveyResults, selectedOption])
    setSelectedOption("")
    setCurrentQuestionIndex(currentQuestionIndex + 1)
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
          {currentQuestion.options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Box mt={2} display="flex" justifyContent="flex-end">
        {currentQuestionIndex < questions.length - 1 ? (
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSurveySubmit(surveyResults)}
          >
            Submit
          </Button>
        )}
      </Box>
    </Container>
  )
}

// Example usage
const questions: SurveyQuestion[] = [
  {
    question: "What is your experience level with cooking steak?",
    options: ["Beginner", "Intermediate", "Advanced"],
  },
  {
    question: "What type of steak are you interested in learning about?",
    options: ["Ribeye", "Tenderloin", "Sirloin", "Flank"],
  },
  {
    question: "What cooking method are you interested in learning about?",
    options: ["Grilling", "Pan-Searing", "Broiling", "Braising"],
  },
  {
    question: "What type of cooking equipment do you have available?",
    options: ["Grill", "Stove and Pan", "Oven", "Smoker"],
  },
]

// export const DefaultSurvey = () => <Survey questions={questions}  />
