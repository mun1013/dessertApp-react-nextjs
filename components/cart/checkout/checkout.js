import { Fragment } from 'react';
import classes from './checkout.module.css';
import DeliveryInformation from './delivery-information';
import OrderSummary from './order-summary';

function Checkout(props) {
  const { cart } = props;

  return (
    <Fragment>
      <header>
        <h1>CHECKOUT</h1>
      </header>
      <div>
        <OrderSummary cart={cart}/>
        <DeliveryInformation/>
      </div>
    </Fragment>
  );
}

export default Checkout;