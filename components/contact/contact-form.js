import classes from './contact-form.module.css';
import { useState } from "react";
import Button from '../UI/button';

function ContactForm(props) {
  const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredSubject, setEnteredSubject] = useState('');
  const [enteredMessage, setEnteredMessage] = useState('');

  async function onSubmit(event) {
    event.preventDefault();

    let data = {enteredName, enteredEmail, enteredSubject, enteredMessage};
    props.onSendFeedback(data);
  }

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <div className={classes.formControl}>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' required value={enteredName} onChange={(event) => setEnteredName(event.target.value)}/>
      </div>
      <div className={classes.formControl}>
        <label htmlFor='email'>Email Address</label>
        <input type='text' id='email' required value={enteredEmail} onChange={(event) => setEnteredEmail(event.target.value)}/>
      </div>
      <div className={classes.formControl}>
        <label htmlFor='subject'>Subject</label>
        <input type='text' id='subject' required value={enteredSubject} onChange={(event) => setEnteredSubject(event.target.value)}/>
      </div>
      <div className={classes.formControl}>
        <label htmlFor='message'>Message</label>
        <textarea rows="10" cols="70" required value={enteredMessage} onChange={(event) => setEnteredMessage(event.target.value)}/>
      </div>
      <div className={classes.actions}>
        <button className={classes.submit}>Submit</button>
      </div>
    </form>
  );
}

export default ContactForm;