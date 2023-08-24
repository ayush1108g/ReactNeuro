import React, { useState, useEffect } from "react";
import classes from "./SecondPage.module.css";
import InputItem from "../Input/InputItem";
import CourseGoalList from "../Input/CourseGoalList";
import axios from "axios";

const SecondPage = (props) => {
  const [courseGoals, setCourseGoals] = useState([
    {
      heading: '',
      content: '',
      contentLink: '',
      id: '',
    }
  ]);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/data/resources"
        );
        const data = response.data.data.newresources;
        const loadedResourse = [];
        for (const key in data) {
          loadedResourse.push({
            heading: data[key].title,
            content: data[key].description,
            contentLink: data[key].url,
            id: data[key]._id,
          })
        }
        setCourseGoals(loadedResourse);
      } catch (error) {
        console.error("Error fetching Resource:", error);
      }
    };
    fetchResource();
  }, []);

  const addContentHandler = async (enteredContent) => {
    const body = {
      title: enteredContent.heading,
      description: enteredContent.content,
      url: enteredContent.contentLink,
      id: enteredContent.id,
    };
    const resp = await axios.post("http://localhost:4000/data/resources", body);
    // const data = await newStudentsignup.json();
    console.log(resp.data);

    setCourseGoals((prevGoals) => {
      const updatedGoals = [...prevGoals];
      updatedGoals.unshift({
        heading: enteredContent.heading,
        content: enteredContent.content,
        contentLink: enteredContent.contentLink,
        id: Math.random().toString(),
      });
      return updatedGoals;
    });
  };

  const deleteItemHandler = (goalId) => {
    setCourseGoals((prevGoals) => {
      const updatedGoals = prevGoals.filter((goal) => goal.id !== goalId);
      return updatedGoals;
    });
  };

  let content = (
    <p style={{ textAlign: "center" }}>No Resources found.</p>
  );

  if (courseGoals.length > 0) {
    content = (
      <CourseGoalList
        items={courseGoals}
        memSignInstate={props.memSignInstate}
        onDeleteItem={deleteItemHandler}
      />
    );
  }

  return (
    <React.Fragment>
      <div>
        <div className={classes.btnbody}>
          <button
            className={classes["back-button"]}
            onClick={props.backHandler}
          >
            Home
          </button>
        </div>

        <div className={classes["page-container"]}>
          {props.memSignInstate && (
            <InputItem onAddContent={addContentHandler} />
          )} 
          <div className={classes.heading}><i>Resources</i></div>
          <div className={classes["content-container"]}>
            {content}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SecondPage;
