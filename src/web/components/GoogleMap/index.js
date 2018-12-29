import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import mapStyle from './MapOptions/styles';
import Config from '../../../constants/config';

const Marker = ({ text }) => <div>{text}</div>;
const apiKey = Config.gMapApiKey;

// eslint-disable-next-line react/prefer-stateless-function
class GoogleMap extends Component {
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            // do not push
            key: apiKey,
            language: 'pl',
            ragion: 'pl',
          }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={{
            styles: mapStyle,
          }}
        >
          <Marker
            lat={52}
            lng={380}
            text={'My marker'}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

GoogleMap.defaultProps = {
  center: {
    lat: 52,
    lng: 380,
  },
  zoom: 6.2,
};

export default GoogleMap;
