import React, { useEffect, useState } from "react";
import Header from "../../common/header/Header";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import "./Details.css";
import YouTube from "react-youtube";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";

const Content = (props) => {
  // Declare state variables
  const [movieData, setMovieDetail] = useState({});
  const [ytData, setYTDetail] = useState("");
  const [genreData, setGenreDetail] = useState("");
  const [dateData, setDateDetail] = useState("");
  const [artistData, setArtistDetail] = useState([]);

  // function to get movie
  async function load() {
    const rawResponse = await fetch(
      props.baseUrl + "movies/" + props.match.params.id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      }
    );

    // Handling response
    const data = await rawResponse.json();
    setYTDetail(data.trailer_url.split("=")[1]);
    setGenreDetail(data.genres.join(", "));
    setDateDetail(new Date(data.release_date).toDateString());
    setArtistDetail(data.artists);
    setMovieDetail(data);
  }

  useEffect(() => {
    load();
  }, []);

  return (
<div className="details">
        <div className="leftSection">
          <img src={movieData.poster_url} alt={movieData.title} className="poster"/>
        </div>
        <div className="centerSection">
          <Typography variant="headline" component="h2">
            {movieData.title}
          </Typography>
          <br />
          <Typography>
            <b>Genre:</b> {genreData}
          </Typography>
          <br />
          <Typography>
            <b>Duration:</b> {movieData.duration}
          </Typography>
          <br />
          <Typography>
            <b>Release Date:</b> {dateData}
          </Typography>
          <br />
          <Typography>
            <b>Rating:</b> {movieData.rating}
          </Typography>
          <br />
          <Typography className="plot">
            <b>Plot:</b> ( <a href={movieData.wiki_url}>Wiki Link</a>){" "}
            {movieData.storyline}
          </Typography>
          <br />
          <Typography className="trailer">
            <b>Trailer:</b>
          </Typography>
          <br />
          <YouTube videoId={ytData} className="player" />
        </div>
        <div className="rightSection">
          <Typography>
            <b>Rate this movie:</b>
            <br />
          </Typography>
          <StarBorderOutlinedIcon className="hover-star" />
          <StarBorderOutlinedIcon className="hover-star" />
          <StarBorderOutlinedIcon className="hover-star" />
          <StarBorderOutlinedIcon className="hover-star" />
          <StarBorderOutlinedIcon className="hover-star" />
          <Typography className="artist">
            <b>Artists:</b>
            <br />
          </Typography>
          <GridList cols={2} style={{margin:"2px"}}>
            {artistData.map((artist) => (
              <GridListTile key={artist.id}>
                <img
                  src={artist.profile_url}
                  alt={`${artist.first_name} ${artist.last_name}`}
                />
                <GridListTileBar
                  title={`${artist.first_name} ${artist.last_name}`}
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </div>
  );
};

const Details = function (props) {
  return (
    <div>
      <Header loggedIn={props.loggedIn}  loggedInChanged={props.loggedInChanged} BookShowVisible={true} id={props.match.params.id}/>
      <Link to={"/"} className="link">
        <Typography className="back">&#60; Back to Book Show</Typography>
      </Link>
      <Content {...props} />
    </div>
  );
};

export default Details;
