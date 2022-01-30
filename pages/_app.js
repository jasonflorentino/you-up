import { ChakraProvider } from '@chakra-ui/react'

import { AppWrapper } from '../appState/AppContext'
import theme from '../lib/theme';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AppWrapper>
  )
}

export default MyApp
