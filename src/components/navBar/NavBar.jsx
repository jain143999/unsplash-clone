import React, { useRef } from "react";
import { FaBars, FaSearch, FaCamera } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { FaBell } from "react-icons/fa";
import "./NavBar.css";
import { useDispatch } from "react-redux";
// import { fetchData } from "../src/redux/slice/imageSlice";
import { fetchData } from "../../redux/slice/imageSlice";
import image from "../../images/ms-icon.png";

const Navbar = ({ onChange }) => {
  const dispatch = useDispatch();
  const searchInput = useRef();
  const page = useRef(1);
  const handleSearch = () => {
    page.current = 1; // Reset to page 1 for new searches
    const query = searchInput.current.value;
    onChange(query);
    dispatch(fetchData({ query, page: page.current }));
  };
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <img src={image} alt="Logo" className="navbar-logo" />
        </div>
        <div className="navbar-search">
          <FaSearch className="search-icon" onClick={handleSearch} />
          <input
            ref={searchInput}
            type="text"
            placeholder="Search..."
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <FaCamera className="scan-icon" />
        </div>
      </div>
      <div className="navbar-ul-links-container">
        <ul
          className="navbar-ul-links"
          style={{ display: "flex", gap: "10px", flexDirection: "row" }}
        >
          <li>Advertise</li>
          <li>Blog</li>
          <li>Unsplash+</li>
        </ul>
      </div>
      <div className="navbar-links">
        {/* <a href="/login" className="navbar-link">
          Login
        </a> */}
        <button className="navbar-button">Submit a Photo</button>
      </div>
      <div className="navbar-toggle bell">
        <FaBell className="navbar-hamburger" />
      </div>
      <div className="navbar-toggle">
        <AiOutlineUser className="navbar-hamburger" />
      </div>
      <div className="navbar-toggle">
        <FaBars className="navbar-hamburger" />
      </div>
    </nav>
  );
};

export default Navbar;
