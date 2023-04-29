import type { AppProps } from 'next/app'
import Layout from '@/components/Layout/Layout';
import { NextPageWithLayout } from '@/types/NextPageWithLayout';
import "../styles/nullable.scss";
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <Provider store={store}>
      <Layout>
        {getLayout(<Component {...pageProps} />)}
      </Layout>
    </Provider>
  )
}
