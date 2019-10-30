import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

// Styles
import "./styles.css";

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardContent, CardActions, Button, Typography, Hidden, CircularProgress } from '@material-ui/core';


function App() {
  const [loading, setLoading] = useState(true);
  const [imageId, setImageId] = useState(1);
  const [imageAuthor, setImageAuthor] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setImageId(Math.floor(Math.random() * (1000 + 1)));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const imageInfoUrl = `https://picsum.photos/id/${imageId}/info`;

    const authorPromise = fetch(imageInfoUrl).then(response => response.json());

    authorPromise.then((response) => {
      setImageAuthor(response.author);
      setLoading(false);
    });
  }, [imageId]);

  const useStyles = makeStyles({
    card: {
      maxWidth: 345,
    },
  });

  const classes = useStyles();

  return (
    <div className="App">
      <h1>Lorem Picsum</h1>
      {
        loading ? <CircularProgress /> :
          <Card className={classes.card}>
            <CardMedia
              component="img"
              height="240"
              image={`https://picsum.photos/id/${imageId}/1024/768`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {imageAuthor}
              </Typography>
            </CardContent>
          </Card>
      }

      <style>{`
        .image-container {
          background-image: url('https://picsum.photos/id/${imageId}/1024/768');         
          width: 100%;
          min-height: 400px;
          background-size: cover;
          background-position: 50%;
          display: flex;
          align-items: flex-end;
        }

        .image-author {
          margin: 0;
          padding: 10px;
          background-color: #000;
          color: #fff;
        }
      `}</style>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
