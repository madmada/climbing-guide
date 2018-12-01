import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import mapStyle from './MapOptions/styles';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

// eslint-disable-next-line react/prefer-stateless-function
class GoogleMap extends Component {

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyBgSHrXxJbNB75Q6JVqXqjeONfpMSk_FV0',
            language: 'pl',
            ragion: 'pl',
          }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={{
            styles: mapStyle,
          }}
        >
          <AnyReactComponent
            lat={52}
            lng={380}
            text={'Kreyser Avrora'}
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
