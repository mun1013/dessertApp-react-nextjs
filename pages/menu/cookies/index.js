import { Fragment } from "react";
import Menu from "../../../components/menu/menu";
import Head from 'next/head';
import { getItems } from "../../../lib/db";

function CookiesPage(props) {
  return (
    <Fragment>
      <Head>
        <title>Cookies</title>
        <meta
          name="cookies"
          content="Menu for cookies"
        />
      </Head>
      <Menu menus={props.menus} category='COOKIES'/>
    </Fragment>
  );
};

export async function getStaticProps() {
  const menus = await getItems('cookies');

  return {
    props: {
      menus: menus.map(menu => ({
        id: menu.id,
        title: menu.title,
        image: menu.image,
        price: menu.price
      }))
    }
  }
};

export default CookiesPage;