import classes from './login-form.module.css';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Notification from '../UI/notification';

async function changePassword(info) {
  const response = await fetch('/api/user/change-password', {
    method: 'PATCH',
      body: JSON.stringify(info),
      headers: {
        'Content-Type': 'application/json'
      }
  });

  const data = await response.json();

  if(!response.ok) {
    throw new Error(data.message || 'Something went wrong!')
  }

  return data;
}

function ChangePasswordForm() {
  const router = useRouter();
  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  
  useEffect(() => {
    if (requestStatus == 'success' || requestStatus == 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
        requestStatus == 'success' && router.push('/profile');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function onChangePassword(event) {
    event.preventDefault();

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

    const data = {enteredNewPassword, enteredOldPassword};

    try {
      await changePassword(data);
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
      message: 'Successfully changed password!',
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
    <h1>Change Password</h1>
    <hr/>
    <form>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' ref={oldPasswordRef}/>
      </div>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordRef}/>
      </div>
      <div className={classes.actions}><button onClick={onChangePassword}>Save</button></div>
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

export default ChangePasswordForm;