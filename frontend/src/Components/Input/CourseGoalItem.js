import React from 'react';

import classes from './CourseGoalItem.module.css'
import Button from '../UI/Button';
import Card from '../UI/Card';

const CourseGoalItem = props => {
  const deleteHandler = () => {
    props.onDelete(props.id);
  };

  return (
    <React.Fragment>

      <Card className={classes.ccard}>
        {props.memSignInstate && <Button onClick={deleteHandler} >Delete</Button>}
        <li className={classes["goal-item"]} >
          {props.children}
        </li>
      </Card>
    </React.Fragment>
  );
};

export default CourseGoalItem;
