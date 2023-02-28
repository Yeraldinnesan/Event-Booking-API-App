import React from "react";

const Events = ({ title, description, price, date, location, image }) => {
  return (
    <div>
      <div>
        <h2>{title}</h2>
        <img src={image} alt={title} />
        <h3>{description}</h3>
        <h4>{price}</h4>
        <span>{date}</span>
        <h3>Location: {location}</h3>
      </div>
    </div>
  );
};

export default Events;
