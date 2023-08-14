import './App.css';
import Header from './Components/Layout/Header';
import Navbar from './Components/Layout/Navbar';
import StudentLogin from './Components/Login/Student/StudentLogin';
import MemberLogin from './Components/Login/Member/MemberLogin';
import Login from './Components/Login/Login';

function App() {
  return (
    <div className="App">
     <Login />
     <Header />
     
    </div>
  );
}

export default App;
