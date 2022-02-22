import axios from "axios"
import { useEffect, useState } from "react"
import {
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, } from 'chart.js/auto'
import { chartData } from "../../API";
import { createId, deleteCard } from "../../Redux/mainReduser";
import { useDispatch } from "react-redux";

const Card = ({ card }) => {
 
    let {
        name,
        wind: { speed },
        main: { temp, feels_like, humidity, pressure },
        sys: { country },
        id
    } = card

    
    let main = card.weather[0].main
    let icon = card.weather[0].icon
    temp = Math.round(temp - 273)

    const dispatch = useDispatch()
    const [datasetsChart, setdatasetsChart] = useState([])
    const [tempChart, tempsetsChart] = useState([])

    const determineteTemp = (temp)=>{
        if(temp>0){
            return 'warm'
        } return 'cold'
    }

    const determineteTempData = (temp,payload)=>{
        if(temp<0){
            switch(payload){
                case 'borderColor': return 'rgb(197,213,255)'
                case 'above' : return 'rgb(215,223,254)'
            }
        }
        switch(payload){   
            case 'borderColor': return 'rgb(255,250,241)'
            case 'above':return'rgb(255,229,205)'
        } 
    }

    const above = determineteTempData(temp,'above')
    const borderColor = determineteTempData(temp,'borderColor')

    useEffect(() => {
       
         chartData(name)
            .then(dataSity => {

                setdatasetsChart(() => {
                    return dataSity.map(i => {
                        const dete = new Date(i.dt_txt)
                        return `${dete.getDate()}.${dete.getMonth() + 1}`
                    })
                })

                tempsetsChart(() => {
                    return dataSity.map(i => {
                        return Math.round(i.main.temp - 273)
                    })
                })
            })
    }, [])

    const data = {
        labels: datasetsChart,
        datasets: [{
            label: '',
            data: tempChart,
            fill: true,
            borderColor: borderColor,
            tension: 0.1,
            fill: {
                target: 'origin',
                above: above,  
                below: 'rgb(0, 0, 255)'    
            }
        }],

    };


    const options = {
        plugins: {
            legend: {
                display: false
            }
        },
        title: {
            display: false,
        },
    }
    determineteTemp(temp)
    let a =(id)=>{
        dispatch(deleteCard(id))
    }
    return (
        <div 
        className={`card ${determineteTemp(temp)}`} >
            <div className="cross">×</div>
            <div className="card-body">
                <div className="upInformation">
                    <div>
                        <h5 className="card-title">{name},{country}    </h5>
                        <p>{datasetsChart[0]}</p>
                    </div>

                    <img src={` http://openweathermap.org/img/wn/${icon}@2x.png`} style={{ width: '50px', height: '50px' }} />
                    <p>{main}</p>
                </div>

                <Line data={data} options={options} />

                <div className="downInformation">
                    <div className="left">
                        <h2 className="card-subtitle mb-3">{temp}°</h2>
                        <h6 className="card-subtitle mb-2 text-muted">feels Like : {Math.round(feels_like - 273)}°</h6>

                    </div>

                    <div>
                        <p>Humidity:<strong className={'strong'}>{humidity}%</strong> </p>
                        <p>Wind:<strong className={'strong'}>{speed}m/s</strong></p>
                        <p>Pressure:<strong className={'strong'}>{pressure}Pa</strong></p>
                    </div>
                </div>

            </div>
        </div>
    )


}

export default Card