import { useState } from 'react'
import haze from '../haze.png'


const Weatherreport = () => {
    const apikey = "528d8a2fd1b82953012a315d8230315d"
    const [searchvalue, setSearchvalue] = useState('')
    const [country, setCountry] = useState('')
    const [result, setResult] = useState(null)
    const [date, setDate] = useState('')
    const [sunrise,setSunrise]=useState('')
    const[sunset,setSunset]=useState('')



    let handlesearch = () => {

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchvalue},${country}&APPID=${apikey}`)
            .then((data) => {
                return data.json()
            })
            .then((final) => {
                console.log(final);

                setResult(final)
                // let currendate=new Date(final.dt)
                setDate(final.dt)
                setSunrise(final.sys.sunrise)
                setSunset(final.sys.sunset)
                setSearchvalue('')
                setCountry('')
            })
            .catch((err)=>{
                    console.log(err.message);
                    
            })

    }




    return (
        <div className="weatherreport">
            <h1>Weather App</h1>
            <div className="input-fields">
                <input type="text" placeholder="enter city name" value={searchvalue} onChange={(e) => { setSearchvalue(e.target.value) }} />
                <input type="text" placeholder="enter country name" value={country} onChange={(e) => { setCountry(e.target.value) }} />
                <input type="submit" value="Submit" onClick={handlesearch} />
            </div>

            {result && <div className="weather-details">
                <div className="name">
                    <h1>{result.name}  </h1>
                    <h1>,{result.sys.country}</h1> <br />
                </div>
                <p id='time' >AS of - : <b> {new Date(date*1000).toLocaleTimeString()}</b> </p>
                <div className="details">
                    <h1 id='temp'>{Math.floor(result.main.temp - 273)}&deg; </h1>
                    <div className="img-detail">
                        <img src={haze} alt="" width="40px" height="40px" />
                        <p>{result.weather[0].main}</p>
                    </div>
                </div>
                <p>{result.weather[0].main}</p>
            </div>}

            {result && <div className="additional-information">
                <div className="firstcoloumn">
                    <div className="firstcoloumn-line">
                        <h4>High/Low</h4>
                        <h3>{Math.floor(result.main.temp_max - 273)}/{Math.floor(result.main.temp_min - 273)}</h3>
                    </div>
                    <div className="firstcoloumn-line">
                        <h4>Humidity</h4>
                        <h3 >{result.main.humidity}% </h3>
                    </div>
                    <div className="firstcoloumn-line">
                        <h4>Pressure</h4>
                        <h3>{result.main.pressure}hPa</h3>
                    </div>
                    <div className="firstcoloumn-line">
                        <h4>Visibility</h4>
                        <h3>{result.visibility / 1000}Km</h3>
                    </div>
                </div>

                <div className="secondcoloumn">
                    <div className="secondcoloumn-line">
                        <h4>Wind</h4>
                        <h3>{result.wind.speed}km/hr</h3>
                    </div>
                    <div className="secondcoloumn-line">
                        <h4>Wind direction</h4>
                        <h3>{result.wind.deg}&deg; deg</h3>
                    </div>
                    <div className="secondcoloumn-line">
                        <h4>Sunrise</h4>
                        <h3>{new Date(sunrise*1000).toLocaleTimeString()}</h3>
                    </div>
                    <div className="secondcoloumn-line">
                        <h4>Sunset</h4>
                        <h3>{new Date(sunset*1000).toLocaleTimeString()}</h3>
                    </div>
                </div>



            </div>}
        </div>
    );
}

export default Weatherreport;