import type { PersistedState } from './store'
import { initializeStore, Provider } from './store'

type StoreProviderProps = React.PropsWithChildren<PersistedState>

const StoreProvider = ({ children, ...props }: StoreProviderProps) => {
  return <Provider value={initializeStore(props)}>{children}</Provider>
}

export default StoreProvider
