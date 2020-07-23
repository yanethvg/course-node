const api_key = "fbe306afb5868f35f2acf4bcc7f74136";
const url_base_weather = "http://api.openweathermap.org/data/2.5/weather";

const getUrlWeatherByCity = (city) => {
    return `${url_base_weather}?q=${city}&appid=${api_key}&units=metric`;
};
module.exports = {
    getUrlWeatherByCity,
};