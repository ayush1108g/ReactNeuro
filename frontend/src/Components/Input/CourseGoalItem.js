import React, { useState } from 'react';

import classes from './CourseGoalItem.module.css'
import Button from '../UI/Button';
import Card from '../UI/Card';

const CourseGoalItem = props => {
  const [delConfirm, setDelConfirm] = useState(false);

  const deleteHandler = () => {
    props.onDelete(props.id);
  //  console.log(props.id);
  };
  const deleteConfirmHandler = () => {
    setDelConfirm(!delConfirm);
  }
  return (
    <React.Fragment>

      {<Card className={classes.ccard}>
        {delConfirm && <div><Button onClick={deleteHandler} >Confirm</Button>
          <Button onClick={deleteConfirmHandler} >Cancel</Button>
        </div>}
        {!delConfirm && props.memSignInstate && <Button onClick={deleteConfirmHandler} >Delete</Button>}
        <li className={classes["goal-item"]} >
          {props.children}
        </li>
      </Card>}
      <br />

    </React.Fragment>
  );
};

export default CourseGoalItem;
