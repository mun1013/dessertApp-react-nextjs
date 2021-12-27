import classes from './order.module.css';
import Card from '../UI/Card';
import { Fragment } from 'react';
import Link from 'next/link';
import {v4 as uuid} from 'uuid';

function Order(props) {
  const { orders } = props;
  const hasOrders = orders.length > 0;

  const emptyOrders = (
    <div><p className={classes['no-item']}>No orders!</p></div>
  );  

  const withOrders = (
    orders.map(type => {
      const totalAmount = `RM ${type.totalAmount.toFixed(2)}`;
      let linkPath = `/order/${type.id}`;
      return <Card style={{ width: '70%', margin:'1rem auto' }} key={uuid()}>
        <Link href={linkPath}>
          <a>
            <div className={classes.order}>
              <div>
                <h2>Order ID: #{type.orderId}</h2>
                <div className={classes.orderDetails}>
                  <span>Date: {type.date}</span>
                  <span>Total Amount: {totalAmount}</span>
                </div>
              </div>
              <div className={classes.status}>
                <h3>{type.status}</h3>
              </div>
            </div>
          </a>
        </Link>
      </Card>
    })
  );

  return (
    <Fragment>
      <header>
        <h1>ORDERS</h1>
      </header>
      <div className={classes['order-page']}>
        {!hasOrders? emptyOrders : withOrders}
      </div>
    </Fragment>
  )
}

export default Order;
