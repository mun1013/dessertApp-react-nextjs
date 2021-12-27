import Head from 'next/head';
import { Fragment, useContext } from 'react';
import Cart from '../../components/cart/cart';
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

function CartPage() {
  const cartCtx = useContext(CartContext);
  console.log('cartctx',cartCtx);
  
  return (
    <Fragment>
      <Head>
        <title>Cart</title>
        <meta name='cart' content='cart' />
      </Head>
      <Cart cart={cartCtx}/>
    </Fragment>
  );
}

export default CartPage;