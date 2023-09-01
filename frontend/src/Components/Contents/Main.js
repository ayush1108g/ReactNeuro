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
    const storedUserLoggedInInformation = sessionStorage.getItem("isLoggedIn");
    const storedMemberLoggedInInformation =
      sessionStorage.getItem("member#tobe@get*is$Log!ged&in");
    const storedStudentLoggedInInformation =
      sessionStorage.getItem("studentIsLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);

      if (storedMemberLoggedInInformation === "1") {
        setMemSignInState(true);
      } else if (storedStudentLoggedInInformation === "1") {
        setStuSignInState(true);
      } else {
        setStuSignInState(true);
      }
      setCircleName(sessionStorage.getItem("name").charAt(0));
    }
  }, []);



  const memberSignInFormSubmit = () => {
    setMemSignInState(true);
    setIsLoggedIn(true);
    sessionStorage.setItem("member#tobe@get*is$Log!ged&in", "1");
  };
  const studentSignInFormSubmit = () => {
    setStuSignInState(true);
    setIsLoggedIn(true);
    sessionStorage.setItem("studentIsLoggedIn", "1");
  };
  const continueHandler = () => {
    setContinueState(!continueState);
  };
  const backHandler = () => {
    setContinueState(false);
    setContactUsState(false);
  };
  const contactUsHandler = () => {
    setContactUsState(!ContactUsState);
  };
  const loginHandler = (name, email, password, token, id) => {
    // setToken(token);
   // console.log(name, email, password, token,id);
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("email", email);
    setCircleName(sessionStorage.getItem("name").charAt(0));
    sessionStorage.setItem("id", id + "5799");

    sessionStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };
  const logoutHandler = () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("member#tobe@get*is$Log!ged&in");
    sessionStorage.removeItem("studentIsLoggedIn");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");

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
