import { Inter } from 'next/font/google'
import Header from "@/components/Header/Header";
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <>
            <Head>
                <title>Главная</title>
                <meta
                    name="description"
                    content="Смотреть фильмы онлайн в хорошем качестве"
                />
            </Head>
            {/* optimum subscription */}
            {/* ... */}
        </>
    )
}
