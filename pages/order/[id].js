import Head from 'next/head';
import { Fragment } from 'react';
import OrderDetails from '../../components/order/order-details';
import { getOrdersIds, getSelectedOrder } from '../../lib/db';

function OrderDetailsPage(props) {
  console.log('props.orderItems',props.orderItems)
  return (
    <Fragment>
      <Head>
        <title>Order Details</title>
        <meta name='description' content='Order Details' />
      </Head>
      <OrderDetails orderDetails={props.orderDetails} orderItems={props.orderItems}/>
    </Fragment>
  );
};

export async function getStaticProps(context) {
  const { params } = context;
  const id = params.id;
  const selectedOrder = await getSelectedOrder(id, 'orders');
  let orders = selectedOrder.map(o => { return o.orders })[0]
  
  return {
    props: {
      id: id,
      orderDetails: selectedOrder.map(order => ({
        id: order._id.toString(),
        orderId: order.orderId,
        date: order.date,
        totalAmount: order.totalAmount,
        status: order.status
      })),
      orderItems: orders.map(order => ({
        id: order.id,
        name: order.name,
        amount: order.amount,
        price: order.price
      }))
    },
    revalidate: 600
  };
}

export async function getStaticPaths() {
  const ids = await getOrdersIds('orders');

  // return {
  //   paths: [
  //     {params: {id: '1001'}},
  //     {params: {id: '1002'}},
  //   ],
  //   fallback: false,
  // }
  return {
    paths: ids.map(id => ({ params: {id: id._id.toString()} })),
    fallback: false,
  }
}

export default OrderDetailsPage;