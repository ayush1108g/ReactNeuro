import React from 'react';
import classes from './ItemList.module.css'
import { motion } from 'framer-motion';
import Items from './Items';

const ItemList = (props) => {
   
    return (
            <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3 }}
                className={classes["goal-list"]}>
                {props.items.map(goal => (
                      <Items
                        key={goal.id}
                        id={goal.id}
                        // memSignInstate={props.memSignInstate}
                        // onDelete={props.onDeleteItem}
                      >
                        <h2>{goal.heading}</h2>
                        <a href={goal.contentLink} target='_blank' rel=" noopener noreferrer" >{goal.content}</a>
                      </Items>
                ))}
            </motion.ul>

    );
};

export default ItemList;
