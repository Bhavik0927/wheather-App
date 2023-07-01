const myContainer = document.querySelector('.container');
const input = document.querySelector('input');
const btn = document.querySelector('button');
const cityName = document.querySelector('.city_name');
const currTemp = document.querySelector('#temp');
const currTiming = document.querySelector(".heading .timeing");
const weatherImage = document.querySelector('#weatherImage');
const greeting = document.querySelector('.greet');
const greetPlace = document.querySelector('.greet_Place');
const riseTiming = document.querySelector(".parameter")
const wind = document.querySelector('.windpara');
const humidity = document.querySelector('.Humipara');


btn.addEventListener('click', () => {

    const inputValue = input.value;
    cityName.innerHTML = inputValue;

    const API_key =config.API_KEY;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${API_key}`;

    fetch(url).then(
        (res) => {
            return res.json();
        }
    ).then((data) => {

        //Calculate temperature
        const temp = data["main"]["temp"];
        const actualTemp = temp - 273.15;
        exactTemp = Math.round(actualTemp);
        currTemp.innerHTML = exactTemp + `&#8451;`;

        // Updating timing 
        
            const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    
            const d = new Date();
            let getDay = days[d.getDay()];
            let getHours = d.getHours();
            let getMinutes = d.getMinutes();

            if (getHours > 12) getHours =  getHours - 12;
            let am = getHours >= 12 ? "PM" : "AM";
           
            // Add zero before timing
            getHours = (getHours < 10) ? "0" + getHours : getHours;
            getMinutes = (getMinutes < 10) ? "0" + getMinutes : getMinutes;

            currTiming.innerText = `${getDay} ${getHours}:${getMinutes}${am}`;
            

        //temperature logo
        const MainWeather = data["weather"][0]["main"];
        console.log(MainWeather);

        if (MainWeather === "Haze") {
            weatherImage.src = `./Images/cloudSunny.png`;
           
        }else if(MainWeather === 'cloudy'){
            weatherImage.src = `./Images/clouds.png`
        }else if(MainWeather === 'Clear'){
            weatherImage.src = `./Images/sunny.png`;
        }

        //greeting 
        const timeGreet = (getHours < 12) ? "Good Afternoon" : "Good Morning";
        greeting.innerText = timeGreet;
        greetPlace.innerText = inputValue;

        // Updating SunRise
        const sunriseTime = data["sys"]["sunrise"]; // It Gives timeing in UNIX 
        let date = new Date(sunriseTime * 1000);
        let hours = date.getHours().toLocaleString().padStart(2, 0)
        let minutes = date.getMinutes().toLocaleString().padStart(2, 0);

        riseTiming.innerText = `${hours}:${minutes}`;

        // Wind Speed
        const windVal = data["wind"]["speed"];
        const windKmhr = windVal * 3600;
        const actualSpeed = windKmhr / 1000;
        const roundSpeed = Math.round(actualSpeed);
        wind.innerText = `${roundSpeed}km/h`;

        //Humidity 
        const humiPercentage = data["main"]["humidity"];
        humidity.innerText = `${humiPercentage}%`;
    });

})


