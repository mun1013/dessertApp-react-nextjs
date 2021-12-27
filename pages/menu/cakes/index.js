import { Fragment } from "react";
import Menu from "../../../components/menu/menu";
import Head from 'next/head';
import { getItems } from "../../../lib/db";

function CakePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Cakes</title>
        <meta
          name="cakes"
          content="Menu for cakes"
        />
      </Head>
      <Menu menus={props.menus} category='CAKES'/>
    </Fragment>
  );
};

export async function getStaticProps() {
  const menus = await getItems('cakes');

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

export default CakePage;