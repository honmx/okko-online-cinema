import type { AppProps } from 'next/app'
import Layout from '@/components/Layout/Layout';
import { NextPageWithLayout } from '@/types/NextPageWithLayout';
import "../styles/nullable.scss";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <Layout>
      {getLayout(<Component {...pageProps} />)}
    </Layout>
  )
}
