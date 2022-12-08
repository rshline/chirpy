import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default withUrqlClient(createUrqlClient)(MyApp)
