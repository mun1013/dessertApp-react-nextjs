import classes from './menu-detail.module.css';
import Image from 'next/image';
import { Fragment, useContext } from 'react';
import MenuForm from "./menu-form";
import CartContext from '../../store/cart-context';

function MenuDetail(props) {
  const cartCtx = useContext(CartContext);
  const { menu, category } = props;
  const type = category == 1 ? 'CAKES' : 'COOKIES';
  const price = menu.price;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: menu.id,
      name: menu.title,
      amount: amount,
      price: price
    });
  }

  return (
    <Fragment>
      <header>
        <h1>{type}</h1>
      </header>
      <div className={classes.menu}>
        <h2>{menu.title}</h2>
        <h2 className={classes.price}>{`RM ${price}`}</h2>
        <div className={classes.form}>
        <MenuForm props={menu.id} onAddCart={addToCartHandler}/>
        </div>
        <p>{menu.description}</p>
      </div>
      <div className={classes.image}>
        <Image
          src={menu.image}
          alt={menu.title}
          // width={500}
          // height={200}
          layout='fill'
        />
      </div>
    </Fragment>
  );
}

export default MenuDetail;