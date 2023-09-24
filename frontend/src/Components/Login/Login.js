import React, { useState } from "react";
import Card from "../UI/Card";
import classes from './Login.module.css'
import MemberLogin from "./Member/MemberLogin";
import StudentLogin from "./Student/StudentLogin";


const Login = (props) => {

    const [memberLoginState, setMemberLoginState] = useState(false);
    const [studentLoginState, setStudentLoginState] = useState(false);
    const [loginState, setLoginState] = useState(true);

    const memberLoginStateHandler = () => {
        setMemberLoginState(true);
        setStudentLoginState(false);
        setLoginState(false);
        // props.memLoginState(memberLoginState);
    };
    const studentLoginStateHandler = () => {
        setMemberLoginState(false);
        setStudentLoginState(true);
        setLoginState(false);
    };

    const backHandler =() =>{
        setStudentLoginState(false);
        setMemberLoginState(false);
        setLoginState(true);
    }

    const display = <React.Fragment>
       
        <div className={classes.buttonBody}>
            <Card>
                <p>Login as...</p>
                <div className={classes['button-container']}>
                    <button className={classes.button} onClick={memberLoginStateHandler}>Member</button>
                    <button className={classes.button} onClick={studentLoginStateHandler} >Student</button>
                </div>
            </Card>
            
        </div>
    </React.Fragment>;



    return (
        <React.Fragment>
            {loginState && display}
            {memberLoginState && <MemberLogin onLogin={props.onLogin} backHandler={backHandler} memberSignInFormSubmit={props.memberSignInFormSubmit} />}
            {studentLoginState && <StudentLogin onLogin={props.onLogin} backHandler={backHandler} studentSignInFormSubmit={props.studentSignInFormSubmit} />}
        </React.Fragment>
    );
};

export default Login;