// import '@/styles/globals.css'
import type { AppProps } from "next/app"
import dynamic from "next/dynamic"
import { ThemeProvider, createTheme, CssBaseline } from "@material-ui/core"
import Wrapper from "./components/wrapper"
import PageLoader from "./components/pageLoader"
import Providers from "./context/providers"

const theme = createTheme()

const Header = dynamic(() => import("./components/header"), {
  ssr: false,
})

const Footer = dynamic(() => import("./components/footer"), {
  ssr: false,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Wrapper>
          <PageLoader />
          <Component {...pageProps} />
        </Wrapper>
        <Footer />
      </ThemeProvider>
    </Providers>
  )
}
