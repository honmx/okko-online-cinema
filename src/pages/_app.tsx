import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { appWithTranslation } from "next-i18next";
import Layout from '@/components/Layout/Layout';
import { store } from '@/store/store';
import { NextPageWithLayout } from '@/types/NextPageWithLayout';
import { TypeComponentAuthFields } from '@/types/AdminPageType';
import "../styles/nullable.scss";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

type AppPropsWithLayoutAndProtectedPage = AppPropsWithLayout & TypeComponentAuthFields;

const App = ({ Component, pageProps }: AppPropsWithLayoutAndProtectedPage) => {

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <Layout isOnlyAdmin={Component.isOnlyAdmin}>
        {getLayout(<Component {...pageProps} />)}
      </Layout>
    </Provider>
  )
}

export default appWithTranslation(App);
