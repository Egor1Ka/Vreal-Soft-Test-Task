import axios from "axios"

export const API_KEY_GOOGLE = 'AIzaSyA9bslaj5Bl5nLuQQXe8rr_PkhDvvZqzMs'
export const API_KEY_WEATHER = '55ad56d19c6282f2b7e35ebe40960c68'

export const getСurrentLocation = async () => {
    let data = await axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${API_KEY_GOOGLE}`, {
        "homeMobileCountryCode": 310,
        "homeMobileNetworkCode": 410,
        "radioType": "gsm",
        "carrier": "Vodafone",
        "considerIp": true,
    })

    data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${data.data.location.lat}&lon=${data.data.location.lng}&appid=${API_KEY_WEATHER}`)
        .then(response => {
            return response.data
        })
    return data
}


export const getSityData = async (sity) => {
    let data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${sity}&appid=${API_KEY_WEATHER}`)
    return data.data
}

export const chartData = async (name) => {
    let result = await axios(`https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=55ad56d19c6282f2b7e35ebe40960c68`)
    const data  = result.data

    result = []
    for (let i = 0; i < data.list.length; i += 8) {
        result.push(data.list[i])
    } 
    
    return result

} 