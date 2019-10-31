import React from 'react';
import Titles from './componants/Titles';
import Form from './componants/Form';
import Weather from './componants/Weather';
import './App.css'
const API_KEY = "d7b07564ca758ef86032a078a2c967ae"

class App extends React.Component{
  state = {
    temperature: undefined,
    ciry: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
    
  }

  getWeather = async(e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}`); 
    const data = await api_call.json();
    if (city && country){
      // console.log(data);
      this.setState({
        temperature:data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    }else{
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the value."
      });
    }
  }
   
render() {
    return (
      <div>
      {/* <img src={Bacground}/> */}
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                <h1>Hello</h1>
                </div>
                <div className="col-xs-7 form-container">
                <Form getWeather={this.getWeather}/>
                <Weather 
          temperature={this.state.temperature}
          city={this.state.city}
          country={this.state.country}
          humidity={this.state.humidity}
          description={this.state.description}
          error={this.state.error}
          />
              </div>   
              </div>
            </div>
          </div>
        </div>
      </div>
       
    );
  }
};


        

export default App;