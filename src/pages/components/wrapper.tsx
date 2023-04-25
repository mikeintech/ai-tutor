import { Box, makeStyles } from "@material-ui/core"

interface WrapperProps {
  children: React.ReactNode
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "99vh",
    overflow: "auto",
  },

  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    border: "1px solid #ddd",
    borderRadius: "16px",
    minWidth: 250,
    maxWidth: 1024,
  },
}))

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const classes = useStyles()

  return (
    <Box className={classes.container}>
      <Box className={classes.box}>{children}</Box>
    </Box>
  )
}

export default Wrapper
