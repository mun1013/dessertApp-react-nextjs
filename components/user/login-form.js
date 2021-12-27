import classes from './login-form.module.css';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';
import Notification from '../UI/notification';

function LoginForm() {
  const router = useRouter();
  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    if (requestStatus == 'success' || requestStatus == 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
        requestStatus == 'success' && router.push('/');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function onSubmitHandler(event) {
    event.preventDefault();

    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;


    await signIn('credentials', {
      redirect: false, email, password,
    }).then(res => {
      if (res.error == null) setRequestStatus('success');
      else {
        setRequestError(res.error);
        setRequestStatus('error');
      }
    });
  }

  let notification;

  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Signing In...',
      message: 'Submitting information...',
    };
  }

  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Sign in Successfully!',
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
    <section className={classes.login}>
      <h1>Login</h1>
      <hr/>
      <form onSubmit={onSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' required ref={passwordInputRef}/>
        </div>
        <div className={classes.actions}>
          <button>Login</button>
          <Link href="/signup"><button
            type='button'
            className={classes.toggle}
          >
            Create new account
          </button></Link>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}

export default LoginForm;