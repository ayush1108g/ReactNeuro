import React from "react";
import classes from './Header.module.css'
import BackImg from '../../Store/BackgroundImg.jpg'
import Navbar from "./Navbar";
const Header = () => {

    return (
        <React.Fragment>
             <Navbar />
            <header className={classes.header}>
            <h1>NEUROMANCERS</h1>
            </header>
        
             <div className={classes['main-image']}>
                <img src={BackImg} alt="A wonderful World" />
            </div>
            </React.Fragment>
    );
};

export default Header;