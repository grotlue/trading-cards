import React from "react";

type CardProps = {
  name: string;
  imageUrl: string;
};

const Card = ({ name, imageUrl }: CardProps) => (
  <div>
    <img src={imageUrl} />
    {name}
  </div>
);

export default Card;
