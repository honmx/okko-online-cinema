import { Inter } from 'next/font/google'
import Header from "@/components/Header/Header";
import Head from 'next/head';
import Subscription from '@/components/Subscription/Subscription';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
<<<<<<< HEAD
      <Head></Head>
      <Header />
      <Subscription />
=======
      <Head>
        <title>Главная</title>
        <meta
          name="description"
          content="Смотреть фильмы онлайн в хорошем качестве"
        />
      </Head>
      {/* optimum subscription */}
      {/* ... */}
>>>>>>> 64d2f40f0c42cece9801d6c51ebdaba1ab4a227a
    </>
  );
}
