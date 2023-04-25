// components/Header.tsx
import React from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
} from "@material-ui/core"
import { Menu as MenuIcon } from "@material-ui/icons"

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          AI Tutor App
        </Typography>
        <Box display="flex" alignItems="center">
          <Avatar />
          <Typography variant="subtitle1" style={{ marginLeft: 8 }}>
            John Doe
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
