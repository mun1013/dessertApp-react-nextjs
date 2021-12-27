import { useRef, useState, useContext, useEffect } from 'react';
import classes from './delivery-information.module.css';
import CartContext from '../../../store/cart-context';
import Notification from '../../UI/notification';
import { useRouter } from 'next/router';

async function sendOrderDetails(orderDetails) {
  console.log(orderDetails)
  const response = await fetch('/api/order', {
    method: 'POST',
    body: JSON.stringify(orderDetails),
    headers: {
      'Content-Type': 'application/json',
    }
  })

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }
}

function DeliveryInformation() {
  const router = useRouter();
  const cartCtx = useContext(CartContext);
  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    phone: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const phoneInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  useEffect(() => {
    if (requestStatus == 'success' || requestStatus == 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
        cartCtx.clearCart();
        router.push('/');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function onSendOrder(event) {
    event.preventDefault();

    let date = new Date();
    let currentDate = date.getDate() + '-' + (parseInt(date.getMonth()) + 1) + '-' + date.getFullYear();

    setRequestStatus('pending');

    try {
      await sendOrderDetails({
        name: nameInputRef.current.value,
        phone: phoneInputRef.current.value,
        street: streetInputRef.current.value,
        postalCode: postalCodeInputRef.current.value,
        city: cityInputRef.current.value,
        status: 'Pending',
        totalAmount: cartCtx.totalAmount,
        date: currentDate,
        orders: cartCtx.items
      });
      setRequestStatus('success');
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus('error');
    }
  }

  let notification;

  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Loading...',
      message: 'Your order is on its way!',
    };
  }

  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Order successfully!',
    };
  }

  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error!',
      message: requestError,
    };
  }

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? '' : classes.invalid
  }`;
  const phoneControlClasses = `${classes.control} ${
    formInputsValidity.phone ? '' : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? '' : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? '' : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? '' : classes.invalid
  }`;

  return (
    <div className={classes.deliveryInfo}>
      <h2>Delivery Information</h2>
      <form className={classes.form} onSubmit={onSendOrder}>
        <div className={nameControlClasses}>
          <label htmlFor='name'>Full Name</label>
          <input type='text' id='name' required ref={nameInputRef} />
        </div>
        <div className={phoneControlClasses}>
          <label htmlFor='name'>Phone Number</label>
          <input type='text' id='phone' required ref={phoneInputRef} />
        </div>
        <div className={streetControlClasses}>
          <label htmlFor='street'>Address</label>
          <input type='text' id='street' required ref={streetInputRef} />
        </div>
        <div className={postalCodeControlClasses}>
          <label htmlFor='postal'>Postal Code</label>
          <input type='text' id='postal' required ref={postalCodeInputRef} />
        </div>
        <div className={cityControlClasses}>
          <label htmlFor='city'>City</label>
          <input type='text' id='city' required ref={cityInputRef} />
        </div>
        <div className={classes.actions}>
          <button className={classes.submit}>Order</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </div>
  );
}

export default DeliveryInformation;