import { useState, useContext } from "react"
import Head from "next/head"
import { Box, Button, TextField, makeStyles } from "@material-ui/core"
import { useRouter } from "next/router"
import { SurveyContext } from "../context/SurveyContextProvider"

const useStyles = makeStyles(() => ({
  inputBox: {
    minWidth: 350,
  },
  formContainer: {
    display: "flex",
    flexWrap: "wrap",
  },
}))

export default function Home(): JSX.Element {
  const [topic, setTopic] = useState<string>("")
  const { getSurvey } = useContext(SurveyContext)
  const router = useRouter()
  const classes = useStyles()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await getSurvey(topic)
    router.push("/survey")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value)
  }

  return (
    <>
      <Head>
        <title>AI Tutor App</title>
      </Head>
      <form onSubmit={handleSubmit}>
        <Box className={classes.formContainer}>
          <TextField
            className={classes.inputBox}
            id="topic"
            name="topic"
            variant="outlined"
            label="Type a topic to learn it fast with AI"
            value={topic}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" type="submit">
            Start Learning
          </Button>
        </Box>
      </form>
    </>
  )
}
