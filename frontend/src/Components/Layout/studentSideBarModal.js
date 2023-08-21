import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './studentSideBarModal.module.css';

function StudentSidebarModal(props) {
    const [students, setStudents] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
        // Add more students here
    ]);

    // useEffect(() => {
    //     fetchStudents();
    // }, []);

    // const fetchStudents = async () => {
    //     try {
    //         const response = await axios.get('/students');
    //         setStudents(response.data);
    //     } catch (error) {
    //         console.error('Error fetching students:', error);
    //     }
    // };



    return (
        <div className={classes.sidebar}>
           
            {(
                <div className={classes.modal}>
                    <div className={classes["modal-content"]}>
                        <h2 className={classes["modal-title"]}>Student List</h2>
                        <ul className={classes["student-list"]}>
                            {students.map((student) => (
                                <li key={student._id} className={classes["student-item"]}>
                                    <strong>Name:</strong> {student.name}
                                    <br />
                                    <strong>Email:</strong> {student.email}
                                </li>
                            ))}
                        </ul>
                        <button className={classes["close-button"]} onClick={props.onChangeModal}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default StudentSidebarModal;
