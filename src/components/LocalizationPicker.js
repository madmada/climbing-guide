import React from 'react';
import GoogleMapGeoPicker from 'react-geo-picker/lib/google-map';
import Geocode from 'react-geocode';
import { Button } from 'reactstrap';
import Config from '../constants/config';
import { getRegion } from '../helpers';

Geocode.setApiKey(Config.gMapApiKey);

class LocalizationPicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    location: {
      latitude: 50.29449229999999,
      longitude: 18.67138019999993,
      region: '',
      address: '',
    },
  };

  onLocationChange = (location) => this.setState({
    location: {
      ...this.state.location,
      ...location,
    }
  });

  handleLatitudeChange = (event) => this.onLocationChange({
    latitude: Number(event.target.value),
  });

  handleLongitudeChange = (event) => this.onLocationChange({
    longitude: Number(event.target.value),
  });

  async handleSubmit() {
    await Geocode.fromLatLng(this.state.location.latitude, this.state.location.longitude).then(
      response => {
        const addressComponents = response.results[0].address_components;
        const address = response.results[0].formatted_address;
        const region = getRegion(addressComponents);
        console.log(region);
        this.onLocationChange({ region: region, address: address });
      },
      error => {
        console.error(error);
      }
    );
    this.props.onSubmit(this.state.location);
  }

  render() {
    const { location } = this.state;

    return (
      <div>
        <GoogleMapGeoPicker apiKey={Config.gMapApiKey} value={location} onChange={this.onLocationChange} width={'100%'} />
        <Button onClick={this.handleSubmit} style={{ width: '100%' }}>Zatwierdź</Button>
      </div>
    );
  }
}

export default LocalizationPicker;
