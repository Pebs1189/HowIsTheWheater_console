const fs = require('fs');
const axios = require('axios').default;

require('dotenv').config();

class Busquedas {
    historial = [];
    dbPath = './db/database.json';

    constructor() {
        //TODO: leer DB si existe
        this.leerDB();
    }

    get historialCapitalizado() {
        //capitalizar cada palabra
        this.historial.forEach( (val, i) => {
            this.historial[i] = val.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
        });

        return this.historial;
    }

    get paramsMapBox() {
        return {
            'access_token': process.env.MAPBOX_KEY || '',
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsOpenWeather() {
        return {
            'appid': process.env.OPENWEATHER_KEY || '',
            'units': 'metric',
            'lang':'es'
        }
    }

    async ciudad( lugar = '' ) {
        try {
            //peticion http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapBox
            });

            const resp = await instance.get(); 
            
            return resp.data.features.map( lugar => ({
                id:lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0], //longitud
                lat: lugar.center[1]  //latitud
            }));
        } catch (error) {
            return [];
        }
    }

    async climaLugar(lat, lon) {
        try {
            //peticion http
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather', //hay que tener cuidado, al llamar a la api sin el previo http(s)://, la llamada de axios falla.
                params: {lat, lon,...this.paramsOpenWeather}
            });

            const resp = await instance.get(); 
            const {weather , main} = resp.data; //en axios la respuesta está en el data

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            };
        } catch (error) {
            console.log(error);
        }
    }

    agregarHistorial( lugar='') {
        //prevenir duplicados
        if (this.historial.includes(lugar.toLocaleLowerCase())) {
            return;
        }

        this.historial = this.historial.splice(0, 5);

        this.historial.unshift(lugar.toLocaleLowerCase());
        //grabar en db
        this.grabarDB();
    }

    grabarDB() {
        const payload = {
            historial: this.historial
        };

        try {
            fs.writeFileSync(this.dbPath, JSON.stringify(payload));
        } catch (error) {
            console.log(error);
        }
    }

    leerDB(){
        if (fs.existsSync(this.dbPath)) {
            try {
                const info = fs.readFileSync(this.dbPath, {encoding:'utf-8'});
                const data = JSON.parse(info);

                this.historial = data.historial;
            } catch (error) {
                console.log(error);
            }
        }
    }
}

module.exports = Busquedas;