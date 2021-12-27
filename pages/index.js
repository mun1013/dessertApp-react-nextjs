import Head from 'next/head'
import { Fragment } from 'react'
import MainPage from '../components/main-page/main-page'

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Froggie Dessert</title>
        <meta name="description" content="Welcome to Froggie Dessert!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <MainPage/>
      </main>
    </Fragment>
  )
}

export default HomePage;
