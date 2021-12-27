import classes from './contact-summary.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import Button from '../UI/button';

function ContactSummary() {

  let whatsAppLink = <a target="_blank" href="https://wa.link/ibwzi5" rel="noopener noreferrer"><u>WhatsApp</u></a>;
  
  return (
    <Fragment>
      <div className={classes.image}>
        <Image
          src='/images/contact-summary.png'
          alt="contact"
          width={500}
          height={400}
        />
      </div>
      <div className={classes.contactSummary}>
        <h2>Contact Us</h2>
        <p>Drop us a message in&nbsp;{whatsAppLink}&nbsp;or place the order on the website!</p>
        <p>Please allow us 48 hours advanced notice for any orders as all the goods are freshly baked from the oven.</p>
        <p>Feel free to drop us an email if you have any question or suggestion.</p>
        <Link href="/contact"><a><Button className={classes.btn} type="button">More...</Button></a></Link>
      </div>
    </Fragment>
  );
}

export default ContactSummary;