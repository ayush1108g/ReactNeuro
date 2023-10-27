import classes from "./Signin.module.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ToLink } from "../App";

const Signin = (props) => {
  const navigate = useNavigate();
  const [selectedRadioButton, setSelectedRadioButton] = useState("abc");
  //   const [password, setPassword] = useState("");
  const [errormsg, setErrormsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const nameInputRef = useRef();
  const phoneInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passKeyInputRef = useRef();

  const handleTogglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const loginpageHandler = () => {
    if (props.pagename === "Signup") {
      navigate("/login");
    } else {
      navigate("/signup");
    }
  };
  const forgotPasswordHandler = () => {
    navigate("forgotpassword");
  };

  const handleRadioButtonChange = (event) => {
    setSelectedRadioButton(event.target.id);
  };

  const signupLoginHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    if (selectedRadioButton === "abc")
      return setErrormsg("Please select a role");
    if (enteredEmail.trim().length === 0 || enteredPassword.trim().length === 0)
      return setErrormsg("Please enter all the fields");
    const data = {
      emailid: enteredEmail,
      password: enteredPassword,
    };
    if (props.pagename === "Signup") {
      const enteredName = nameInputRef.current.value;
      data.name = enteredName;
      if (selectedRadioButton === "mentor") {
        const enteredPassKey = passKeyInputRef.current.value;
        data.code = enteredPassKey;

        if (
          enteredPassKey.trim().length === 0 ||
          enteredEmail.trim().length === 0
        )
          return setErrormsg("Please enter all the fields");
      } else {
        const enteredPhone = phoneInputRef.current.value;
        data.phoneno = enteredPhone;
        const idno = (Math.floor(Math.random() * 10000) % 15) + 1;
        data.id = idno;
      }
    }
    console.log(data);
    const page = props.pagename.toLowerCase();
    const selBut = selectedRadioButton.toLowerCase();
    const head = selBut + "-" + page;
    const options = {
      headers: {
        [head]: "application/json",
      },
    };
    console.log(options);
    console.log(page);
    console.log(selBut);

    try {
      console.log(`${ToLink}/${selBut}/${page}`);
      setIsLoading(true);
      let resp;
      if (props.pagename === "Signup") {
        resp = await axios.post(`${ToLink}/${selBut}/${page}`, data, options, {
          timeout: 30000,
        });
      } else {
        resp = await axios.post(`${ToLink}/${selBut}/${page}`, data, {
          timeout: 30000,
        });
      }

      if (resp.status === 201 || resp.status === 200) {
        localStorage.setItem("isLoggedIn", "1");
        localStorage.setItem("email", enteredEmail);
        if (props.pagename === "Login") {
          localStorage.setItem("name", resp.data.name);
          localStorage.setItem("token", resp.data.token);
          localStorage.setItem("id", resp.data.id);
        }
        emailInputRef.current.value = "";
        passwordInputRef.current.value = "";
        if (props.pagename === "Signup") {
          nameInputRef.current.value = "";
          phoneInputRef.current.value = "";
          if (selectedRadioButton === "mentor")
            passKeyInputRef.current.value = "";
        }
        if(selectedRadioButton === "mentor"){
          localStorage.setItem("role","mentor#code");
        }
        else{
          localStorage.setItem("role","student");
        }
        navigate("/");
      }
      console.log(resp);
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_BAD_REQUEST") setErrormsg("Email already in use");
      else if (error.code === "ERR_BAD_RESPONSE")
        setErrormsg("Server Not Responding...");
      else setErrormsg("An error occurred. Please try again.");
    }
    setIsLoading(false);
  };
  const animateVariants = {
    show: {
      scale: [15, 0],
      transition: {
        times: [0, 1],
        ease: "easeInOut",
        duration: 0.5,
      },
    },
    hide: {
      scale: 0,
    },
    exit: {
      scale: [0, 15],
      transition: {
        times: [0, 1],
        ease: "easeInOut",
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className={`row d-flex align-items-center ${classes.container}`}>
        <motion.form
          key={props.pagename}
          className={`border-bottom-0 ${classes.form}`}
        >
          {!isLoading && <p className={classes.loading}> {errormsg}</p>}
          {isLoading && (
            <div className="spinner-border text-danger" role="status">
              {/* <span class="sr-only">Loading...</span> */}
            </div>
          )}
          <motion.div
            variants={animateVariants}
            animate="show"
            exit="exit"
            className={classes.box}
          ></motion.div>
          {props.pagename === "Signup" && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-100"
            >
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  type="text"
                  id="name"
                  placeholder="Name"
                  autoComplete="on"
                  ref={nameInputRef}
                  pattern=".{4,}"
                  title="Username must be at least 4 characters long"
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  type="number"
                  id="phone"
                  autoComplete="on"
                  placeholder="Phone Number"
                  ref={phoneInputRef}
                  pattern="[0-9]{10}"
                  title="Please enter your 10 digit number "
                  required
                />
              </div>
            </motion.div>
          )}

          <div className="input-group mb-3">
            <input
              className="form-control"
              type="email"
              id="email"
              autoComplete="on"
              placeholder="email-id"
              ref={emailInputRef}
              title="Please enter a valid email address in the format user@example.com"
              required
            />
          </div>
          <div className="input-group mb-3">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="form-control"
              placeholder={!showPassword ? " · · · · · · · · " : "password"}
              ref={passwordInputRef}
              pattern=".{8,}"
              title="Password must be at least 8 characters long"
              required
            />
            <span className="input-group-text" onClick={handleTogglePassword}>
              {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
            </span>
          </div>
          <div className="d-flex justify-content-around align-items-between w-100">
            {/* <div
              className={`border-primary h-20vh ${classes.buttom}`}
              onClick={() => {
                setSelectedRadioButton("mentor");
              }}
            >  */}
            <div className={`${classes.buttom}`}>
              <label htmlFor="mentor">Mentor</label>
              &nbsp;
              <input
                name="choice"
                type="radio"
                id="mentor"
                value="mentor"
                checked={selectedRadioButton === "mentor"}
                onChange={handleRadioButtonChange}
                required
              />
            </div>
            {/* <div
              className={`border-primary ${classes.buttom}`}
              onClick={() => {
                setSelectedRadioButton("student");
              }}
            >   */}
            <div className={`${classes.buttom}`}>
              <label htmlFor="student">Student</label>
              &nbsp;
              <input
                name="choice"
                type="radio"
                id="student"
                value="student"
                checked={selectedRadioButton === "student"}
                onChange={handleRadioButtonChange}
                required
              />
            </div>
            {/* </div>  */}
          </div>

          <AnimatePresence>
            {props.pagename === "Signup" &&
              selectedRadioButton === "mentor" && (
                <motion.div
                  initial={{ height: 0, opacity: 0, y: "-2vh", scaleY: 0.5 }}
                  animate={{ height: "auto", opacity: 1, y: "0vh", scaleY: 1 }}
                  exit={{ height: 0, opacity: 0, y: "-2vh", scaleY: 0.5 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="input-group mb-3"
                >
                  <input
                    className="form-control"
                    type="text"
                    id="mentorPassKey"
                    placeholder="Passkey"
                    ref={passKeyInputRef}
                    required
                  />
                </motion.div>
              )}
          </AnimatePresence>

          <div className={classes.buttons}>
            <button
              className="btn btn-primary w-100"
              type="submit"
              onClick={signupLoginHandler}
            >
              {props.pagename}
            </button>
          </div>

          <div className={classes.pagechange}>
            <b>
              <p
                onClick={loginpageHandler}
                className="small font-monospace text-center row text-dark "
              >
                {props.pagename === "Signup" ? "Already" : "Don't"} have an
                account? {props.pagename === "Signup" ? "Login " : "Signup"}
              </p>
              <motion.p
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="small d-flex justify-content-end font-monospace row text-dark "
                style={{ fontSize: "2vh" }}
                onClick={forgotPasswordHandler}
              >
                {" "}
                {props.pagename === "Login"
                  ? "Forgot Password?"
                  : "                  "}
              </motion.p>
            </b>
          </div>
        </motion.form>
      </div>
    </>
  );
};
export default Signin;
