import React from "react";
import "./addpost.css";
import axios from "../../axios.js";  
import { useNavigate } from 'react-router-dom';


function Addpost() {

  const navigate = useNavigate();

  function date() {
    let date = new Date();
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  }

  const handleOnSubmit = (e) => {
    console.log(e.target.postName.value);
    e.preventDefault();
    axios.post("/", {
      title: e.target.postName.value,
      content: e.target.content.value,
      image: e.target.myfile.value,
      time: date(),
    }).then(
      navigate("/")
    );

  }

  return (
    <div className="addbox">
      <h1>Add New Post</h1>
      <form className="form" encType="multipart/form-data" enctype="multipart/form-data" onSubmit={handleOnSubmit}>
        <input
          type="text"
          name="postName"
          id="postName"
          placeholder="Enter Title"
        ></input>
        <br></br>
        <input type="text" id="myfile" name="myfile" placeholder="Enter Link of the Image"></input>
        <br></br>
        <textarea
          id="content"
          name="content"
          rows="6"
          cols="50"
          placeholder="Description"
        ></textarea>
        <br></br>
        <button type="submit">Submit Data</button>
      </form>
    </div>
  );
}

export default Addpost;
