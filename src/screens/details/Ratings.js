import React, { useState } from "react";
import { Typography, IconButton } from "@material-ui/core";
import "./Details.css";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";

const RatingButton = function(props) {
    return (
        <IconButton
        type="button"
        key={props.index}
        style={{backgroundColor: 'transparent', color:`${props.index <= props.rating ? "yellow" : props.index <= props.hover ? "#fefebe" : "black"}`}}
        onClick={() => props.setRating(props.index)}
        onMouseEnter={() => props.setHover(props.index)}
        onMouseLeave={() => props.setHover(props.rating)}
      >
        <StarBorderOutlinedIcon />
      </IconButton>
    );
}

const Ratings = function () {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div>
      <Typography>
        <b>Rate this movie:</b>
        <br />
      </Typography>


      <RatingButton index={1} rating={rating} setRating={setRating} hover={hover} setHover={setHover}/>
      <RatingButton index={2} rating={rating} setRating={setRating} hover={hover} setHover={setHover}/>
      <RatingButton index={3} rating={rating} setRating={setRating} hover={hover} setHover={setHover}/>
      <RatingButton index={4} rating={rating} setRating={setRating} hover={hover} setHover={setHover}/>
      <RatingButton index={5} rating={rating} setRating={setRating} hover={hover} setHover={setHover}/>
    </div>
  );
};

export default Ratings;
