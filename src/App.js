import './navigationBar.css'
import './WeatherCard.css'
import React, { useState } from 'react'
import './MoreDetails.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const api = {
  key: "bd58c8f33d0ac889075f6493cfd1f56b",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState('')
  const [units, setUnits] = useState("metric");
  const [more, setMore] = useState(false)

  const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery('')
          console.log(result)
        })

    }
  }
  const dateBuilder = (d) => {
    var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = daysInWeek[d.getDay()];
    let currDate = d.getDate();
    let month = mL[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${currDate} ${month} ${year}`
  }
  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };
  const handleMoreClick = (e) => {
    const button = e.currentTarget;
    const currentMore = button.innerText

    const isMore = currentMore === "Show More Details";
    button.innerText = isMore ? "Show Less Details" : "Show More Details";
    setMore(isMore ? true : false);
  };
  return (
    <div>

      <header>
        <nav className="navbar">
          <ul>
            <li id="title">TellWeather</li>
            <li><input id="searchBox" placeholder="Search" onChange={e => setQuery(e.target.value)} value={query}
              onKeyDown={search}></input></li>
          </ul>
        </nav>
      </header>

      {(typeof weather.main != 'undefined') ? (
        <div>
          <div className="weatherCard">
            <div>
              <div className="mainCard">
                <div className="cardHeading">Current Weather <button id="convertUnits" onClick={(e) => handleUnitsClick(e)}>°F</button></div>

                <div className="date">{dateBuilder(new Date())}</div>
                <div id="locationName">
                  <FontAwesomeIcon id="locIcon" icon={faLocationDot} />{weather.name} , {weather.sys.country}</div>
                <div id="temp"><div id="space" /><div id="space" /><div id="space" />{
                  units === "metric" ? Math.round(weather.main.temp) + " °C" : Math.round(weather.main.temp * (9 / 5) + 32) + " °F"
                }<img id="wicon" src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="not found" /></div>
                <div id="wcondition">{weather.weather[0].main} </div> {
                  more === true ?
                    (<div id="condition">
                      <div id="item1">Humidity : {weather.main.humidity} % <div id="space" /><div id="space" /></div><div id="item1">Feels Like : {
                      units === "metric" ? Math.round(weather.main.feels_like) + " °C" : Math.round(weather.main.feels_like * (9 / 5) + 32) + " °F"
                    }</div>
                      <div id="item1">Wind speed : {Math.round(weather.wind.speed * 3.6)} km/hr</div>
                      <div id="item1">Pressure : {Math.round(weather.main.pressure)} mb</div>
                      <div id="item1">Visibility : {Math.round(weather.visibility / 1000)} km</div>
                    </div>) : ''}
                <button id='showMore' onClick={(e) => handleMoreClick(e)}>Show More Details</button>
              </div>
            </div>
          </div>
        </div>
      ) : (<div id="noData">Search for a location</div>)}
    </div>
  )
}

export default App;
