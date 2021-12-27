import classes from './about-summary.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import Button from '../UI/button';

function AboutSummary() {
  return (
    <Fragment>
      <div className={classes.aboutSummary}>
        <h2>About Froggie</h2>
        <p>Being a full time employee for about 6 years and long hours of working could be really stressful and unhealthy! Froggie bakes some desserts to ease stress and then addicted to baking! It is normal that we all crave for desserts when we are stressed! With all the premium and finest ingredients, our products here definitely suit your taste. There are also low sugar desserts that is definitey won't destroy your diet! Stay healthy and enjoy our desserts!</p>
        <Link href="/about"><a><Button className={classes.btn} type="button">More...</Button></a></Link>
      </div>
      <div className={classes.image}>
        <Image
          src='/images/frognchick.png'
          alt="dessert"
          width={500}
          height={400}
        />
      </div>
    </Fragment>
  );
}

export default AboutSummary;