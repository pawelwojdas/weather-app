import React, { Component } from 'react';
import './App.css';
import Form from './Form'
import Result from './Result'


const API_KEY = '3beaa38ed935a7ba599154a89f1d55a8';



class App extends Component {



  state = {
    currentLatitude: '',
    currentLongitude: '',
    error: false,
    value: '',
    city: '',
    country: '',
    description: '',
    icon: '',
    temp: '',
    pressure: '',
    wind_speed: '',
    humidity: '',
  }

  handleCitySubmit = e => {
    e.preventDefault();
    this.getData()

  }

  handleInputChange = e => {
    this.setState(({
      value: e.target.value
    }))
  }


  getData() {
    let API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${API_KEY}&units=metric`


    if (this.state.currentLatitude && this.state.currentLongitude) {

      API = `http://api.openweathermap.org/data/2.5/weather?lat=${this.state.currentLatitude}&lon=${this.state.currentLongitude}&appid=${API_KEY}&units=metric`

      this.setState({
        currentLatitude: '',
        currentLongitude: '',
      })

    }

    fetch(API)
      .then(response => {
        if (response.ok) {
          return response
        }
        throw Error("Error")
      })
      .then(response => response.json())
      .then(data => {
        this.setState(state => ({
          city: data.name,
          country: data.sys.country,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          temp: data.main.temp,
          pressure: data.main.pressure,
          wind_speed: data.wind.speed,
          humidity: data.main.humidity,
          error: false,
          value: ''
        }))
      })

      .catch(err => {
        this.setState(prevState => ({
          error: true,
          city: prevState.value,
        }))
      })
  }

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const currentLongitude = JSON.stringify(position.coords.longitude);
      const currentLatitude = JSON.stringify(position.coords.latitude);
      this.setState({
        currentLatitude,
        currentLongitude
      })
      this.getData()
    })
  }


  render() {
    return (
      <div className="App">
        <Form value={this.state.value} submit={this.handleCitySubmit} change={this.handleInputChange} />
        <Result weather={this.state} />
      </div>
    );
  }
}

export default App;
