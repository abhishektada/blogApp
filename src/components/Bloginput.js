import React, { useState, useRef,useContext } from "react";
import context  from "../contextAPI/context";

export default function Bloginput(props) {
  const alertContext = useContext(context)
  const {createBlog} = alertContext
  
  const closeRef = useRef();
  const [blog, setBlog] = useState({
    topic: "",
    src: "",
    description: "",
  });

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if(value!=="0"){
      setBlog({ ...blog, [name]: value });
    }
  };

  const handleImageOnChange = async (e) => {
    const file = e.target.files[0];
    if(file){
      const src = await convertToBase64(file);
      setBlog({ ...blog, src: src });
    }else{
      setBlog({ ...blog, src: "" });
    }
  };


  const handleOnSubmit = async () => {
    closeRef.current.click();
    await createBlog(blog)
    setBlog({ ...blog, topic: "", description: "" });
  };

  const handleCrossIcon = () => {
    setBlog({ ...blog, topic: "", description: "" });
  };


  return (
    <div>
      {/* Header */}
      <div className="modal-header mb-3">
        <h5 className="modal-title" id="exampleModalLabel">
          Create Blog
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={handleCrossIcon}
        ></button>
      </div>

      {/* Input */}
      <div className="col-12 mb-4">
        <label className="form-label" htmlFor="topic">
          Topic
        </label>
        <select
          className="form-select"
          id="topic"
          name="topic"
          value={blog.topic}
          onChange={handleOnChange}
        >
          <option value="0">Choose...</option>
          <option value="sports">Sports</option>
          <option value="science">Science</option>
          <option value="teaching">Teaching</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="src" className="form-label">
          Select Image
        </label>
        <input
          className="form-control"
          type="file"
          id="src"
          accept=".jpeg, .png, .jpg"
          onChange={handleImageOnChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          value={blog.description}
          onChange={handleOnChange}
          rows="3"
        ></textarea>
      </div>

      {/* Footer */}
      <div className="modal-footer">
        <button
          ref={closeRef}
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Close
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleOnSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
}

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
