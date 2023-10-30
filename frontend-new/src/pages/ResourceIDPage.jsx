import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { ToLink } from "../App";
// import Card from "../UI/Card";
import Button from "../UI/Button";
import { Navigate } from "react-router";
import { motion } from "framer-motion";
import classes from './ResourceiDPage.module.css';

const ResourceIDPage = () => {
    const navigate = useNavigate();
    const [dataAdd, setDataAdd] = useState([]);
    const [errormsg, setErrormsg] = useState("");
    const [delConfirm, setDelConfirm] = useState(false);
    const [resourceChanged, setResourceChanged] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const role = localStorage.getItem("role");
    const memSignInstate = role === "mentor#code" ? true : false;

    useEffect(() => {
        const fetchResource = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${ToLink}/data/resources/`, { timeout: 20000 });
                const data = response.data.data.newresources;
                const loadedResource = data.filter(item => item._id === id);
                if(loadedResource.length === 0) {
                    setErrormsg("Resource not found"); 
                    setIsLoading(false);
                    return;
                }
                setDataAdd(loadedResource[0]);
                setResourceChanged(true);
                setErrormsg("");
            } catch (error) {
                setIsLoading(false);
                console.error("Error fetching Resource:", error);
                setErrormsg("Error fetching Resource");
                setResourceChanged(false);
            }
            setIsLoading(false);
        };
        fetchResource();
    }, [resourceChanged, id])


    if (errormsg === "Resource not found") {
        return <Navigate to={`/*?error=Resource%20not%20found`} />;
    }

    const deleteItemHandler = async (ID) => {
        try {
            const delRequest = await axios.delete(`${ToLink}/data/resources/${ID}`);
            if (delRequest.status === 201) {
                setErrormsg("Resource deleted successfully");
                navigate('/resources');
            }
        } catch (error) {
            console.log(error);
            if (error.response.status === 404) {
                setErrormsg("Some Error occurred");
            }
        }
    };

    const deleteHandler = (dataAdd) => {
        deleteItemHandler(dataAdd._id)
    };

    const deleteConfirmHandler = () => {
        setDelConfirm(!delConfirm);
    };

    const animateVariants = {
        show: {
            scale: [15, 0],
            transition: {
                times: [0, 1],
                ease: "easeInOut",
                duration: 0.5,
            },
        },
        hide: {
            scale: 0,
        },
        exit: {
            scale: [0, 15],
            transition: {
                times: [0, 1],
                ease: "easeInOut",
                duration: 0.5,
            },
        },
    };

    return (
        <>

            {resourceChanged &&
                <div className="d-flex justify-content-center align-items-center " style={{ height: '100vh', padding: '20vw' }} >
                    {/* <Card> */}
                        <div className={classes.BOX}>
                            {delConfirm && (
                                <div>
                                    <Button onClick={() => deleteHandler(dataAdd)}>Confirm</Button>
                                    <Button onClick={deleteConfirmHandler}>Cancel</Button>
                                </div>
                            )}
                            {!delConfirm && memSignInstate && (
                                <Button onClick={deleteConfirmHandler}>Delete</Button>
                            )}
                            {isLoading && <div className="spinner-border" role="status">
                                {/* <span className="sr-only">Sending...</span> */}
                            </div>}
                            {!isLoading && <p style={{ color: 'red' }}> {errormsg}</p>}

                            <motion.div
                                variants={animateVariants}
                                animate="show"
                                exit="exit"
                                className={classes.box}
                            ></motion.div>
                            <h2>{dataAdd.title}</h2>
                            <p>{dataAdd.description}</p>
                            <a href={dataAdd.url}>Link</a>
                        </div>
                    {/* </Card> */}
                </div>
            }
        </>
    );
};
export default ResourceIDPage;