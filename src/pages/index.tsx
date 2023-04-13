import { Inter } from 'next/font/google'
import Header from "@/components/Header/Header";
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        
      </Head>
      <Header />
    </>
  )
}
