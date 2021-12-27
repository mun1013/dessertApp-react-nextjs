import { Fragment } from "react";
import Head from 'next/head';
import MenuSelection from "../../components/menu/menu-selection";
import { getItems } from "../../lib/db";

function MenuPage(props) {
  return (
    <Fragment>
      <Head>
        <title>Menu</title>
        <meta
          name="menu"
          content="Froggie Dessert Menu"
        />
      </Head>
      <MenuSelection menus={props.menus}/>
    </Fragment>
  );
}

export async function getStaticProps() {
  const menus = await getItems('menu-selections');

  return {
    props: {
      menus: menus.map(menu => ({
        id: menu._id.toString(),
        title: menu.title,
        image: menu.image
      }))
    }
  }
}

export default MenuPage;