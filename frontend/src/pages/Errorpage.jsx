import React from 'react';
import { Link } from 'react-router-dom';
import classes from './ErrorPage.module.css';
const Errorpage = () => {
    return (
        <div className={classes["error-container"]}>
            <div className={classes["error-content"]}>
                <h1>Oops! Something went wrong.</h1>
                <p>We're sorry, but an error has occurred. Please try again later.</p>
                <Link to="/">Go back to home page</Link>
            </div>
        </div >
    )
}
export default Errorpage;