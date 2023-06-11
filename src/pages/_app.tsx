import type { AppProps } from 'next/app'
import Layout from '@/components/Layout/Layout';
import { NextPageWithLayout } from '@/types/NextPageWithLayout';
import "../styles/nullable.scss";
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { appWithTranslation } from "next-i18next";
import { TypeComponentAuthFields } from '@/types/AdminPageType';

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
