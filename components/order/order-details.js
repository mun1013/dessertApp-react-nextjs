import classes from './order-details.module.css';
import Card from '../UI/Card';
import { Fragment } from 'react';
import {v4 as uuid} from 'uuid';

function OrderDetails(props) {
  const { orderDetails, orderItems } = props;
  console.log('orderItems', orderItems);
  let totalAmount = `RM ${orderDetails[0].totalAmount.toFixed(2)}`;
  let grandTotal = `RM ${(orderDetails[0].totalAmount + 5).toFixed(2)}`;
  
  return (
    <Fragment>
      <header>
        <h1>ORDER DETAILS</h1>
      </header>
      <div className={classes.orderDetails}>
        <Card style={{ width: '70%', margin:'3rem auto' }}>
          <div className={classes.details}>
            <p><b>Order ID :</b> #{orderDetails[0].orderId}</p>
            <p><b>Order Date :</b> {orderDetails[0].date}</p>
            <p><b>Status :</b> {orderDetails[0].status}</p>
          </div>
          <hr/>
          {orderItems.map((item) => (
            <li className={classes['order-item']} key={uuid()}>
              <div className={classes.summary}>
                <span>{item.name}</span>
                <span className={classes.amount}>x {item.amount}</span>
              </div>
                <span className={classes.price}>RM {item.price}</span>
            </li>
            ))}
            <div className={classes.total}>
              <span>Total Amount</span>
              <span>{totalAmount}</span>  
            </div>
            <div className={classes.shipping}>
              <span>Shipping Fees</span>
              <span>RM 5.00</span>  
            </div>
            <div className={classes['grand-total']}>
              <span>Grand Total</span>
              <span>{grandTotal}</span>  
            </div>
          </Card>
      </div>
    </Fragment>
  );
}

export default OrderDetails;