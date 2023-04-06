import React from "react";
import "./singlepostdetails.css";
import {  IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate,useLocation} from "react-router-dom"
import axios from "../../axios.js";  




function SinglepostDetails() {
  const state = useLocation().state;
  const navigate = useNavigate();
      
     const toggleDelete = () => {
      axios.delete(`/${state._id}`);
      navigate("/");
     }

  return (
    <div className="box">
      <div className="head">
        <h1>{state.title}</h1>
        <h3>Posted on : {state.time}</h3>
        <div className="verticon">
       
          <IconButton>
            <DeleteIcon onClick={toggleDelete} />
          </IconButton>
        </div>
        <div className="post">
          <img
            src={state.image}
            alt="img"
          />
          <div className="content">
            {state.content}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglepostDetails;
