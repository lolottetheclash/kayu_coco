import React from 'react';

import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';

const TravelItem = props => {
  const { travel } = props;

  return (
    <Card>
      <h2>Travel Item</h2>

      <CardMedia
        style={{ height: 0, paddingTop: '25%' }}
        image="https://www.acs-ami.com/fr/blog/wp-content/uploads/2015/07/inspiration-voyage.jpg"
        title={travel.title}
      />
      <CardContent>
        <Typography> {travel.title}</Typography>
      </CardContent>
    </Card>
  );
  // <li>{travel.title}</li>;
};
export default TravelItem;
