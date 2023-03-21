import getInitialState from '@/store/getInitialState'
import { useStore } from '@/store/store'
import type { GetServerSideProps } from 'next'
import Link from 'next/link'
import { FormEventHandler } from 'react'

export default function Home() {
  const theme = useStore(state => state.theme)
  const username = useStore(state => state.username)

  const toggleTheme = useStore(state => state.toggleTheme)

  const setUsername = useStore(state => state.setUsername)

  const submitHandler: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault()

    const username = new FormData(event.currentTarget).get('username')?.toString()

    setUsername(username?.length ? username : 'default username')

    event.currentTarget.reset()
  }

  return (
    <>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <hr />
      <form onSubmit={submitHandler}>
        <input type='text' name='username' placeholder='your username' />
        <button type='submit'>Set Username</button>
      </form>

      <p>Current Theme: {theme}</p>
      <p>Current Username: {username}</p>

      <Link href='/second'>Second Page</Link>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const initialState = getInitialState(req.headers)

  return {
    props: { initialState }
  }
}
