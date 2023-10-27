import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import ForgotPassPage from "./pages/ForgotPass/ForgotPassPage";
import ForgotPassIDPage from "./pages/ForgotPass/ForgotPassIDPage";
import ForgotPassConfirmPage from "./pages/ForgotPass/ForgotPassConfirmPage";
import ResourcesPage from "./pages/ResourcePage";
import { Route, Routes, useLocation, HashRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import ContactUsPage from "./pages/ContactUsPage";
import Errorpage from "./pages/Errorpage";
import SidebarContextProvider from "./store/sidebarContextProvider";
export const ToLink = "https://neuroproject.onrender.com";
// export const ToLink = "http://localhost:3000";

function RoutesWithAnimation() {
  const location = useLocation();
  console.log(location);
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.key}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/forgotpassword" element={<ForgotPassPage />} />
        <Route
          path="/login/forgotpassword/:id"
          element={<ForgotPassIDPage />}
        />
        <Route
          path="/login/forgotpassword/:id/confirm"
          element={<ForgotPassConfirmPage />}
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/contactUs" element={<ContactUsPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </AnimatePresence>
  );
}
function App() {
  return (
    <HashRouter>
      <SidebarContextProvider>
        <Navbar />
        <RoutesWithAnimation />
      </SidebarContextProvider>
    </HashRouter>
  );
}

export default App;
