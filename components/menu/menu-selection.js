import { Fragment } from "react";
import classes from './menu-selection.module.css';
import Image from 'next/image';
import Link from 'next/link';
import {v4 as uuid} from 'uuid';

function MenuSelection(props) {
  const { menus } = props;

  return (
    <Fragment>
      <header>
        <h1>MENU</h1>
      </header>
      <section className={classes.selection}>
        <ul className={classes.grid}>
          {menus.map(type => {
            let linkPath = `/menu/${type.title}`;
            return <li className={classes.post} key={uuid()}>
              <Link href={linkPath}>
                <a>
                  <div className={classes.image}>
                    <Image
                      src={type.image}
                      alt={type.title}
                      width={300}
                      height={200}
                      layout='responsive'
                    />
                  </div>
                  <div className={classes.content}>
                    <h3>{type.title.toUpperCase()}</h3>
                  </div>
                </a>
              </Link>
            </li>
          })}
        </ul>
      </section>
    </Fragment>
  );
}

export default MenuSelection;