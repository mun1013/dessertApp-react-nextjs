import classes from './logo.module.css';
import { GiFrogPrince } from 'react-icons/gi';

function Logo() {
  return <div className={classes.logo}>Froggie Dessert <GiFrogPrince/></div>;
}

export default Logo;