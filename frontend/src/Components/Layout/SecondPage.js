import React, { useState, useEffect } from "react";
import classes from "./SecondPage.module.css";
import InputItem from "../Input/InputItem";
import CourseGoalList from "../Input/CourseGoalList";
import axios from "axios";
import { ToLink } from "../Contents/Main";

const SecondPage = (props) => {
  const [dataAddedSuccess, setDataAddedSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  const [resourceChanged, setResourceChanged] = useState(false);
  const [courseGoals, setCourseGoals] = useState([
    {
      heading: "",
      content: "",
      contentLink: "",
      id: "",
    },
  ]);

  //const token = props.token;
  // console.log(token);
  useEffect(() => {
    const fetchResource = async () => {
      try {
        setIsLoading(true);
        // const options = { headers: { "Authorization": "Bearer " + token, }, };
        const response = await axios.get(`${ToLink}/data/resources`, { timeout: 20000 });
        const data = response.data.data.newresources;
        const loadedResourse = [];
        for (const key in data) {
          loadedResourse.push({
            heading: data[key].title,
            content: data[key].description,
            contentLink: data[key].url,
            id: data[key]._id,
          });
        }
        setCourseGoals(loadedResourse);
        setErrormsg("");
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching Resource:", error);
        setErrormsg("Error fetching Resource");
      }
      setIsLoading(false);
    };
    fetchResource();
  }, [resourceChanged]);


  const addContentHandler = async (enteredContent) => {
    const body = {
      title: enteredContent.heading,
      description: enteredContent.content,
      url: enteredContent.contentLink,
      id: enteredContent.id,
    };
    try {
      const resp = await axios.post(`${ToLink}/data/resources`, body);
      console.log(resp.data);

      if (resp.data.status === 'success') {
        alert("Resource added successfully");
        setDataAddedSuccess(true);
        setResourceChanged(!resourceChanged);
        // setCourseGoals((prevGoals) => {
        //   const updatedGoals = [...prevGoals];
        //   updatedGoals.unshift({
        //     heading: enteredContent.heading,
        //     content: enteredContent.content,
        //     contentLink: enteredContent.contentLink,
        //     id: Math.random().toString(),
        //   });

        //   return updatedGoals;
        // });
      }
    }
    catch (error) {
      setDataAddedSuccess(false);
      console.log(error);
      // console.log(error.config);
      if (error.message === 'Network Error')
        setErrormsg(error.message);
      else if (error.code === "ERR_NETWORK") {
        alert("Server Not Responding");
      }
    }
  };

  const deleteItemHandler = async (goalId) => {
    //console.log(goalId);
    try {
      const delRequest = await axios.delete(`${ToLink}/data/resources/${goalId}`);
      // console.log(delRequest);
      if (delRequest.status === 201) {
        setResourceChanged(!resourceChanged);

        // setCourseGoals((prevGoals) => {
        //   const updatedGoals = prevGoals.filter((goal) => goal.id !== goalId);
        //   return updatedGoals;
        // });
        alert("Resource deleted successfully");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 404) {
        alert("Some Error occurred");
      }
    }
  };

  let content = <p style={{ textAlign: "center" }}>No Resources found.</p>;

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
        {/* <div className={classes.btnbody}>
          <button
            className={classes["back-button"]}
            onClick={props.backHandler}
          >
            Home
          </button>
        </div> */}

        <div className={classes["page-container"]}>

          {props.memSignInstate && (
            <InputItem onAddContent={addContentHandler} dataAddedSuccess={dataAddedSuccess} />
          )}
          {!isLoading && <p className={classes.loading}> {errormsg}</p>}
          <div className={classes.heading}>
            <i>Resources</i>
          </div>
          <div>

            {isLoading && (
              <section>
                <p className={classes.loading}>Loading...</p>
              </section>
            )}
          </div>
          {!isLoading && (
            <div className={classes["content-container"]}>{content}</div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SecondPage;
