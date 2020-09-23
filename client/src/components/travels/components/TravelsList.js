import React from 'react';
import TravelItem from '../components/TravelItem';
import { Grid } from '@material-ui/core';

const TravelsList = props => {
  const { travels } = props;
  if (props.travels.length === 0) {
    return <h2>No travels.</h2>;
  }
  return (
    <div>
      <h2>Travels List</h2>
      <Grid container spacing={3} style={{ padding: 24 }}>
        {props.travels.map(travel => (
          <Grid item xs={12} sm={6} lg={3} xl={2}>
            <TravelItem key={travel._id} travel={travel} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TravelsList;
