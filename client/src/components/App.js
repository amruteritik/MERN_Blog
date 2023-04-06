import React from "react";
import Addpost from "./Posts/post/Addpost"
import SinglepostDetails from "./Posts/post/SinglepostDetails";
import Post from "./Posts/Posts";
import PageNotFound from "./PageNotFound";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Header/Navbar";
import "./app.css"


function App() {

  
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Post />} />
        <Route exact path="/posts" element={<Navigate to="/" />} />
        <Route path="/posts/add" element={<Addpost />} />
        <Route path="/posts/:id" element={<SinglepostDetails  />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
