import React, { useContext } from "react"
import { CircularProgress, Backdrop } from "@material-ui/core"
import { LoadingContext } from "../context/LoadingContextProvider"

const PageLoader = () => {
  const { isLoading } = useContext(LoadingContext)
  return (
    <Backdrop style={{ pointerEvents: "all", zIndex: 10000 }} open={isLoading}>
      <CircularProgress color="primary" />
    </Backdrop>
  )
}

export default PageLoader
