import "./App.css";
import Navebar from "./components/Navebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import Alert from "./components/Alert";
import ContextBlog from "./contextAPI/ContextBlog";

function App() {
  
  return (
    <>
      <ContextBlog>
        <Router>
          <div className="fixed-top">
            <Navebar />
            <Alert />
          </div>
          <div
            className="container"
            style={{ marginTop: "9vh", marginBottom: "11vh" }}
          >
            <Routes>
              <Route exact path="/" element={<Home  />} />
              <Route
                exact
                path="/login"
                element={<Login />}
              />
              <Route
                exact
                path="/signup"
                element={<Signup />}
              />
              <Route
                exact
                path="/profile"
                element={<Profile />}
              />
            </Routes>
          </div>
          <div className="fixed-bottom">
            <Footer />
          </div>
        </Router>
      </ContextBlog>
    </>
  );
}

export default App;
