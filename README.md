# Universal Zustand

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## What is this

this is an example of a zustand store that persists the store in a cookie which makes it accesible in the server.
you can update the store on the client using regular hooks and on the server (see `second.tsx`)

Store is first tranformed to JSON and then compressed using [lz-string](https://github.com/pieroxy/lz-string) to occupy less space because of cookies' size limit (4096 bytes)

in the index (`/`) page, you can toggle the theme and set a username and see both values.

in the second page (`/second`), theme will be changed in getServerSideProps to `dark` to show how updating the state on the server looks like and the page will show the current theme and current username.

## Warning

There's no access to cookies in getStaticProps so everypage that needs the persisted state must be using getServerSideProps.

This example should be used for state that is needed during pre-rendering but might be too large or too complex to handle it on your own and you would rather use a state management handle all that getting and settings.

if your state is still too large after compressing, you can use multiple cookies to set it.

if you don't need some states in pre-rendering but you would still like them to persist someplace, you can create another store and use localStorage as persistStorage.

see [Zustand's Persist Middleware](https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md) for more info.
