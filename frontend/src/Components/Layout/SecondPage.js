import React, { useState, useEffect } from "react";
import classes from "./SecondPage.module.css";
import InputItem from "../Input/InputItem";
import CourseGoalList from "../Input/CourseGoalList";
import axios from "axios";

const SecondPage = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errormsg, setErrormsg] = useState("");
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
        setIsLoading(true);
        const response = await axios.get("http://localhost:4000/data/resources");
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
        setErrormsg('');
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching Resource:", error);
        setErrormsg('Error fetching Resource');
      }
      setIsLoading(false);
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

  const deleteItemHandler = async (goalId) => {
    console.log(goalId);
    try{
    const delRequest = await axios.delete(`http://localhost:4000/data/resources/${goalId}`);
    setCourseGoals((prevGoals) => {
      const updatedGoals = prevGoals.filter((goal) => goal.id !== goalId);
      return updatedGoals;
    });
  }catch(error){
    console.log(error);
  }
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
      <div className={classes.allcontent}>
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
          <div>
            {!isLoading && <p className={classes.loading}> {errormsg}</p>}
            {
              isLoading && <section >
                <p className={classes.loading}>Loading...</p>
              </section>
            }
          </div>
          {!isLoading && <div className={classes["content-container"]}>
            {content}
          </div>}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SecondPage;
