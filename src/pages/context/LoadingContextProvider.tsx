import React, { createContext, useState } from "react"

interface LoadingContextValue {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

export const LoadingContext = createContext<LoadingContextValue>({
  isLoading: false,
  setIsLoading: () => {},
})

export const LoadingContextProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)

  const value = {
    isLoading,
    setIsLoading,
  }

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  )
}
