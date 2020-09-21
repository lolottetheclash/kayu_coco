import React from 'react';
import TravelItem from '../components/TravelItem';

const TravelsList = props => {
  const { travels } = props;
  if (props.travels.length === 0) {
    return <h2>No travels.</h2>;
  }
  return (
    <div>
      <h2>Travels List</h2>
      <ul>
        {props.travels.map(travel => (
          <TravelItem key={travel._id} travel={travel} />
        ))}
      </ul>
    </div>
  );
};

export default TravelsList;
