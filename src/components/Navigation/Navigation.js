import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../routes';
import styles from './Navigation.module.css';

const Navigation = () => (
  <ul className={styles.nav}>
    <li className={styles.item}>
      <NavLink exact to={routes.HOME_PAGE}>
        Home
      </NavLink>
    </li>
    <li className={styles.item}>
      <NavLink to={routes.MOVIES_PAGE}>Movies</NavLink>
    </li>
  </ul>
);

export default Navigation;
