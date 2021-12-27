import { Fragment } from "react";
import classes from './menu.module.css';
import MenuItem from "./menu-item";
import {v4 as uuid} from 'uuid';

function Menu(props) {
  const { menus, category } = props;

  return (
    <Fragment>
      <header>
        <h1>{category}</h1>
      </header>
      <div className={classes.selection}>
        <ul className={classes.grid}>
          {menus.map(menu => 
            <MenuItem key={uuid()} menu={menu} category={category}/>
          )}
        </ul>
      </div>
    </Fragment>
  );
}

export default Menu;