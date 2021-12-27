import Head from 'next/head';
import { Fragment } from 'react';
import MenuDetail from '../../../components/menu/menu-detail';
import { getItemsIds, getSelectedItem } from "../../../lib/db";

function CookiesDetailPage(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.title}</title>
        <meta name='description' content={props.title} />
      </Head>
      <MenuDetail menu={props.menu[0]} category={props.category}/>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const { params } = context;

  const id = params.id;
  
  const selectedMenu = await getSelectedItem(id, 'cookies');

  return {
    props: {
      menu: selectedMenu.map(menu => ({
        id: menu.id,
        title: menu.title,
        image: menu.image,
        description: menu.description,
        price: menu.price
      })),
      category: 2
    },
    revalidate: 600
  };
}

export async function getStaticPaths() {
  const ids = await getItemsIds('cookies');

  return {
    paths: ids.map((id) => ({ params: {id: id.id.toString()} })),
    fallback: false,
  }
}

export default CookiesDetailPage;