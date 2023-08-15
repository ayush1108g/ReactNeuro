import React, { useState, useContext } from "react";
import classes from './Navbar.module.css';
import logo from '../../Store/Neurologo.png';
import AuthContext from "../../Store/auth-Context";

const Navbar = () => {
  const ctx = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  console.log(ctx.isLoggedIn);
  return (
    <React.Fragment>
      <nav className={classes.navbar}>
        <div className={classes["navbar-left"]}>
          <div ><img className={classes.logo} src={logo} alt="Logo" /></div>
          <div><h1>NEUROMANCERS</h1></div>
        </div>
        <div className={classes["navbar-right"]}>
          <ul className={classes['nav-links']}>
            {/* {ctx.isLoggedIn && (<li><a href="/">Users</a></li>)}
            {ctx.isLoggedIn && (<li><a href="/">Admin</a></li>)} */}
            {/* {ctx.isLoggedIn && (<li><button onClick={ctx.onLogout}>Logout</button></li>)} */}
            {ctx.isLoggedIn && <li className={`${classes.navLink} ${classes.dropdown}`}>
              Dropdown
              <ul className={classes.dropdownContent}>
                <li className={classes.dropdownContentItem}>Action</li>
                <li className={classes.dropdownContentItem}>Another action</li>
                <li className={classes.dropdownContentItem}>Something</li>
                <li className={`${classes.dropdownContentItem} ${classes.divider}`}></li>
                <li className={classes.dropdownContentItem}><button className={classes.logoutButton} onClick={ctx.onLogout}>Logout</button></li>
              </ul>
            </li>}

          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};
export default Navbar;