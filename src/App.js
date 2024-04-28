import React, { useRef, useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../src/redux/slice/imageSlice";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Navbar from "./components/navBar/NavBar";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const images = useSelector((state) => state.data.entities);
  const loading = useSelector((state) => state.data.loading);
  const error = useSelector((state) => state.data.error);
  const page = useRef(1);

  const handleStateChange = (newState) => {
    setValue(newState);
  };

  const loadMoreImages = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 1 &&
      loading !== "pending"
    ) {
      page.current++;
      dispatch(fetchData({ query: value, page: page.current }));
    }
  }, [dispatch, loading, value]);

  useEffect(() => {
    window.addEventListener("scroll", loadMoreImages);

    return () => {
      window.removeEventListener("scroll", loadMoreImages);
    };
  }, [loadMoreImages]);

  return (
    <div>
      <Navbar onChange={handleStateChange} />

      {images && images.results.length > 0 && (
        <div
          style={{
            marginBottom: "20px",
            marginRight: "30px",
            marginLeft: "50px",
          }}
        >
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 600: 1, 800: 2, 1100: 3 }}
          >
            <Masonry gutter="20px">
              {images.results.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image.urls.small} alt={image.title || "Image"} />
                </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
          {loading === "pending" && (
            <div className="spinner-container">
              <div className="spinner"></div> {/* Here's the spinner */}
            </div>
          )}
        </div>
      )}

      {loading === "succeeded" && (!images || images.results.length === 0) && (
        <p>No images to display</p>
      )}

      {loading === "failed" && <p>Error loading images: {error.toString()}</p>}
    </div>
  );
};

export default App;
