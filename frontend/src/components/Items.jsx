import React, { useState } from 'react';
import classes from './ItemList.module.css';
import { motion } from 'framer-motion';
import Button from '../UI/Button';
import Card from '../UI/Card';

const Items = (props) => {
    const [delConfirm, setDelConfirm] = useState(false);

    const deleteHandler = () => {
        props.onDelete(props.id);
    };

    const deleteConfirmHandler = () => {
        setDelConfirm(!delConfirm);
    };

    return (
        <React.Fragment>
            <Card className={classes.ccard}>
                {delConfirm && (
                    <div>
                        <Button onClick={deleteHandler}>Confirm</Button>
                        <Button onClick={deleteConfirmHandler}>Cancel</Button>
                    </div>
                )}
                {!delConfirm && props.memSignInstate && (
                    <Button onClick={deleteConfirmHandler}>Delete</Button>
                )}
                <motion.li
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ y: -30, opacity: 0 }}
                    transition={{ duration: 1 }}
                    className={classes["goal-item"]}
                >
                    {props.children}
                </motion.li>
            </Card>
            <br />
        </React.Fragment>
    );
};

export default Items;
