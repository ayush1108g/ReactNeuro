import classes from "./Navbar.module.css";
import { useNavigate } from "react-router";
// import { useLocation } from "react-router-dom";
// import { motion } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import React, { useReducer} from "react";
import StudentSidebarModal from "./sidebarModal/studentSideBarModal";
import MemberSidebarModal from "./sidebarModal/memberSideBarModal";
import MemStuSidebarModal from "./sidebarModal/memstuSidebar";
import { Link } from "react-router-dom";

const defaultState = {
  studentSideModal: false,
  memberSideModal: false,
  memStuSideModal: false,
};
const Reducer = (state, action) => {
  if (action.type === "studentSideModal") {
    return { ...state, studentSideModal: action.payload }
  }
  else if (action.type === "memberSideModal") {
    return { ...state, memberSideModal: action.payload }
  }
  else if (action.type === "memStuSideModal") {
    return { ...state, memStuSideModal: action.payload }
  }
  return state;
}
const Navbar = (props) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(Reducer, defaultState);
  // const location = useLocation();
  // const locationPath = location.pathname;
  const isLoggedin = localStorage.getItem("isLoggedIn");
  let letter="A";
  // if (isLoggedin) {
  //   letter = localStorage.getItem("name");
  // }
  const role = localStorage.getItem("role");

  const studentModalDisplayHandler = () => {
    dispatch({ type: "studentSideModal", payload: !state.studentSideModal });
  }
  const memberModalDisplayHandler = () => {
    dispatch({ type: "memberSideModal", payload: !state.memberSideModal });
  }
  const memStuModalDisplayHandler = () => {
    dispatch({ type: "memStuSideModal", payload: !state.memStuSideModal });
  }

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <React.Fragment>
      {state.studentSideModal && <StudentSidebarModal memSignInstate={props.memSignInstate} onChangeModal={studentModalDisplayHandler} />}
      {state.memberSideModal && <MemberSidebarModal onChangeModal={memberModalDisplayHandler} />}
      {state.memStuSideModal && <MemStuSidebarModal onChangeModal={memStuModalDisplayHandler} />}
      <div className={classes.navbar}>
        <div className={classes.navLeft}>
          <Link to=".." className="h2 text-decoration-none">Resource Portal</Link>
        </div>

        <div className={classes.navRight}>
          {isLoggedin && <div className={classes.circle}> <span className={classes.initial}>{letter}</span></div>}
          <div>
            &nbsp;&nbsp;
          </div>
          {isLoggedin && 
          <div className="dropdown " >
            <button className="btn btn-secondary dropdown-toggle" style={{ backgroundColor: 'rgb(175, 242, 242)' }} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <GiHamburgerMenu className={`${classes.hamm}`} />&nbsp;&nbsp;
            </button>

            <div className="dropdown-menu bg-light" aria-labelledby="dropdownMenuButton">
              <li className="dropdown-item" onClick={studentModalDisplayHandler}>Student List</li>
              {role === "mentor#code" && <> <li className="dropdown-item" onClick={memberModalDisplayHandler}>Member List</li>
                <li className="dropdown-item" onClick={memStuModalDisplayHandler}>Your Student List</li></>}
              <Link className="dropdown-item" to='/resources'>Resources</Link>
              <Link to='/contactUs' className="dropdown-item">Contact Us</Link>
              <li className="dropdown-item" onClick={logoutHandler}>Logout</li>
            </div>
          </div>}
        </div>
      </div>
    </React.Fragment>
  );
};
export default Navbar;
