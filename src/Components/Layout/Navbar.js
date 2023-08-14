import React from "react";
import classes from './Navbar.module.css'
const Navbar = () => {


  return (
    <React.Fragment>
      <nav className={classes.navbar}>
        <div className={classes.logo}>Logo</div>
        <ul className={classes['nav-links']}>
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Contact</li>
        </ul>
      </nav>
    </React.Fragment>
  );
};
export default Navbar;