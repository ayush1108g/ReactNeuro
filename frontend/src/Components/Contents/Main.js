import React, { Fragment, useState, useEffect } from 'react';
import AuthContext from '../../Store/auth-Context';
import Header from '../Layout/Header';
import Login from '../Login/Login';
import Navbar from '../Layout/Navbar';
import SecondPage from '../Layout/SecondPage';
import ContactUs from '../Layout/ContactUs';
import '../../Store/customScrolbar.css';
const Main = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [ circleName ,setCircleName] = useState('');
  const [ContactUsState,setContactUsState] = useState(false);
  const [memSignInstate, setMemSignInState] = useState(false);
  const [stuSignInState, setStuSignInState] = useState(false);
  const [continueState, setContinueState] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    const storedMemberLoggedInInformation = localStorage.getItem('memberIsLoggedIn');
    const storedStudentLoggedInInformation = localStorage.getItem('studentIsLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);

      if (storedMemberLoggedInInformation === '1') {
        setMemSignInState(true);
      }
      else if (storedStudentLoggedInInformation === '1') {
        setStuSignInState(true);
      }
      else{
        setStuSignInState(true);
      }
    setCircleName(localStorage.getItem('name').charAt(0));
    }
  }, []
  );

  const memberSignInFormSubmit = () => {
    setMemSignInState(true);
    setIsLoggedIn(true);
    localStorage.setItem('memberIsLoggedIn', '1');

  }
  const studentSignInFormSubmit = () => {
    setStuSignInState(true);
    setIsLoggedIn(true);
    localStorage.setItem('studentIsLoggedIn', '1');
  }
  const continueHandler = () => {
    setContinueState(true);
  }
  const backHandler = () => {
    setContinueState(false);
    setContactUsState(false);
  }
  const contactUsHandler =() =>{
    setContactUsState(true);
  }
  const loginHandler = (name,email, password) => {
    console.log(name,email, password);
    localStorage.setItem('name', name);
    setCircleName(localStorage.getItem('name').charAt(0));
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };
  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('memberIsLoggedIn');
    localStorage.removeItem('studentIsLoggedIn');
    localStorage.removeItem('name');

    setStuSignInState(false);
    setMemSignInState(false);
    setContinueState(false);
    setIsLoggedIn(false);
  };
  


  return (
    <Fragment >
      <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
      }}>

        <Navbar  contactUsHandler={contactUsHandler} circleName={circleName} onLogout={logoutHandler} />
        {(!stuSignInState && !memSignInstate) && <Login onLogin={loginHandler} memberSignInFormSubmit={memberSignInFormSubmit} studentSignInFormSubmit={studentSignInFormSubmit} />}

        {!ContactUsState && !continueState && (stuSignInState || memSignInstate) &&<div><Header continueHandler={continueHandler} /></div> }
        {continueState && <SecondPage memSignInstate={memSignInstate} backHandler={backHandler} />}

        {ContactUsState && <ContactUs backHandler={backHandler}/>}
      </AuthContext.Provider>
    </Fragment>
  );
};

export default Main;