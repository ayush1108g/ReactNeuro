import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./studentSideBarModal.module.css";
import { ToLink } from "../../Contents/Main";

function StudentSidebarModal(props) {
  const [students, setStudents] = useState([ ]);

  
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${ToLink}/student/signup`);
     // console.log(response.data.data.newstudentsignup);
      setStudents(response.data.data.newstudentsignup);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  return (
    <div className={classes.sidebar} onClick={props.onChangeModal}>
      {
        <div className={classes.modal}>
          <div className={classes["modal-content"]}>
            <h2 className={classes["modal-title"]}>Student List</h2>
            <ul className={classes["student-list"]}>
              {students.map((student) => (
                <li key={student._id} className={classes["student-item"]}>
                  <strong>Name:</strong> {student.name}
                  <br />
                  <strong>Email:</strong> {student.emailid}
                  {props.memSignInstate && 
                    <React.Fragment><br />
                    <strong>Phone:</strong> {student.phoneno}
                    </React.Fragment>}
                </li>
              ))}
            </ul>
            <button
              className={classes["close-button"]}
              onClick={props.onChangeModal}
            >
              Close
            </button>
          </div>
        </div>
      }
    </div>
  );
}

export default StudentSidebarModal;
