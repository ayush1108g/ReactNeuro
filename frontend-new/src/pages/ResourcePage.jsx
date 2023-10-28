import React, { useState, useEffect } from "react";
import classes from "./ResourcePage.module.css";
import InputItem from "../components/InputItem";
import axios from "axios";
import { ToLink } from "../App";
import { AnimatePresence } from "framer-motion";
import ItemList from "../components/ItemList";
const ResourcePage = () => {
    const [dataAddedSuccess, setDataAddedSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errormsg, setErrormsg] = useState("");
    const [resourceChanged, setResourceChanged] = useState(false);
    const [issendLoading, setIsSending] = useState(false);
    const [courseGoals, setCourseGoals] = useState([
        {
            heading: "",
            content: "",
            contentLink: "",
            id: "",
        },
    ]);
    const role = localStorage.getItem("role");
    const memSignInstate = role === "mentor#code" ? true : false;
    useEffect(() => {
        const fetchResource = async () => {
            try {
                setIsLoading(true);
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
            setIsSending(true);
            const resp = await axios.post(`${ToLink}/data/resources`, body);
            console.log(resp.data);

            if (resp.data.status === 'success') {
                alert("Resource added successfully");
                setDataAddedSuccess(true);
                setResourceChanged(!resourceChanged);
            }
        } catch (error) {
            setDataAddedSuccess(false);
            console.log(error);
            if (error.message === 'Network Error')
                setErrormsg(error.message);
            else if (error.code === "ERR_NETWORK") {
                alert("Server Not Responding");
            }
        }
        setIsSending(false);
    };
  
    let content = <p style={{ textAlign: "center" }}>No Resources found.</p>;

    if (courseGoals.length > 0) {
        content = (
            <ItemList
                items={courseGoals}
            />
        );
    }

    return (
        <React.Fragment>
            <div className={classes.allcontent}>
                <div className={classes["page-container"]}>
                    <AnimatePresence >
                        {memSignInstate && (
                            <InputItem onAddContent={addContentHandler} dataAddedSuccess={dataAddedSuccess} />
                        )}
                    </AnimatePresence>
                    {issendLoading && <div className="spinner-border" role="status">
                        {/* <span className="sr-only">Sending...</span> */}
                    </div>}
                    {!isLoading && <p className={classes.loading}> {errormsg}</p>}
                    <div className={classes.heading}>
                        <i>Resources</i>
                    </div>
                    <div>
                        {isLoading && (
                            <section>
                                <div className="spinner-border" role="status">
                                    {/* <span className="sr-only">Loading...</span> */}
                                </div>
                            </section>
                        )}
                    </div>
                    <AnimatePresence>
                        {!isLoading && (
                            <div className={classes["content-container"]}>{content}</div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ResourcePage;