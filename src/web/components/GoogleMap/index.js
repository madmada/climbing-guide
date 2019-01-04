import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import mapStyle from './MapOptions/styles';
import Config from '../../../constants/config';

const Marker = ({ text }) => (
  <i
    style={{
      fontSize: '4em',
      color: '#00bfff',
      padding: '15px 10px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      transform: 'translate(-50%, -50%)'}}
    className="icon-target" />);
const apiKey = Config.gMapApiKey;

// eslint-disable-next-line react/prefer-stateless-function
class GoogleMap extends Component {
  render() {
    const { center, zoom, lat, lng } = this.props;
    return (
      <div style={{ height: '400px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: apiKey,
            language: 'pl',
            ragion: 'pl',
          }}
          defaultCenter={center}
          defaultZoom={zoom}
          options={{
            styles: mapStyle,
          }}
        >
          <Marker
            lat={lat}
            lng={lng}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

GoogleMap.defaultProps = {
  center: {
    lat: 51.400646,
    lng: 21.153286,
  },
  zoom: 11,
};

export default GoogleMap;
