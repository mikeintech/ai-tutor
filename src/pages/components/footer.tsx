// components/Footer.tsx
import React from "react"
import { Box, Typography } from "@material-ui/core"

const Footer: React.FC = () => {
  return (
    <Box mt={4} py={2} bgcolor="primary.main" color="white">
      <Typography variant="body1" align="center">
        AI Tutor App &copy; {new Date().getFullYear()}
      </Typography>
    </Box>
  )
}

export default Footer
