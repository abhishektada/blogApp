import context from "./context";
import { useState } from "react";

const ContextBlog = (props) => {
  const [alert, setAlert] = useState(null);
  const [userBlog, setUserBlog] = useState([]);
  const [user, setUser] = useState({});

  const showAlert = (massage, type) => {
    setAlert({
      msg: massage,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const loadBlog = async () => {
    const user = localStorage.getItem("blogToken");
    const response = await fetch("http://localhost:5000/blog/getblog", {
      method: "GET",
      headers: { "Content-Type": "application/json", "auth-token": user },
    });
    const res = await response.json();
    if (res.success) {
      setUserBlog(res.getblog);
      setUser(res.user);
    } else {
      alert("Internel server error");
    }
  };

  const deleteEndPoint = async (id) => {
    const user = localStorage.getItem("blogToken");
    const response = await fetch(
      `http://localhost:5000/blog/deleteblog/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": user,
        },
      }
    );
    const res = await response.json();
    if (res.success) {
      console.log(res.deleteblog);
      const deletedBlog = userBlog.filter((blog) => {
       return blog._id !== id;
      });
      setUserBlog(deletedBlog);
      showAlert("Blog deleted Successfully.", "success");
    } else {
      showAlert("Internel server error", "danger");
    }
  };

  const createBlog = async (blog) => {
    const user = localStorage.getItem("blogToken");
    const response = await fetch("http://localhost:5000/blog/createblog", {
      method: "POST",
      headers: { "Content-Type": "application/json", "auth-token": user },
      body: JSON.stringify(blog),
    });
    const res = await response.json();
    if (res.success) {
        console.log(res.creatBlog)
        setUserBlog([...userBlog,res.creatBlog])
      showAlert("Blog created Successfully.", "success")
    } else {
      showAlert( res.error, "danger")
    }
  };

  return (
    <context.Provider
      value={{
        userBlog,
        alert,
        user,
        deleteEndPoint,
        createBlog,
        loadBlog,
        showAlert,
      }}
    >
      {props.children}
    </context.Provider>
  );
};

export default ContextBlog;