import React, { useState, useEffect } from "react";
import classes from "./SecondPage.module.css";
import InputItem from "../Input/InputItem";
import CourseGoalList from "../Input/CourseGoalList";
import axios from "axios";

const SecondPage = (props) => {
  const [courseGoals, setCourseGoals] = useState([
    {
      heading: "abc",
      content: "Do all exercises!",
      contentLink: "www.google.com",
      id: "g1",
    },
    {
      heading: "abx",
      content: "Finish the course!",
      contentLink: "http://www.google.com",
      id: "g2",
    },
  ]);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/data/resources"
        );
        console.log(response.data.data.newresources);
        const data = response.data.data.newresources;
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    //     setCourseGoals((prevGoals) => {
    //       const updatedGoals = [...prevGoals];
    //       updatedGoals.unshift(data.items.map(item =>(
    //         heading : item.title,
    //         content : item.description,
    //         contentLink :item.url ,
    //         id: Math.random().toString(),
    //       ));
    //       return updatedGoals;
    //     });
    fetchResource();
  }, []);

  const addContentHandler = async (enteredContent) => {
    const body = {
      title: enteredContent.heading,
      description: enteredContent.content,
      url: enteredContent.contentLink,
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
    console.log(courseGoals.length);
    console.log(courseGoals);
  };

  const deleteItemHandler = (goalId) => {
    setCourseGoals((prevGoals) => {
      const updatedGoals = prevGoals.filter((goal) => goal.id !== goalId);
      return updatedGoals;
    });
  };

  let content = (
    <p style={{ textAlign: "center" }}>No goals found. Maybe add one?</p>
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
          <div className={classes["content-container"]}>
            {content}
            {/* <Card>
                            <h2>Welcome to our Website</h2>
                            <p>This is some example content on the left side.This is some example content on the left side.</p>

                        </Card><Card>
                            <h2>Welcome to our Website</h2>
                            <p>This is some example content on the left side.</p>
                            <p>This is some example content on the left side.</p>
                        </Card><Card>
                            <h2>Welcome to our Website</h2>
                            <p>This is some example content on the left side.</p>
                            <p>This is some example content on the left side.</p>
                        </Card><Card>
                            <h2>Welcome to our Website</h2>
                            <p>This is some example content on the left side.</p>
                            <p>This is some example content on the left side.</p>
                        </Card><Card>
                            <h2>Welcome to our Website</h2>
                            <p>This is some example content on the left side.</p>
                            <p>This is some example content on the left side.</p>
                        </Card> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SecondPage;
