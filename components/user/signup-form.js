import classes from './login-form.module.css';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Notification from '../UI/notification';
import { useRouter } from 'next/router';

async function createUser(info) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      'Content-Type': 'application/json',
    }
  })

  const data = await response.json();

  if(!response.ok) {
    throw new Error(data.message || 'Something went wrong!')
  }

  return data;
}

function SignupForm() {
  const router = useRouter();
  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
 
  useEffect(() => {
    if (requestStatus == 'success' || requestStatus == 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
        requestStatus == 'success' && router.push('/login');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function onSubmitHandler(event) {
    event.preventDefault();

    const firstName = firstNameInputRef.current.value;
    const lastName = lastNameInputRef.current.value;
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const confirmPassword = confirmPasswordInputRef.current.value;

    const data = {firstName, lastName, email, password, confirmPassword};

    try {
      await createUser(data);
      setRequestStatus('success');
    }
    catch(error) {
      setRequestError(error.message);
      setRequestStatus('error');
    }
  }

  let notification;

  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Registering...',
      message: 'Submitting information...',
    };
  }

  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Registration Success!',
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
      <h1>Sign Up</h1>
      <hr/>
      <form onSubmit={onSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor='name'>First Name</label>
          <input type='text' id='firstName' required ref={firstNameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='name'>Last Name</label>
          <input type='text' id='lastName' required ref={lastNameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' required ref={passwordInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Confirm Password</label>
          <input type='password' id='confirmPassword' required ref={confirmPasswordInputRef}/>
        </div>
        <div className={classes.actions}>
          <button>Sign Up</button>
          <Link href="/login"><button
            type='button'
            className={classes.toggle}
          >
            Already a member? Login
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

export default SignupForm;