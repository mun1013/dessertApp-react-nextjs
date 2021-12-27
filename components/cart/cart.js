import classes from './cart.module.css';
import { Fragment, useContext } from 'react';
import CartItem from './cart-item';
import Button from '../UI/button';
import Link from 'next/link';
import CartContext from '../../store/cart-context';
import {v4 as uuid} from 'uuid';

function Cart(props) {
  const { cart } = props;
  const totalAmount = `RM ${cart.totalAmount.toFixed(2)}`;
  const hasItems = cart.items.length > 0;
  const cartCtx = useContext(CartContext);
  
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount: 1});
  }

  const cartWithoutItems = (
    // <div>
      <div className={classes['no-item']}><p>Nothing in your cart!</p></div>
    // </div>
  );  

  const cartWithItems = (
    <div className={classes.cart}>
      <ul className={classes['cart-items']}>
        {cart.items.map((item) => (
          <CartItem
            key={uuid()}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />  
        ))}
      </ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>  
      </div>
      <div className={classes.actions}>
        <Link href="/checkout"><a><Button className={classes.btn} type="button">Checkout</Button></a></Link>
      </div>
    </div>
  );

  return (
    <Fragment>
      <header>
        <h1>CART</h1>
      </header>
      {!hasItems? cartWithoutItems : cartWithItems}
    </Fragment>
  );
}

export default Cart;