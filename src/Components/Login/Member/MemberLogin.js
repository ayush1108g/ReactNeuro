import React, { useState } from "react";
import MemberSignIn from "./MemberSignin";
import MemberSignUp from "./MemberSignup";
import classes from './MemberLogin.module.css'

const MemberLogin = (props) => {
    const [signUpState, setSignUpState] = useState(true);
    const [signInState, setSignInState] = useState(false);

    const signInHandler = () => {
        setSignUpState(false);
        setSignInState(true);
    }
    const signUpHandler = () => {
        setSignUpState(true);
        setSignInState(false);
    }

    return (
        <React.Fragment>
            
            <div className={classes.btnbody}>
            <button className={classes['back-button']} onClick={props.backHandler} >Back</button>
            </div>
            {signUpState && <MemberSignUp signInHandler={signInHandler} />}
            {signInState && <MemberSignIn signUpHandler={signUpHandler} />}
            
        </React.Fragment>
    );
};

export default MemberLogin;