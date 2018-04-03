import React,{Component} from 'react'
import GoogleMapReact from 'google-map-react';
import google from './google.png';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

const AnyReactComponent = ({ text }) => <div ><img src={google} style={{ height: '24px', width: '12px'}} /></div>;

export default class Prueba extends Component{
	constructor(){
		super()
		this.state={
			center:{
				lat: 4.8087174,
	      lng: -75.69060100000002
			},
        address: 'Pereira, Risaralda, Colombia',
		}

		this.getValue=this.getValue.bind(this)
    this.onChange = (address) => this.setState({ address })
	}

  getValue(event){
    this.setState({center:{lat:event.lat, lng:event.lng}})
  }

    handleFormSubmit = (event) => {
    event.preventDefault()
    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({center:{lat:latLng.lat, lng:latLng.lng}}))
      .catch(error => console.error('Error', error))
  }



getPress(event){
	console.log(event.which)
	console.log(event.keyCode);
}



	render(){

     const inputProps = {
      value: this.state.address,
      onChange: this.onChange,

    }
		const zoom=15
		const {center}=this.state

		const handleEnter = (address) => {
		geocodeByAddress(address)
			.then(results => {
				console.log('results', results)
			})
			.succes(results => {
				console.log('results', results)
			})
	}

		return(


			 <div  style={{ height: '500px', width: '100%',zIndex: '1'}}>
				 <form onSubmit = {this.handleFormSubmit} style={{ zIndex: '2',position:'relative'}}>
					 <PlacesAutocomplete inputProps={inputProps} onEnterKeyDown={this.getPress}/>
					 <button type="submit">Buscar</button>
				 </form>
		        <GoogleMapReact
		          // bootstrapURLKeys={{ key: 'AIzaSyAUDER1vmg8yXlSMJUb5fXDmoK5bs-rCWE' }}
							center={center}
		          defaultZoom={zoom}
		          onClick={this.getValue}
		        >
		          <AnyReactComponent
		            lat={center.lat}
		            lng={center.lng}
		            text={'Estas aqui'}
		          />

		        </GoogleMapReact>
		        <input id= 'lat'  value = {center.lat} readOnly/>
		        <input id= 'long' value = {center.lng} onKeyPress={this.getPress}/>


      </div>


			)
	}


}
