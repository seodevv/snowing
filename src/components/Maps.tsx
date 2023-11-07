import React from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 37.56743,
  lng: 127.01214,
};

const Maps = () => {
  return (
    <>
      <LoadScript googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_MAP_KEY}`}>
        <GoogleMap mapContainerStyle={containerStyle} zoom={18} center={center}>
          <MarkerF position={center} />
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default Maps;
