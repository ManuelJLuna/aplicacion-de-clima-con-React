import { useState } from 'react'
import './WeatherApp.css'

export const App = () => {

    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState(null)

    const URL_BASE = `https://api.openweathermap.org/data/2.5/weather`
    // ?q={cityName}&appid={API_KEY}&lang=es
    const API_KEY = 'YOUR_API_KEY'
    const DIF_KELVIN = 273.15 // Diferencia entre grados Kelvin y grados Centigrados

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(`${URL_BASE}?q=${city}&appid=${API_KEY}&lang=es`)
            const data = await response.json()
            console.log(weatherData)
            setWeatherData(data)
        } catch (err) {
            console.error(err)
            return console.error('Ha ocurrido un error al llamar a la API. App.jsx 13')
        }
    }

    const handleCityChange = (event) => {
        setCity(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetchWeatherData()
    }

    return (
        <>
            <div className='container'>
                <h1>Vea el clima</h1>
                <h3>Buscar ciudad o pais</h3>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Escriba la ciudad o país que desee' autoFocus autoComplete='false' value={city} onChange={handleCityChange} />
                    <button type="submit">Buscar</button>
                </form>
                {weatherData &&
                <>
                    <h2>{weatherData.name}</h2>
                    <h4>{weatherData.sys.country}</h4>
                    <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
                    <p id='desc'>{weatherData.weather[0].description.slice(0, 1).toUpperCase() + weatherData.weather[0].description.slice(1)}</p>
                    <p id='temp'>Temperatura: {Math.floor(weatherData.main.temp - DIF_KELVIN)}ºC</p>
                    <p id='feelTemp'>Sensacion: {Math.floor(weatherData.main.feels_like - DIF_KELVIN)}ºC</p>
                    <p><span className='minMax'>Min: {Math.floor(weatherData.main.temp_min - DIF_KELVIN)}ºC</span><span className='minMax ml-15'>Max: {Math.floor(weatherData.main.temp_max - DIF_KELVIN)}ºC</span></p>
                    <p id='hum'>Humedad del {weatherData.main.humidity}%</p>

                </>

            }
            </div>
        </>
    )
}
