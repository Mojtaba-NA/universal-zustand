import Cookies from 'js-cookie'
import { createContext, useContext } from 'react'
import { createStore, useStore as useZustandStore } from 'zustand'
import type { StateStorage } from 'zustand/middleware'
import { persist } from 'zustand/middleware'
import { createPersistStorage } from './createPersistStorage'

type ThemeMode = 'light' | 'dark'

export const storageName = 'universal-zustand'

export const initialState: PersistedState = {
  theme: 'light',
  username: undefined
}

export const initialStateJSON = JSON.stringify(initialState)

export const CookieStorage = {
  getItem: name => {
    return Cookies.get(name) ?? null
  },
  setItem: (name, value) => {
    Cookies.set(name, value, { sameSite: 'strict', expires: 1, path: '/' })
  },
  removeItem: name => {
    return Cookies.remove(name)
  }
} satisfies StateStorage

export interface PersistedState {
  theme: ThemeMode
  username: string | undefined
}

interface StoreInterface extends PersistedState {
  loading: boolean
  toggleLoading: () => void
  toggleTheme: () => void
  setTheme: (themeMode: ThemeMode) => void
  setUsername: (username: string) => void
}

export type Store = ReturnType<typeof initializeStore>

const zustandContext = createContext<Store | null>(null)

export const Provider = zustandContext.Provider

export const useStore = <T>(selector: (state: StoreInterface) => T) => {
  const store = useContext(zustandContext)

  if (!store) throw new Error('Store is missing the provider')

  return useZustandStore(store, selector)
}

export const initializeStore = (preloadedState: Partial<PersistedState>) => {
  return createStore<StoreInterface>()(
    persist(
      set => ({
        loading: false,
        ...initialState,
        ...preloadedState,
        toggleLoading: () =>
          set(state => ({
            ...state,
            loading: !state.loading
          })),
        toggleTheme: () =>
          set(state => ({
            ...state,
            theme: state.theme === 'light' ? 'dark' : 'light'
          })),
        setTheme: (theme: ThemeMode) =>
          set(state => ({
            ...state,
            theme
          })),
        setUsername: username => set(state => ({ ...state, username }))
      }),
      {
        name: storageName,
        storage: createPersistStorage(() => CookieStorage),
        partialize: state => ({ username: state.username, theme: state.theme })
      }
    )
  )
}
