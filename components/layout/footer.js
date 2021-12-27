import Link from 'next/link';
import classes from './footer.module.css';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <footer className={classes.footer}>
      <nav>
        <ul>
          <li><a target="_blank" href="https://facebook.com/1013carmen"><FaFacebook/></a></li>
          <li><a target="_blank" href="https://instragram.com/kahmun1013"><FaInstagram/></a></li>
          <li><a target="_blank" href="https://twitter.com/carmenlim13"><FaTwitter/></a></li>
        </ul>
      </nav>
      <h5>Copyright @ Froggie 2021</h5>
    </footer>
  );
}

export default Footer;