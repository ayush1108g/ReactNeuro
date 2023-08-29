import React, { useState, useContext } from "react";
import classes from './Navbar.module.css';
import logo from '../../Store/Neurologo.png';
import AuthContext from "../../Store/auth-Context";
import horiMenu from '../../Store/menu-button-of-three-horizontal-lines.png';
import StudentSidebarModal from "./sidebarModal/studentSideBarModal";
import MemberSidebarModal from "./sidebarModal/memberSideBarModal";
import MemStuSidebarModal from "./sidebarModal/memstuSidebar";

const Navbar = (props) => {
  const ctx = useContext(AuthContext);
  const [studentSideModal, setStudentSideModal] = useState(false);
  const [memberSideModal, setMemberSideModal] = useState(false);
  const [memStuSideModal, setMemStuSideModal] = useState(false);

  const studentModalDisplayHandler = () => {
    setStudentSideModal(!studentSideModal);
  }
  const memberModalDisplayHandler = () => {
    setMemberSideModal(!memberSideModal); 
  }
  const memStuModalDisplayHandler = () => {
    setMemStuSideModal(!memStuSideModal);
  }

  const letter = props.circleName;


  return (
    <React.Fragment>
      {ctx.isLoggedIn && studentSideModal && <StudentSidebarModal memSignInstate={props.memSignInstate} onChangeModal={studentModalDisplayHandler} />}
      {ctx.isLoggedIn && memberSideModal && <MemberSidebarModal onChangeModal={memberModalDisplayHandler} />}
      {ctx.isLoggedIn && memStuSideModal && <MemStuSidebarModal onChangeModal={memStuModalDisplayHandler} /> }
      <nav className={classes.navbar}>
        <div className={classes["navbar-left"]}>
          <div ><img className={classes.logo} src={logo} alt="Logo" /></div>
          <div><h1>NEUROMANCERS</h1></div>
        </div>
        <div className={classes["navbar-right"]}>
          {ctx.isLoggedIn && <div className={classes.circle}> <span className={classes.initial}>{letter}</span></div>}
          <ul className={classes['nav-links']}>
            {ctx.isLoggedIn && <li className={`${classes.navLink} ${classes.dropdown}`}>
              <div className={classes["image-toggle-container"]}>
                <img className={classes["image-toggle"]} src={horiMenu} alt="Toggle Img" /></div>
              <ul className={classes.dropdownContent}>
                <li className={classes.dropdownContentItem} onClick={props.continueHandler}>Resources</li>
                <li className={classes.dropdownContentItem} onClick={studentModalDisplayHandler}>Student List</li>
               {props.memSignInstate && <li className={classes.dropdownContentItem} onClick={memberModalDisplayHandler}>Member List</li>}
               {props.memSignInstate && <li className={classes.dropdownContentItem} onClick={memStuModalDisplayHandler}>Your Student List</li>}
                <li className={classes.dropdownContentItem} onClick={props.contactUsHandler}>Contact Us</li>
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