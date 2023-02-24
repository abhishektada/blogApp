import React, { useContext, useEffect } from "react";
import Blogcard from "./Blogcard";
import Bloginput from "./Bloginput";
import context from "../contextAPI/context";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const contextBlog = useContext(context);
  const { loadBlog, userBlog, user } = contextBlog;

  const saveToServer = () => {
    loadBlog();
  };

  useEffect(() => {
    if (localStorage.getItem("blogToken")) {
      loadBlog();
    } else {
      navigate("./login");
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div className="">
      <div className="text-center">
        {/* <!-- Button trigger modal --> */}
        <button
          type="button"
          className="btn btn-primary fw-bold mt-4 py-2"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Create Your Blog
        </button>
        <hr className="text-white border" />

        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <Bloginput saveToServer={saveToServer} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container row">
        {userBlog === []
          ? "Please create blog"
          : userBlog.map((blog) => {
              return (
                <div
                  key={blog._id}
                  className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-4 my-3"
                >
                  <Blogcard blog={blog} user={user} />
                </div>
              );
            })}
      </div>
    </div>
  );
}
