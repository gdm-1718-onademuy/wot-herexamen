import React from 'react';
import './weer.styles.scss';
//import droplet from '../../images/droplet.svg';
//import droplet2 from '../../images/droplet2.svg';
import dropletfilled from '../../images/droplet-filled.svg';

class Weer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weather: [],
        } 
    }

    componentDidMount() {
        //GET request
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat=50.922000&lon=3.453350&units=metric&lang=nl&appid=cf3f44f9f4dc9d86b0ca09769e00a7c0')
        .then(res => res.json())
        .then((data) => {
          this.setState({ weather: data })
        })
        .catch(console.log)
    }

    render(){
        //<div className="maxmin">Max: {Math.round(this.state.weather?.daily?[0].temp.max)}° Min: {Math.round(this.state.weather?.daily?.temp.min)}°</div>  
        //if(this.state.weather.length > 0){

        //als er geen regen is (null): doe 0
        var now = new Date();
        var weekday = now.getDay();
        console.log(weekday);
        var days = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag"];
        return(
            <div className='weer'>
                <div className="title">HET WEER IN ZULTE</div>
                <div className="degrees">
                    <div className="aantalgraden">{Math.round(this.state.weather?.current?.temp)}°</div>
                    <div className="minmax">
                        <div>{this.state.weather?.current?.weather[0].description}</div>
                        {this.state.weather?.daily?.map((item, id) => {
                            for(id; id < 1; id++){
                                return(
                                    <div>Max: {Math.round(item.temp.max)}° Min: {Math.round(item.temp.min)}°</div>
                                );
                            }
                        })}
                    </div>

                </div>
                <div className="weersverw">
                    Weersverwachting komende dagen
                </div>
                <div className="voorspelling">
                            {this.state.weather?.daily?.map((item, id) => {
                                for(id; id < 4; id++){
                                return(
                                    <div key={item.dt} className="element">
                                            {id === 0 ?
                                            <div className="Dag">Vandaag</div>
                                            : id === 1 ?
                                            <div className="Dag">{days[weekday]}</div>
                                            : id === 2 ?
                                            <div className="Dag">{days[weekday+1]}</div>
                                            :
                                            <div className="Dag">{days[weekday+2]}</div>
                                            }
                                        <div className="Graden">
                                            {Math.round(item.temp.day)}°
                                        </div>
                                        <div className="regen">
                                        <img className="droplet" src={dropletfilled} alt="droplet"/> {item?.rain ? item.rain.toFixed(1) : 0.0}mm
                                        </div>
                                    </div>
                            );
                            }})}

                </div>
            </div> 
        );
    }
}

export default Weer;
