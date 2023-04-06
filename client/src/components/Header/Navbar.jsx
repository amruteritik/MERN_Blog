import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

function Header() {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <LibraryBooksIcon className="icon" />
            Blog
          </Link>
          <div className="nav-links">
            <Link to="/posts/add">
              <h1 className="nav-item">Add Post</h1>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
