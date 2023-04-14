import { Inter } from 'next/font/google'
import Header from "@/components/Header";
import Head from 'next/head';
import Subscription from '@/components/Subscription/Subscription';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head></Head>
      <Header />
      <Subscription />
    </>
  );
}
