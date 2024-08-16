document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city-name').value;

    if (!cityName) {
        document.querySelector("weather").classList.remove('show');
        showAlert("Informe uma cidade!");
        return;
    }

    //console.log(cityName)
    const apiKey = '';

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric`
    
    const results = await fetch(apiUrl);
    const json = await results.json();

    //console.log(json);

    if (json.cod === 200) {
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
        });
    } else {
        document.querySelector("#weather").classList.remove('show');

        showAlert(`
            Não foi possivel localizar o valor digitado
        `)
    }
});

function showInfo(json){
    
    showAlert('');

    document.querySelector("#weather").classList.add('show');
    
    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;

    document.querySelector('#prediction-value').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;

    document.querySelector('#weather-description').innerHTML = `${json.description}`;
    
    document.querySelector('#img-prediction').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)

    document.querySelector('#max-temp').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;

    document.querySelector('#min-temp').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;

    document.querySelector('#humidity').innerHTML = `${json.humidity}<small>%</small>`;

    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)}<small>km/h</small>`;
}

function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}