import { Fragment } from "react";
import Checkout from "../../components/cart/checkout/checkout";
import Head from 'next/head';
import Order from '../../components/order/order';
import { getItems } from "../../lib/db";

function OrderPage(props) {
  return (
    <Fragment>
      <Head>
        <title>Order</title>
        <meta
          name="order"
          content="Order Page"
        />
      </Head>
      <Order orders={props.orders}/>
    </Fragment>
  );
}

export async function getStaticProps() {
  const orders = await getItems('orders');
  console.log('orders',orders)
  return {
    props: {
      orders: orders.map(order => ({
        id: order._id.toString(),
        orderId: order.orderId,
        date: order.date,
        totalAmount: order.totalAmount,
        status: order.status
      }))
    }
  }
};

export default OrderPage;