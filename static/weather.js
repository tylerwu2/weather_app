const forecast_container = document.getElementById("forecast_container")
const input_container = document.getElementById("input_container");
const input = document.getElementById("user_input");
const submit_button = document.getElementById("submit"); 

const day_1_title = document.getElementById("day_1_title");
const day_2_title = document.getElementById("day_2_title");
const day_3_title = document.getElementById("day_3_title");
const day_4_title = document.getElementById("day_4_title");
const day_5_title = document.getElementById("day_5_title");
const day_6_title = document.getElementById("day_6_title");
const day_7_title = document.getElementById("day_7_title");

const day_1_content = document.getElementById("day_1_content");
const day_2_content = document.getElementById("day_2_content");
const day_3_content = document.getElementById("day_3_content");
const day_4_content = document.getElementById("day_4_content");
const day_5_content = document.getElementById("day_5_content");
const day_6_content = document.getElementById("day_6_content");
const day_7_content = document.getElementById("day_7_content");

const day_1_img = document.getElementById("day_1_img");
const day_2_img = document.getElementById("day_2_img");
const day_3_img = document.getElementById("day_3_img");
const day_4_img = document.getElementById("day_4_img");
const day_5_img = document.getElementById("day_5_img");
const day_6_img = document.getElementById("day_6_img");
const day_7_img = document.getElementById("day_7_img");

const curr_weather_display = document.getElementById("current_weather");
const curr_weather = document.getElementById("curr_weather_content"); 
const curr_weather_img = document.getElementById("curr_weather_img"); 

submit_button.addEventListener("click", fetchWeather);

async function fetchWeather() {
    const city = input.value.trim();
    if (!city) return alert("Please enter a city name.");

    try {
        // 1️⃣ Fetch coordinates from Open-Meteo geocoding API
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
            return alert("City not found. Try again.");
        }

        input_container.classList.add("hidden");

        const { latitude, longitude } = geoData.results[0];

        // 2️⃣ Fetch weather using coordinates
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&current=temperature_2m,is_day,weather_code&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`;
        const weatherRes = await fetch(weatherUrl);
        const weatherData = await weatherRes.json();
        
        let weather_code_imgs = {}; 

        // Fetch weath code info
        const descriptions_response = await fetch("descriptions.json");
        if (!descriptions_response.ok) {
            throw new Error("Error loading descriptions.json");
        }
        weather_code_imgs = await descriptions_response.json();


        const dates = weatherData.daily.time; 
        const temps_max = weatherData.daily.temperature_2m_max;
        const temps_min = weatherData.daily.temperature_2m_min; 
        const weather_code = weatherData.daily.weather_code; 
        const current_weather = weatherData.current.temperature_2m; 
        const curr_weather_code = weatherData.current.weather_code; 
        const isDay = weatherData.current.is_day; 
        
        const day_names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let dates_week = [];    

        for (let i = 0; i < dates.length; i++){
            const [year, month, day] = dates[i].split("-").map(Number);
            const dateObj = new Date(year, month - 1, day);
            dates_week[i] = day_names[dateObj.getDay()]
        }

        day_1_content.innerText = `High: ${Math.round(temps_max[0])} °F Low: ${Math.round(temps_min[0])} °F`;
        day_2_content.innerText = `High: ${Math.round(temps_max[1])} °F Low: ${Math.round(temps_min[1])} °F`;
        day_3_content.innerText = `High: ${Math.round(temps_max[2])} °F Low: ${Math.round(temps_min[2])} °F`;
        day_4_content.innerText = `High: ${Math.round(temps_max[3])} °F Low: ${Math.round(temps_min[3])} °F`;
        day_5_content.innerText = `High: ${Math.round(temps_max[4])} °F Low: ${Math.round(temps_min[4])} °F`;
        day_6_content.innerText = `High: ${Math.round(temps_max[5])} °F Low: ${Math.round(temps_min[5])} °F`;
        day_7_content.innerText = `High: ${Math.round(temps_max[6])} °F Low: ${Math.round(temps_min[6])} °F`;

        day_1_img.setAttribute("src", weather_code_imgs[weather_code[0].toString()].day.image);
        day_2_img.setAttribute("src", weather_code_imgs[weather_code[1].toString()].day.image);
        day_3_img.setAttribute("src", weather_code_imgs[weather_code[2].toString()].day.image);
        day_4_img.setAttribute("src", weather_code_imgs[weather_code[3].toString()].day.image);
        day_5_img.setAttribute("src", weather_code_imgs[weather_code[4].toString()].day.image);
        day_6_img.setAttribute("src", weather_code_imgs[weather_code[5].toString()].day.image);
        day_7_img.setAttribute("src", weather_code_imgs[weather_code[6].toString()].day.image);

        day_1_title.innerText = dates_week[0];
        day_2_title.innerText = dates_week[1];
        day_3_title.innerText = dates_week[2];
        day_4_title.innerText = dates_week[3];
        day_5_title.innerText = dates_week[4];
        day_6_title.innerText = dates_week[5];
        day_7_title.innerText = dates_week[6];

        curr_weather.innerText = `${Math.round(current_weather)} °F`;
        if (isDay == 1) {
            curr_weather_img.setAttribute("src", weather_code_imgs[curr_weather_code.toString()].day.image); 
        } else {
            curr_weather_img.setAttribute("src", weather_code_imgs[curr_weather_code.toString()].night.image); 
        }
        
        forecast_container.classList.remove("hidden");
        curr_weather_display.classList.remove("hidden");
    

    } catch (err) {
        console.error("Error fetching weather:", err);
        alert("Failed to fetch weather. Try again.");
    }
}