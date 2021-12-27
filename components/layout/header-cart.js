import classes from './header-cart.module.css';
import CartContext from '../../store/cart-context';
import { useContext, useEffect, useState } from 'react';

function HeaderCart() {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;

  const numberOfCartItems = cartCtx.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount
  }, 0);
  const btnClasses = `${classes.cart} ${btnIsHighlighted ? classes.bump : ''}`;
  
  useEffect(() => {
    if (items.length == 0)
      return;

    setBtnIsHighlighted(true);
    
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    }
  }, [items]);

  return (
    <div className={btnClasses}>Cart <div className={classes.amount}>{numberOfCartItems}</div></div>
  );
}

export default HeaderCart;