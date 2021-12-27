import classes from './menu-form.module.css';
import { useState } from "react";


function MenuForm(props) {
  const [inputAmount, setInputAmount] = useState(0);

  const submitHandler = (event) =>{
    event.preventDefault();

    props.onAddCart(inputAmount);
  }

  const onChangeInputHandler = (event) => {
    setInputAmount(parseInt(event.target.value));
  }

  const onIncrement = () => {
    if (inputAmount < 20) {
      setInputAmount(prevValue => { return prevValue + 1 });
    }
  }

  const onDecrement = () => {    
    if (inputAmount > 0) {
      setInputAmount( prevValue => { return prevValue - 1 })
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.valueButton} value="Decrease Value" id={props.id} onClick={onDecrement}>-</div>
      <input className={classes.number} type="number" key={props.id} value={inputAmount} onChange={(event) => onChangeInputHandler(event)}/>
      <div className={classes.valueButton} value="Increase Value" id={props.id} onClick={onIncrement}>+</div>
      <div><button className={classes.button}>ADD TO CART</button></div>
    </form>
  );
};

export default MenuForm;