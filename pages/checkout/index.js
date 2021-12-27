import { Fragment, useContext } from "react";
import Checkout from "../../components/cart/checkout/checkout";
import Head from 'next/head';
import CartContext from '../../store/cart-context';

// let cartDetail = {
//   totalAmount: 38,
//   items: [
//     {
//       id: 1,
//       name: 'Cheese Cake',
//       amount: 1,
//       price: 12
//     },
//     {
//       id: 2,
//       name: 'Chocolate Cheese Cake',
//       amount: 2,
//       price: 26
//     }
//   ]
// }

function CheckoutPage() {
  const cartCtx = useContext(CartContext);

  return (
    <Fragment>
      <Head>
        <title>Checkout</title>
        <meta
          name="checkout"
          content="Checkout for payment"
        />
      </Head>
      <Checkout cart={cartCtx}/>
    </Fragment>
  );
}

export default CheckoutPage;