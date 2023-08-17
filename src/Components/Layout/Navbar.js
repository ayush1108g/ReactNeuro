import React, { useContext } from "react";
import classes from './Navbar.module.css';
import logo from '../../Store/Neurologo.png';
import AuthContext from "../../Store/auth-Context";
import horiMenu from '../../Store/menu-button-of-three-horizontal-lines.png';


const Navbar = (props) => {
  const ctx = useContext(AuthContext);
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // const toggleDropdown = () => {
  //   setIsDropdownOpen(!isDropdownOpen);
  // };
const email=localStorage.getItem('email');
const letter = email.charAt(0);


  return (
    <React.Fragment>
      <nav className={classes.navbar}>
        <div className={classes["navbar-left"]}>
          <div ><img className={classes.logo} src={logo} alt="Logo" /></div>
          <div><h1>NEUROMANCERS</h1></div>
        </div>
        <div className={classes["navbar-right"]}>
        { ctx.isLoggedIn && <div className={classes.circle}> <span className={classes.initial}>{letter}</span></div>}
          <ul className={classes['nav-links']}>
            {ctx.isLoggedIn && <li className={`${classes.navLink} ${classes.dropdown}`}>
              <div className={classes["image-toggle-container"]}>
                <img className={classes["image-toggle"]} src={horiMenu} alt="Toggle Img" /></div>
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