import React, { useEffect, useState } from "react";
import Button from "../UI/Button";
import classes from './InputItem.module.css'
import axios from "axios";
import { ToLink } from "../App";
import { AnimatePresence, motion } from "framer-motion";


const InputItem = (props) => {
    const [additem, setAddItem] = useState(true);
    const [enteredHeading, setEnteredHeading] = useState('');
    const [enteredContent, setEnteredContent] = useState('');
    const [enteredContentLink, setEnteredContentLink] = useState('');
    const [douploadFile, setDouploadFile] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [isFlieToLinkLoading, setIsFlieToLinkLoading] = useState(false);

    const headingChangeHandler = event => {
        if (event.target.value.trim().length > 0) {
            setIsValid(true);
        }
        setEnteredHeading(event.target.value);
    };

    const contentChangeHandler = event => {
        if (event.target.value.trim().length > 0) {
            setIsValid(true);
        }
        setEnteredContent(event.target.value);
    };

    const linkChangeHandler = event => {
        if (event.target.value.trim().length > 0) {
            setIsValid(true);
        }
        setEnteredContentLink(event.target.value);
    };

    const fileChangeHandler = async (event) => {
        const selectedFile = event.target.files[0];
        const body = new FormData();
        body.append('file', selectedFile);
        try {
            setIsFlieToLinkLoading(true);
            const resp = await axios.post(`${ToLink}/data/upload-file`, body)
            console.log(resp.data);
            setEnteredContentLink(resp.data.data.webViewLink);
            console.log(resp.data.data.webViewLink);
        }
        catch (error) {
            console.log(error);
        }
        setIsFlieToLinkLoading(false);
    }
    const formSubmitHandler = (event) => {
        event.preventDefault();
        if (!isValid) {
            setIsValid(false);
            return;
        }
        {
            let link = enteredContentLink.toString();
            if (!link.startsWith("http://") && !link.startsWith("https://")) {
                link = "http://" + link;
            }
            props.onAddContent({
                id: Math.floor(Math.random()).toString(),
                heading: enteredHeading,
                content: enteredContent,
                contentLink: link,
            });

        } return;
    };
    const filetolinkHandler = () => {
        setDouploadFile((douploadFile) => !douploadFile);
    }

    useEffect(() => {
        if (props.dataAddedSuccess === true) {
            setEnteredHeading('');
            setEnteredContent('');
            setEnteredContentLink('');
            setDouploadFile(false);
            setAddItem(false);
        }
    }, [props.dataAddedSuccess]);


    const addItemHandler = () => {
        setAddItem(!additem);
    };

    return (
        <div >

            <AnimatePresence>
                {!additem && <motion.form
                    initial={{ opacity: 0, y: -100, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 1 }}
                    onSubmit={formSubmitHandler} className={classes['form-control']} >
                    <hr></hr>
                    <label>Course Item</label>
                    <input type="heading" placeholder="Heading" onChange={headingChangeHandler} value={enteredHeading} required ></input>
                    <br />
                    <input type="text" placeholder="Content" onChange={contentChangeHandler} value={enteredContent} required />
                    <br />
                    <input type="text" placeholder="Content-link" onChange={linkChangeHandler} value={enteredContentLink} disabled={douploadFile} required></input>
                    <br />
                    <div className={classes["horizontal-line"]}>
                        <div className={classes.line}></div>
                        <div className={classes.or}>or</div>
                        <div className={classes.line}></div>
                    </div>
                    <br />
                    <input type="checkbox" onChange={filetolinkHandler} className={classes.check} ></input>
                    {!douploadFile && <div className={classes.checkbox}>
                        <p> Upload File</p>
                    </div>}
                    {douploadFile && <> <input className={classes['custom-file-input']} type="file" placeholder="flie"
                        onChange={fileChangeHandler}
                    ></input></>}
                    {isFlieToLinkLoading && <div className={classes.Loading}>Loading....</div>}


                    <br />
                    <div className={classes.buttons}>
                        <Button type="submit">Add Item</Button>
                        <Button type="button" onClick={addItemHandler}>Cancel</Button>
                    </div>
                    <hr></hr>
                    <br />
                </motion.form>}
            </AnimatePresence>
            {additem && <Button type="button" onClick={addItemHandler}>Add Item</Button>}
        </div>
    );
};

export default InputItem;