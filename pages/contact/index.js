import { Fragment } from "react";
import Head from 'next/head';
import Contact from "../../components/contact/contact";

function ContactPage() {
  return (
    <Fragment>
      <Head>
        <title>Contact</title>
        <meta
          name="contact"
          content="Froggie Dessert Contact"
        />
      </Head>
      <Contact/>
    </Fragment>
  );
}

export default ContactPage;