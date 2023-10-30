
import Signin from "../components/Signin";
// import { useNavigate } from "react-router";
const LoginPage = () => {
  // const navigate = useNavigate();
//   setTimeout(() => {
//   const isLoggedin = localStorage.getItem("isLoggedIn");
//   console.log(isLoggedin);
//   if (isLoggedin === '1') {
//     navigate("/");
//   }
// }, 100);
  return (
    <div
      className="d-flex justify-content-center align-items-center flex-nowrap"
      style={{ height: "90vh" }}
    >
      <Signin pagename={"Login"} />
    </div>
  );
};
export default LoginPage;
