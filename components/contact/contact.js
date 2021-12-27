import { Fragment, useEffect, useState } from "react";
import ContactForm from "./contact-form";
import classes from './contact.module.css';
import Notification from '../UI/notification';

async function sendFeedbackData(contactDetails) {
  const response = await fetch('/api/feedback', {
    method: 'POST',
    body: JSON.stringify(contactDetails),
    headers: {
      'Content-Type': 'application/json',
    }
  })

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

} 

function Contact() {
  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    if (requestStatus == 'success' || requestStatus == 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function sendFeedbackHandler(data) {
    const { enteredName, enteredEmail, enteredSubject, enteredMessage } = data;

    setRequestStatus('pending');

    try {
      await sendFeedbackData({
        email: enteredEmail,
        name: enteredName,
        subject: enteredSubject,
        message: enteredMessage,
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
      title: 'Sending message...',
      message: 'Your message is on its way!',
    };
  }

  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Message sent successfully!',
    };
  }

  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error!',
      message: requestError,
    };
  }

  return (
    <Fragment>
    <header>
      <h1>CONTACT</h1>
    </header>
    <div className={classes.contact}>
      <h2>Contact Us:</h2>
      <p>Drop us a message or place the order on the website!</p>
      <p>Do not hesitate to contact us for any enquiry.</p>
      <p>Phone Number: 016-288XXXX</p>
      <p>Email Address: mun2happy@gmail.com</p>
      <h2>Operation Hours:</h2>
      <p>Deliver every Friday and Saturday. Currently we are accepting cashless payment only, we apologize for any incovenience.</p>
      <p>Payment type: TNG | BOOST | ONLINE BANKING </p>
    </div>
    <div className={classes.contactForm}>
      <h2>Have a question?</h2>
      <h3>We would like to hear your feedback or would you like to see us improve on something? Tell us and we believe the only way to give you best experience is to hear what do you think.</h3>
      <ContactForm onSendFeedback={sendFeedbackHandler}/>
    </div>
    {notification && (
      <Notification
        status={notification.status}
        title={notification.title}
        message={notification.message}
      />
    )}
  </Fragment>
  );
}

export default Contact;