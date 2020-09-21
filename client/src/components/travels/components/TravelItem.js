import React from 'react';

const TravelItem = props => {
  const { travel } = props;

  return <li>{travel.title}</li>;
};
export default TravelItem;
