document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('input');
    const button = document.querySelector('button');
    const errorMsg = document.querySelector('p.error_message');
    const date = document.querySelector('p.date');
    const img = document.querySelector('img.weather_img');
    const temp = document.querySelector('span.temp');
    const cityName = document.querySelector('h2.city_name');
    const description = document.querySelector('p.weather_description');
    const feelsLike = document.querySelector('span.feels_like');
    const pressure = document.querySelector('span.pressure');
    const humidity = document.querySelector('span.humidity');
    const windSpeed = document.querySelector('span.wind_speed');
    const visibility = document.querySelector('span.visibility');
    const clouds = document.querySelector('span.clouds');

    const apiInfo = {
        link: 'https://api.openweathermap.org/data/2.5/weather?q=',
        key: '&appid=2f51fab3f3b49ab338cd23e79fa3166c',
        units: '&units=metric',
        lang: '&lang=pl'
    };

    const getWeatherInfo = () => {
        const apiInfoCity = input.value.trim();
        if (!apiInfoCity) return;

        const apiURL = `${apiInfo.link}${apiInfoCity}${apiInfo.key}${apiInfo.units}${apiInfo.lang}`;
        console.log(apiURL);

        axios.get(apiURL).then((response) => {
            console.log(response.data);

            const timezone = response.data.timezone;
            const localTime = new Date(Date.now() + 1000 * timezone - 7200000);

            date.textContent = localTime.toLocaleString('pl-PL', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            cityName.textContent = `${response.data.name}, ${response.data.sys.country}`;
            description.textContent = `${response.data.weather[0].description}`;
            img.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
            img.classList.remove("hidden");

            visibility.textContent = `${response.data.visibility / 1000} km`;
            feelsLike.textContent = `${Math.round(response.data.main.feels_like)}`;
            pressure.textContent = `${response.data.main.pressure}hPa`;
            windSpeed.textContent = `${Math.round(response.data.wind.speed * 3.6)}km/h`;
            temp.textContent = `${response.data.main.temp} stopni Celsjusza`;
            humidity.textContent = `${response.data.main.humidity}`;
            clouds.textContent = `${response.data.clouds.all}%`;
            errorMsg.textContent = '';
        }).catch((error) => {
            errorMsg.textContent = `${error.response?.data?.cod || ''} - ${error.response?.data?.message || 'Błąd'}`;
            [date, cityName, temp, description, feelsLike, humidity, pressure, windSpeed, visibility, clouds].forEach(el => {
                el.textContent = ' ';
            });
            img.removeAttribute("src");   
            img.classList.add("hidden");  
        }).finally(() => {
            input.value = '';
        });
    };

    const getWeatherInfoByEnter = (e) => {
        if (e.key === 'Enter') {
            getWeatherInfo();
        }
    };

    button.addEventListener('click', getWeatherInfo);
    input.addEventListener('keypress', getWeatherInfoByEnter);
});
