import Head from 'next/head';
import Layout from '../components/layout/layout';
import '../styles/globals.css'
import CartProvider from '../store/CartProvider';

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Layout>
        <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1'></meta>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}

export default MyApp
