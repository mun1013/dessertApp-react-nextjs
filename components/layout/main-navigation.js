import Link from 'next/link';
import classes from './main-navigation.module.css';
import Logo from './logo';
import HeaderCart from './header-cart';
import { useSession, signOut } from 'next-auth/client';
import Button from '../UI/button';
import router from 'next/router';

function MainNavigation() {
  const [session, loading] = useSession();
  console.log('session',session);
  
  function logoutHandler() {
    signOut({ callbackUrl: '/' });
  }

  return (
    <header className={classes.header}>
      <Link href="/"><a><Logo/></a></Link>
      <nav>
        <ul>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/menu">Menu</Link></li>
          <li><Link href="/order">Orders</Link></li>
          <li><Link href="/cart"><a><HeaderCart/></a></Link></li>
          {!session && !loading && (
            <li><Link href="/login"><a>Login</a></Link></li>
          )}
          {session && (
            <li>
              <Link href='/profile'>Profile</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;