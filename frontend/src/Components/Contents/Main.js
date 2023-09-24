import React, { Fragment, useState, useEffect } from "react";
import AuthContext from "../../Store/auth-Context";
import Header from "../Layout/Header";
import Login from "../Login/Login";
import Navbar from "../Layout/Navbar";
import SecondPage from "../Layout/SecondPage";
import ContactUs from "../Layout/ContactUs";
import "../../Store/customScrolbar.css";

export const ToLink = "https://neuroproject.onrender.com";

const Main = (props) => { 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [tokenn, setToken] = useState("");
  const [circleName, setCircleName] = useState("");
  const [ContactUsState, setContactUsState] = useState(false);
  const [memSignInstate, setMemSignInState] = useState(false);
  const [stuSignInState, setStuSignInState] = useState(false);
  const [continueState, setContinueState] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
    const storedMemberLoggedInInformation =
      localStorage.getItem("member#tobe@get*is$Log!ged&in");
    const storedStudentLoggedInInformation =
      localStorage.getItem("studentIsLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);

      if (storedMemberLoggedInInformation === "1") {
        setMemSignInState(true);
      } else if (storedStudentLoggedInInformation === "1") {
        setStuSignInState(true);
      } else {
        setStuSignInState(true);
      }
      setCircleName(localStorage.getItem("name").charAt(0));
    }
  }, []);



  const memberSignInFormSubmit = () => {
    setMemSignInState(true);
    setIsLoggedIn(true);
    localStorage.setItem("member#tobe@get*is$Log!ged&in", "1");
  };
  const studentSignInFormSubmit = () => {
    setStuSignInState(true);
    setIsLoggedIn(true);
    localStorage.setItem("studentIsLoggedIn", "1");
  };
  const continueHandler = () => {
    setContinueState(!continueState);
    setContactUsState(false);
  };
  const backHandler = () => {
    setContinueState(false);
    setContactUsState(false);
  };
  const contactUsHandler = () => {
    setContactUsState(!ContactUsState);
  };
  const loginHandler = (name, email, password, id) => {
    // setToken(token);
   // console.log(name, email, password, token,id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    setCircleName(localStorage.getItem("name").charAt(0));
    localStorage.setItem("id", id + "5799");

    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };
  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("id");
    localStorage.removeItem("member#tobe@get*is$Log!ged&in");
    localStorage.removeItem("studentIsLoggedIn");
    localStorage.removeItem("name");
    localStorage.removeItem("email");

    setContactUsState(false);
    setStuSignInState(false);
    setMemSignInState(false);
    setContinueState(false);
    setIsLoggedIn(false);
  };

  return (
    <Fragment>
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          onLogout: logoutHandler,
        }}
      >
        <Navbar
          contactUsHandler={contactUsHandler}
          backHandler={backHandler}
          continueHandler={continueHandler}
          circleName={circleName}
          memSignInstate={memSignInstate}
          onLogout={logoutHandler}
        />
        {!stuSignInState && !memSignInstate && (
          <Login
            onLogin={loginHandler}
            memberSignInFormSubmit={memberSignInFormSubmit}
            studentSignInFormSubmit={studentSignInFormSubmit}
          />
        )}

        {!ContactUsState &&
          !continueState &&
          (stuSignInState || memSignInstate) && (
            <div>
              <Header continueHandler={continueHandler} />
            </div>
          )}
        {!ContactUsState && continueState && (
          <SecondPage
            // token={tokenn}
            memSignInstate={memSignInstate}
            backHandler={backHandler}
          />
        )}

        {ContactUsState && <ContactUs backHandler={backHandler} />}
      </AuthContext.Provider>
    </Fragment>
  );
};

export default Main;
