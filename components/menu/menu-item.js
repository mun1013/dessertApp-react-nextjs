import classes from './menu-item.module.css';
import Image from 'next/image';
import Link from 'next/link';
import MenuForm from "./menu-form";
import CartContext from '../../store/cart-context';
import { useContext } from 'react';

function MenuItem(props) {
  const cartCtx = useContext(CartContext);
  const { title, image, id, price } = props.menu;
  const itemPrice = price.toFixed(2);
  const type = props.category.toLowerCase();
  const linkPath = `/menu/${type}/${id}`;
  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: id,
      name: title,
      amount: amount,
      price: itemPrice
    });
  }
  
  return (
    <li className={classes.post} key={title}>
      <Link href={linkPath}>
        <a>
          <div className={classes.image}>
            <Image
              src={image}
              alt={title}
              width={300}
              height={200}
              layout='responsive'
            />
          </div>
        </a>
      </Link>
        <div className={classes.content}>
          <h3>{title.toUpperCase()}</h3>
          <h3>{`RM ${itemPrice}`}</h3>
          <MenuForm props={id} onAddCart={addToCartHandler}/>
        </div>
    </li>
  );
}

export default MenuItem;