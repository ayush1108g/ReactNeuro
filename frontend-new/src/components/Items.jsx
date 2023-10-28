import React from 'react';
import classes from './ItemList.module.css';
import { motion } from 'framer-motion';
import Card from '../UI/Card';
import { useNavigate } from 'react-router';

const Items = (props) => {
    const navigate = useNavigate();
   
    const resourceHandler = () => {
        navigate(`${props.id}`);
    }

    return (
        <React.Fragment>
            <Card className={classes.ccard}>
                <motion.li
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ y: -30, opacity: 0 }}
                    transition={{ duration: 1 }}
                    className={classes["goal-item"]}
                    onClick={resourceHandler}
                >
                    {props.children}
                </motion.li>
            </Card>
            <br />
        </React.Fragment>
    );
};

export default Items;
