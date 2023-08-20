import React from "react";
import classes from './Header.module.css'
import BackgroundImg from '../../Store/snapedit_1692034406107.jpg'
import Summary from "../Contents/Summary";

const Header = (props) => {

    
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

                <Summary />
                <button className={classes.button} onClick={props.continueHandler} >Continue</button>
            </div>
        </React.Fragment>
    );
};

export default Header;