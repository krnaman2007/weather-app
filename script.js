document.addEventListener('DOMContentLoaded',()=>{
    const cityInput=document.getElementById('city-input');
    const getWeatherBtn=document.getElementById('get-weather-btn')
    const weatherInfo=document.getElementById('weather-info')
    const cityNameDisplay=document.getElementById('city-name')
    const temperatureDisplay=document.getElementById('temperature')
    const descriptionDisplay=document.getElementById('description')
    const errorMessage=document.getElementById('error-message')

    const API_KEY="4782a636d65424a4e1bcdf3b5de64051" //env variables

    getWeatherBtn.addEventListener('click',async ()=>{
        const city=cityInput.value.trim()
        if(!city) return

        //it may throw an error
        // server/database is always in another continent

        try {
            const weatherData=await fetchWeatherData(city)
            displayWeatherData(weatherData)
        } catch (error) {
            showError()
        }

    })

    async function fetchWeatherData(city){
        //gets the data
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        
        const response=await fetch(url)
        console.log(typeof response)
        console.log(response)

        if(!response.ok){
            throw new Error("City not found")
        }
        const data=await response.json()
        return data
    }

    function displayWeatherData(data){
        console.log(data)
        const {name,main,weather}=data
        const temp=main.temp
        let tempEmoji = "";
        if(temp >= 40) tempEmoji = "🥵";
        else if(temp >= 30) tempEmoji = "☀️";
        else if(temp >= 20) tempEmoji = "🌤️";
        else if(temp >= 10) tempEmoji = "🍃";
        else if(temp >= 0) tempEmoji = "❄️";
        else tempEmoji = "🥶";
        let des=weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1)
        cityNameDisplay.textContent=`📍 ${name}`
        temperatureDisplay.textContent=`${tempEmoji} Temperature : ${main.temp} °C`
        descriptionDisplay.textContent=`Weather : ${des}`

        //unlock the display
        weatherInfo.classList.remove('hidden')
        errorMessage.classList.add('hidden')
    }

    function showError(){
        weatherInfo.classList.add('hidden')
        errorMessage.classList.remove('hidden')
    }
})