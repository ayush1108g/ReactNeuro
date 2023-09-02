import React, { useRef, useState } from "react";
import Card from "../../UI/Card";
import classes from "./StudentSignup.module.css";
import axios from "axios";
import { ToLink } from "../../Contents/Main";

const StudentSignUp = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errormsg, setErrormsg] = useState("");
    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const numberInputRef = useRef();

    // useEffect(() => {
    //     const p = async () => {
    //         const data = await fetch(`{ToLink}/data", {
    //             method: "GET",
    //             headers: {
    //                 "student-signup": "application/json",
    //             },
    //         });
    //         const data1 = await data.json();
    //         console.log(data1);
    //     };

    //     p();
    // }, []);

    const studentFormSignUpHandler = async (event) => {
        event.preventDefault();
        const userDetail = {
            userName: nameInputRef.current.value,
            userEmail: emailInputRef.current.value,
            userPassword: passwordInputRef.current.value,
            userNumber: numberInputRef.current.value,

        };

       // console.log(userDetail);

        const idno = Math.floor(Math.random() * 10000) % 15 + 1;
       // console.log(idno);
        
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
            id: idno,
        };
        try {
            setIsLoading(true);
            const response = await axios.post(`${ToLink}/student/signup`, body, options, { timeout: 30000 });
          //  console.log(response);
            if (response.status === 201) {
                nameInputRef.current.value = "";
                emailInputRef.current.value = "";
                passwordInputRef.current.value = "";
                numberInputRef.current.value = "";
                props.signInHandler();
            }
        }
        catch (error) {
        //    console.log(error);
            if (error.code === "ERR_BAD_REQUEST")
                setErrormsg(error.response.data.message);
            else if(error.response.status === 500)
                setErrormsg('Email or PhoneNo already in use');
            else if (error.code === "ERR_BAD_RESPONSE")
                setErrormsg('Server Not Responding...')
            else
                setErrormsg("An error occurred. Please try again.");
        }
        setIsLoading(false);

    };
    return (
        <section className={classes.form}>
            <Card method="POST"><div>
                {!isLoading && <p className={classes.loading}> {errormsg}</p>}
                {
                    isLoading && <section >
                        <p className={classes.loading}>Loading...</p>
                    </section>
                }
            </div>
                <div className={classes["signup-form"]} method="POST">
                    <h2>Sign Up</h2>
                    <form method="POST" onSubmit={studentFormSignUpHandler}>
                        <input
                            type="text"
                            name="fullname"
                            placeholder="User Name"
                            ref={nameInputRef}
                            pattern=".{4,}"
                            title="Username must be at least 4 characters long"
                            required
                        ></input>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            ref={emailInputRef}
                            title="Please enter a valid email address in the format user@example.com"
                            required
                        ></input>
                        <input
                            type="tel"
                            name="number"
                            placeholder="Phone-Number"
                            ref={numberInputRef}
                            pattern="[0-9]{10}"
                            title="Please enter your 10 digit number"
                            required
                        ></input>
                        <input
                            type="password"
                            name="password"
                            placeholder="Create-Password"
                            ref={passwordInputRef}
                            pattern=".{8,}"
                            title="Password must be at least 8 characters long"
                            required
                        ></input>
                        <button
                            method="POST"
                            type="submit"
                        // onClick={studentFormSignUpHandler}
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
