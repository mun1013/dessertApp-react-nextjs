import Head from 'next/head';
import { Fragment } from 'react';
import MenuDetail from '../../../components/menu/menu-detail';
import { getItemsIds, getSelectedItem } from "../../../lib/db";

function CakesDetailPage(props) {
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
    
  const selectedMenu = await getSelectedItem(id, 'cakes');

  return {
    props: {
      menu: selectedMenu.map(menu => ({
        id: menu.id,
        title: menu.title,
        image: menu.image,
        description: menu.description,
        price: menu.price
      })),
      category: 1
    },
    revalidate: 600
  };
}

export async function getStaticPaths() {
  const ids = await getItemsIds('cakes');

  return {
    paths: ids.map(id => ({ params: {id: id.id.toString()} })),
    fallback: false,
  }
}

export default CakesDetailPage;