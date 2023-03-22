import getInitialState from '@/store/getInitialState'
import { storageName, useStore } from '@/store/store'
import { compress } from 'lz-string'
import type { GetServerSideProps } from 'next'
import Link from 'next/link'
import Cookie from 'cookie'

export default function SecondPage() {
  const theme = useStore(state => state.theme)
  const username = useStore(state => state.username)

  return (
    <>
      <p>Current Theme: {theme}</p>
      <p>Current Username: {username}</p>

      <Link href='/'>First Page</Link>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const newState = getInitialState(req.headers, {
    theme: 'dark'
  })

  const serialized = Cookie.serialize(storageName, compress(JSON.stringify(newState)), {
    path: '/',
    sameSite: 'strict'
  })

  res.setHeader('set-cookie', serialized)

  return {
    props: { initialState: newState }
  }
}
