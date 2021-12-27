import { Fragment } from "react";
import classes from './order-summary.module.css';
import {v4 as uuid} from 'uuid';

function OrderSummary(props) {
  const { cart } = props;
  const totalAmount = `RM ${cart.totalAmount.toFixed(2)}`;

  return (
    <div className={classes.orderSummary}>
      <h2>Order Summary</h2>
      <ul className={classes['cart-items']}>
          {cart.items.map((item) => (
            <li className={classes['cart-item']} key={uuid()}>
              <div className={classes.summary}>
                <span>{item.name}</span>
                <span className={classes.amount}>x {item.amount}</span>
              </div>
                <span className={classes.price}>RM {item.price}</span>
            </li>

          ))}
      </ul>

      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>  
      </div>
    </div>
  );
}

export default OrderSummary;