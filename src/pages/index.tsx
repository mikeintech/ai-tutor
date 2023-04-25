// index.tsx
import { createTheme } from "@material-ui/core/styles"
import dynamic from "next/dynamic"

const Home = dynamic(() => import("./components/home"), {
  ssr: false,
})

const theme = createTheme({})

export default function Index(): JSX.Element {
  return <Home />
}
