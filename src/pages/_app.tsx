import { PersistedState } from '@/store/store'
import StoreProvider from '@/store/StoreProvider'
import type { AppProps } from 'next/app'

export default function App({
  Component,
  pageProps: { initialState, ...pageProps }
}: AppProps<{ initialState: PersistedState }>) {
  return (
    <StoreProvider {...initialState}>
      <Component {...pageProps} />
    </StoreProvider>
  )
}
