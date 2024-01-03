'use client'
import 'bootstrap/dist/css/bootstrap.css';
import "@fortawesome/fontawesome-svg-core/styles.css";
import './styles/globals.css';
import { TweetProvider } from './context/TweetContext';
import { UserProvider } from './context/userLog';
import Navbar from '@/components/navbar';
import Head from 'next/head';
import { useEffect } from 'react';
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export default function RootLayout({ children }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.js');
  }, []);
  return (
    <html lang="en">
      <Head>
        <title>Retweet</title>
      </Head>
      <body className='body'>
        <UserProvider>
          <TweetProvider>
            <Navbar />
            {children}
          </TweetProvider>
        </UserProvider>
      </body>
    </html>
  )
}
