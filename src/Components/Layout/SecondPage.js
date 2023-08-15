import React from "react";
import classes from './SecondPage.module.css'
import Card from "../UI/Card";


const SecondPage = (props) => {

    return (
        <React.Fragment>
            <div className={classes.btnbody}>
                <button className={classes['back-button']} onClick={props.backHandler} >Back</button>
            </div>

            <div className={classes["page-container"]}>
                <div className={classes["content-container"]}>
                    <Card>
                        <h1>Welcome to our Website</h1>
                        <p>This is some example content on the left side.</p>
                        <h1>Welcome to our Website</h1>
                        <p>This is some example content on the left side.</p>
                        <h1>Welcome to our Website</h1>
                        <p>This is some example content on the left side.</p>
                        <h1>Welcome to our Website</h1>
                        <p>This is some example content on the left side.</p>
                        <h1>Welcome to our Website</h1>
                        <p>This is some example content on the left side.</p>
                        <h1>Welcome to our Website</h1>
                    </Card><Card>
                        <p>This is some example content on the left side.</p>
                        <h1>Welcome to our Website</h1>
                        <p>This is some example content on the left side.</p>
                        <h1>Welcome to our Website</h1>
                        <p>This is some example content on the left side.</p>
                        <h1>Welcome to our Website</h1>
                        <p>This is some example content on the left side.</p>
                        <h1>Welcome to our Website</h1>
                        <p>This is some example content on the left side.</p>
                        <h1>Welcome to our Website</h1>
                        <p>This is some example content on the left side.</p>
                        <h1>Welcome to our Website</h1>
                        <p>This is some example content on the left side.</p>   </Card>
                </div>
            </div>

        </React.Fragment>
    );
};

export default SecondPage;