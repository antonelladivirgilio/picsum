import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

// Styles
import "./styles.css";

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardContent, CardActions, Button, Typography, Hidden, CircularProgress } from '@material-ui/core';

// Utils
import { getRandomInt } from './utils/index';

function App() {
  const [loading, setLoading] = useState(true);
  const [imageId, setImageId] = useState(1);
  const [imageAuthor, setImageAuthor] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setImageId(getRandomInt(1, 100));
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
      <Typography variant="h3" component="h1" gutterBottom>
        Lorem Picsum
      </Typography>
      {
        loading ? <CircularProgress /> :
          <Card className={classes.card}>
            <CardMedia
              component="img"
              height="240"
              image={`https://picsum.photos/id/${imageId}/1024/768`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2" paragraph>
                {imageAuthor}
              </Typography>
            </CardContent>
          </Card>
      }
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
