import React, { useState,useContext } from "react";
import classes from './Navbar.module.css';
import logo from '../../Store/Neurologo.png';
import AuthContext from "../../Store/auth-Context";
import horiMenu from '../../Store/menu-button-of-three-horizontal-lines.png';
import StudentSidebarModal from "./studentSideBarModal";

const Navbar = (props) => {
  const ctx = useContext(AuthContext);
  const [studentSideModal , setStudentSideModal] = useState(false);
  

  const studentModalDisplayHandler = () => {
    setStudentSideModal(!studentSideModal);
  }

const letter = props.circleName;


  return (
    <React.Fragment>
      {ctx.isLoggedIn && studentSideModal && <StudentSidebarModal onChangeModal={studentModalDisplayHandler}/>}
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
                <li className={classes.dropdownContentItem} onClick={studentModalDisplayHandler}>Student List</li>
                <li className={classes.dropdownContentItem} onClick={props.contactUsHandler}>Contact Us</li>
                {/* <li className={`${classes.dropdownContentItem} ${classes.divider}`}></li> */}
                <li className={classes.dropdownContentItem} onClick={ctx.onLogout}>Logout</li>
              </ul>
            </li>}

          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};
export default Navbar;