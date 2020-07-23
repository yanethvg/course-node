const axios = require("axios");

const { getUrlWeatherByCity } = require("./getUrlWeather");

const getDataWeather = async(dir) => {
    const resp = await axios.get(getUrlWeatherByCity(dir));
    //console.log(resp);
    if (resp.data.cod == "404") {
        throw new Error(`No hay resultados para ${dir}`);
    } else {
        return resp.data;
    }
};
const getLugarLatLog = async(dir) => {
    const coordenadas = await getDataWeather(dir);
    const direccion = coordenadas.name;
    const lat = coordenadas.coord.lat;
    const lng = coordenadas.coord.lon;

    return {
        direccion,
        lat,
        lng,
    };
};

const getClima = async(dir) => {
    const weather = await getDataWeather(dir);
    const direccion = weather.name;
    const { temp, temp_max, temp_min, pressure, humidity } = weather.main;

    return {
        direccion,
        temp,
        temp_min,
        temp_max,
        pressure,
        humidity,
    };
};

const getInfo = async(dir) => {
    try {
        const encodedUrl = encodeURI(dir);
        const clima = await getClima(encodedUrl);
        const lon_lat = await getLugarLatLog(encodedUrl);
        const { direccion, temp } = clima;
        const { lat, lng } = lon_lat;

        return `El clima de ${direccion} es de ${temp} con una latitud de ${lat} y una longitud de ${lng}`;
    } catch (e) {
        return `No se pudo determinar el clima, longitud y latitud de: ${dir}`;
    }
};

module.exports = {
    getInfo,
};