const axios = require('axios').default;

require('dotenv').config();

class Busquedas {
    historial = [];

    constructor() {
        //TODO: leer DB si existe
    }

    get paramsMapBox() {
        return {
            'access_token': process.env.MAPBOX_KEY || '',
            'limit': 5,
            'language': 'es'
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
            }))
        } catch (error) {
            return [];
        }
    }
}

module.exports = Busquedas;