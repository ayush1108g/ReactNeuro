import React, { useEffect, useRef } from "react";
import Card from "../../UI/Card";
import classes from "./StudentSignup.module.css";
import axios from "axios";

const StudentSignUp = (props) => {
    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const numberInputRef = useRef();

    useEffect(() => {
        const p = async () => {
            const data = await fetch("http://localhost:4000/data", {
                method: "GET",
                headers: {
                    "student-signup": "application/json",
                },
            });
            const data1 = await data.json();
            console.log(data1);
        };

        p();
    }, []);

    const studentFormSignUpHandler = async (event) => {
        event.preventDefault();
        const userDetail = {
            userName: nameInputRef.current.value,
            userEmail: emailInputRef.current.value,
            userPassword: passwordInputRef.current.value,
            userNumber: numberInputRef.current.value,
        };
        nameInputRef.current.value = "";
        emailInputRef.current.value = "";
        passwordInputRef.current.value = "";
        numberInputRef.current.value = "";
        console.log(userDetail);

        // const newStudentsignup = await fetch("http://localhost:4000/data", {
        //   method: "POST",
        //   headers: {
        //     "student-signup": "application/json",
        //   },
        //   body: JSON.stringify({
        //     // name: userDetail.userName,
        //     // emailid: userDetail.userEmail,
        //     // phoneno: userDetail.userNumber,
        //     // password: userDetail.userPassword,
        //     name: "John Doe",
        //     emailid: "john@example.com",
        //     phoneno: "1234567890",
        //     password: "secretpassword",
        //   }),
        // });
        const options = {
            headers: {
                "student-signup": "application/json",
            },
        };
        const body = {
            name: userDetail.userName,
            emailid: userDetail.userEmail,
            phoneno: userDetail.userNumber,
            password: userDetail.userPassword,
        };
        const resp = await axios.post("http://localhost:4000/data", body, options);
        // const data = await newStudentsignup.json();
        console.log(resp.data);
        // / Store the user Detail
        props.signInHandler();
    };
    return (
        <section className={classes.form}>
            <Card method="POST">
                <div className={classes["signup-form"]} method="POST">
                    <h2>Sign Up</h2>
                    <form method="POST" onSubmit={studentFormSignUpHandler}>
                        <input
                            type="text"
                            name="fullname"
                            placeholder="Full Name"
                            ref={nameInputRef}
                            required
                        ></input>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            ref={emailInputRef}
                            required
                        ></input>
                        <input
                            type="number"
                            name="number"
                            placeholder="Phone-Number"
                            ref={numberInputRef}
                            required
                        ></input>
                        <input
                            type="password"
                            name="password"
                            placeholder="Create-Password"
                            ref={passwordInputRef}
                            required
                        ></input>
                        <button
                            method="POST"
                            type="submit"
                            onClick={studentFormSignUpHandler}
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
                <div className={classes.para}>
                    <p>
                        Already have an account?{" "}
                        <button
                            className={classes.buttonSubmit}
                            type="button"
                            onClick={props.signInHandler}
                        >
                            Sign In
                        </button>
                    </p>
                </div>
            </Card>
        </section>
    );
};

export default StudentSignUp;
