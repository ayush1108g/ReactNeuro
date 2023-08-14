import React from "react";
import classes from './Header.module.css'
import BackgroundImg from '../../Store/snapedit_1692034406107.jpg'
import Navbar from "./Navbar";
import Summary from "../Contents/Summary";

const Header = () => {
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
            <Navbar />
            <div style={inlineStyles} className={`${classes['main-image']}`} >
                
                <Summary />
                <button className={classes.button}>Continue</button>
            </div>
        </React.Fragment>
    );
};

export default Header;