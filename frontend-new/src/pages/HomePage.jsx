import BackgroundImg from "../store/snapedit_1692034406107.jpg";
import classes from "./HomePage.module.css";
import { motion } from "framer-motion";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router";
// import {useEffect } from "react";
import React from "react";


export default function HomePage() {
  const navigate = useNavigate();

  setTimeout(() => {
  const isLoggedin = localStorage.getItem("isLoggedIn");
  
  // useEffect(() => {
    // setTimeout(() => {
    //   if (isLoggedin !== '1') {
    //     navigate("/login");
    //   }
    // console.log(isLoggedin);

    // }, 1000);

  // });
console.log(isLoggedin);
  if(isLoggedin !== '1'){
    // return <Navigate to="/login" />;
    return navigate("/login");
  }
}, 1000);
  const ResourcePageHandler = () => {
    navigate("/resources");
  }
  

  const inlineStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url(${BackgroundImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    minHeight: '100vh',
  }
  return (
    <React.Fragment>
      <div style={inlineStyles} className={`${classes['main-image']}`} >
        <motion.section
          animate={{ opacity: [0.5, 1] }}
          transition={{ duration: 0.5 }}
          className={classes.summary}
          >
          <h2>Neuromancers</h2>
          <p>
            Neuromancers being the coding society of IIT Bhubaneswar would likely aim to provide a platform for students to develop coding skills, engage in coding competitions, and collaborate on tech projects. The society's objectives might involve improving coding proficiency, organizing coding events, and promoting a culture of learning and innovation.
          </p>
          <p>
            Choosing Neuromancers could offer freshers a chance to sharpen coding abilities, participate in coding challenges, and be part of a community passionate about technology and programming.
          </p>
        </motion.section>
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: '#422dc6' }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 500 }}
          className={classes.button}  
          onClick={ResourcePageHandler}
          >Resources</motion.button>
      </div>
    </React.Fragment>
  );
}
