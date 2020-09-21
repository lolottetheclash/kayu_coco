import React, { useEffect, useState } from 'react';
import TravelsList from '../components/TravelsList';

const Travels = () => {
  const [travels, setTravels] = useState([]);

  useEffect(() => {
    fetch('/api/v1/travels')
      .then(res => res.json())
      .then(travels => setTravels(travels.data));
  }, []);

  //TODO: gestion du state ici => penser à incorporer une variable loading
  //TODO: context à utiliser pr cette gestion
  return (
    <div>
      <h2>Travels Page</h2>
      <TravelsList travels={travels} />
    </div>
  );
};
export default Travels;
