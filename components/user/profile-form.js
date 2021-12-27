import classes from './login-form.module.css';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Notification from '../UI/notification';
import { useRouter } from 'next/router';

async function editProfile(info) {
  const response = await fetch('/api/user/edit-profile', {
    method: 'PATCH',
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

function ProfileForm() {
  // const router = useRouter();
  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();
  const [formDisable, setFormDisable] = useState(true);
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await fetch('/api/user/edit-profile');

      const data = await response.json();

      if(!response.ok) {
        throw new Error(data.message || 'Something went wrong!')
      }

      firstNameInputRef.current.value = data.firstName;
      lastNameInputRef.current.value = data.lastName;
      emailInputRef.current.value = data.email;
      
    };

    fetchUserProfile().catch(error => {
      setRequestError(error.message);
      setRequestStatus('error');
    });

    if (requestStatus == 'success') {
      setFormDisable(state => {
        return setFormDisable(!state);
      })
    }
    
    if (requestStatus == 'success' || requestStatus == 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }

  }, [requestStatus]);

  function onEditHandler(event) {
    event.preventDefault();

    setFormDisable(state => {
      return setFormDisable(!state);
    })
  }

  async function onSubmitHandler(event) {
    event.preventDefault();

    const firstName = firstNameInputRef.current.value;
    const lastName = lastNameInputRef.current.value;
    const email = emailInputRef.current.value;

    const data = {firstName, lastName, email};

    try {
      await editProfile(data);
      setRequestStatus('success');
    }
    catch(error) {
      setRequestError(error.message);
      setRequestStatus('error');
    }
  }

  const actions = `${classes.actions} ${classes['actions-profile']}`;

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
      message: 'Edit Profile Successfully!',
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
    <h1>Profile</h1>
    <hr/>
    <form>
      <div className={classes.control}>
        <label htmlFor='name'>First Name</label>
        <input type='text' id='firstName' disabled={formDisable} required ref={firstNameInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='name'>Last Name</label>
        <input type='text' id='lastName' disabled={formDisable} required ref={lastNameInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' disabled={formDisable} required ref={emailInputRef} />
      </div> 
      <div className={actions}>
        <button onClick={formDisable ? onEditHandler : onSubmitHandler} className={classes.edit}>{formDisable ? 'Edit' : 'Save Changes'}</button>
        <Link href="/change-password"><button>Change Password</button></Link>
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

export default ProfileForm;