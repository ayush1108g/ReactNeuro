import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./studentSideBarModal.module.css";

function MemberSidebarModal(props) {
  const [students, setStudents] = useState([ ]);

  
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:4000/mentor/signup");
    //   console.log(response);
      setStudents(response.data.data.newmentorsignup);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  return (
    <div className={classes.sidebar} onClick={props.onChangeModal}>
      {
        <div className={classes.modal}>
          <div className={classes["modal-content"]}>
            <h2 className={classes["modal-title"]}>Member List</h2>
            <ul className={classes["student-list"]}>
              {students.map((student) => (
                <li key={student._id} className={classes["student-item"]}>
                  <strong>Name:</strong> {student.name}
                  <br />
                  <strong>Email:</strong> {student.emailid}
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

export default MemberSidebarModal;
