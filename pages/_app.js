import { AppWrapper } from '../appState/AppContext'
import { Chakra } from '../lib/Chakra';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Chakra>
        <Component {...pageProps} />
      </Chakra>
    </AppWrapper>
  )
}

export default MyApp
