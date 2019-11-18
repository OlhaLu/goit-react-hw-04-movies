import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../routes';

const Navigation = () => (
    <ul>
    <li>
      <NavLink exact to={routes.HOME_PAGE}>
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to={routes.MOVIES_PAGE}>Movies</NavLink>
    </li>
  </ul>
  );
  
  export default Navigation;