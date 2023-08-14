import React from "react";
import classes from './Navbar.module.css';
import logo from '../../Store/Neurologo.png';


const Navbar = () => {


  return (
    <React.Fragment>
      <nav className={classes.navbar}>
        <div className={classes["navbar-left"]}>
          <div ><img className={classes.logo} src={logo} alt="Logo" /></div>
          <div><h1>NEUROMANCERS</h1></div>
        </div>
        <div className={classes["navbar-right"]}>
          <ul className={classes['nav-links']}>
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Contact</li>
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};
export default Navbar;