import React from "react";
import {
  Typography,
} from "@material-ui/core";
import "./Details.css";
import YouTube from "react-youtube";

const MainDetails = (props) => {

  return (
      <div className="centerSection">
        <Typography variant="headline" component="h2">
          {props.movie.title}
        </Typography>
        <br />
        <Typography>
          <b>Genre:</b> {props.genre}
        </Typography>
        <br />
        <Typography>
          <b>Duration:</b> {props.movie.duration}
        </Typography>
        <br />
        <Typography>
          <b>Release Date:</b> {props.date}
        </Typography>
        <br />
        <Typography>
          <b>Rating:</b> {props.movie.rating}
        </Typography>
        <br />
        <Typography className="plot">
          <b>Plot:</b> ( <a href={props.movie.wiki_url}>Wiki Link</a>){" "}
          {props.movie.storyline}
        </Typography>
        <br />
        <Typography className="trailer">
          <b>Trailer:</b>
        </Typography>
        <br />
        <YouTube videoId={props.youtube} className="player" />
      </div>
  );
};

export default MainDetails;
