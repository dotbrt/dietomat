'use client'
import './globals.css'
import Navbar from './navbar';
// import { createStateContext } from 'react-use';

// const [useSharedData, SharedDataProvider] = createStateContext('');

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="cupcake">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;700;900&family=Space+Mono:ital,wght@0,400;1,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        {/* <SharedDataProvider> */}

        {children}
        {/* </SharedDataProvider> */}
      </body>
    </html>
  )
}
