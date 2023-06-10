import type { AppProps } from 'next/app'
import Layout from '@/components/Layout/Layout';
import { NextPageWithLayout } from '@/types/NextPageWithLayout';
import "../styles/nullable.scss";
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { appWithTranslation } from "next-i18next";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <Layout>
        {getLayout(<Component {...pageProps} />)}
      </Layout>
    </Provider>
  )
}

export default appWithTranslation(App);
