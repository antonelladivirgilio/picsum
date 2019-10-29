import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

// Styles
import "./styles.css";

function App() {
  const [imageUrlId, setImageUrlId] = useState(1);
  const [imageUrl, setImageUrl] = useState(
    `https://picsum.photos/id/${imageUrlId}/1024/768`
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setImageUrlId(imageUrlId => imageUrlId + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setImageUrl(`https://picsum.photos/id/${imageUrlId}/1024/768`);
  }, [imageUrlId]);

  useEffect(() => {
    console.log("imageUrl", imageUrl);

    fetch(imageUrl)
      .then(response => {
        return setImageUrl(response.url);
      })
      .catch(error => {
        console.log("Error getting image: ", error);
      });
  }, [imageUrl]);

  return (
    <div className="App">
      <h1>Lorem Picsum</h1>
      <div className="image-container" />
      <style>{`
        .image-container {
          background-image: url(${imageUrl});
          min-width: 150px;
          width: 100%;
          min-height: 200px;
          background-size: cover;
          background-position: 50%;
        }
      `}</style>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
