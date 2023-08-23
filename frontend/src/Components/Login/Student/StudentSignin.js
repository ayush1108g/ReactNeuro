import React, { useRef, useState } from "react";
import Card from "../../UI/Card";
import classes from "./StudentSignin.module.css";
import ForgotPassword from "../forgotPassword";
import axios from "axios";

const StudentSignIn = (props) => {
  const [forgotPass, setforgotPassword] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const message = "student";

  const studentFormSignInHandler = async (event) => {
    event.preventDefault();
    const userDetail = {
      userEmail: emailInputRef.current.value,
      userPassword: passwordInputRef.current.value,
    };

    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    const body = {
      emailid: userDetail.userEmail,
      password: userDetail.userPassword,
    };

    const response = await axios.post(
      "http://localhost:4000/student/login",
      body
    );
    console.log(response);
    if (response.data.status === "success") {
      const name = response.data.name;
      props.onLogin(userDetail.userEmail, userDetail.userPassword);
      props.studentSignInFormSubmit();
    }

    // console.log(userDetail;
    //Authenticate and Then continue
  };
  const forgotPasswordHandler = () => {
    setforgotPassword(true);
    console.log(forgotPass);
  };

  return (
    <section className={classes.form}>
      <Card>
        {forgotPass && (
          <ForgotPassword
            from={message}
            stusignUpHandler={props.signUpHandler}
          />
        )}
        {!forgotPass && (
          <div>
            <div className={classes["signin-form"]}>
              <h2>Sign In</h2>
              <br></br>
              <br></br>
              <br></br>
              <form onSubmit={studentFormSignInHandler}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  ref={emailInputRef}
                  required
                ></input>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter-Password"
                  ref={passwordInputRef}
                  pattern=".{8,}"
                  title="Password must be at least 8 characters long"
                  required
                ></input>
                <button type="submit">Sign In</button>
              </form>
              <br />
              <span onClick={forgotPasswordHandler}>Forgot password</span>
            </div>
            <div className={classes.para}>
              <p>
                Don't have an account?{" "}
                <button
                  className={classes.buttonSubmit}
                  type="button"
                  onClick={props.signUpHandler}
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        )}
      </Card>
    </section>
  );
};

export default StudentSignIn;
