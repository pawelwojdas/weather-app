import React from 'react'
import './Result.css'


const Result = props => {
    const { error, city, country, description, icon, temp, pressure, wind_speed, humidity } = props.weather;

    let icons = null;

    if (icon === "03d" || icon === "03n" || icon === "04d" || icon === "04n") {
        icons = '05'
    } else {
        icons = icon
    }

    let result = null;

    let temperature = parseFloat(temp).toFixed(0)


    if (!error && city) {

        result = (
            <>
                <p className="place">{city}, {country} </p>
                <p className="description">{description}</p>
                <img src={require(`./icons/${icons}.png`)} alt="" />

                <p className="temp">Temperature: <strong>{temperature}</strong> &#176;C</p>
                <p className="pressure">Pressure: <strong>{pressure}</strong> hPa</p>
                <p className="humidity">Humidity: <strong>{humidity}</strong>%</p>
                <p className="windSpeed">Wind Speed: <strong>{wind_speed}</strong> m/s</p>



            </>

        )
    }

    return (
        <div className="results">
            {error ? `${city} is not a correct place` : result}
        </div>
    );
}

export default Result;