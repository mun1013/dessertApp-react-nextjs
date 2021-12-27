import { Fragment } from "react";
import Head from 'next/head';
import About from "../../components/about/about";

function AboutPage() {
  return (
    <Fragment>
      <Head>
        <title>About</title>
        <meta
          name="about"
          content="About Froggie Dessert"
        />
      </Head>
      <About/>
    </Fragment>
  );
}

export default AboutPage;