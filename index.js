const {leerImput, inquireMenu, inquirePausa, listarLugares} = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

require('colors');

const main = async () => {
    const busquedas = new Busquedas();
    let opt = '';

    do {
        opt = await inquireMenu();
        
        switch (opt) {
            case 1:
                //mostrar input
                const termino = await leerImput("Ciudad:");
                //buscar la ciudad
                const lugares = await busquedas.ciudad(termino);
                //seleccionar la ciudad
                const id = await listarLugares(lugares);
                const lugarSel = lugares.find(l => l.id === id);
                //obtener datos del clima de la ciudad seleccionada
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
                //mostrar resultados
                console.log('\nInformación de la ciudad \n'.green);
                console.log('Ciduad:', lugarSel.nombre);
                console.log('Lat:', lugarSel.lat);
                console.log('Lng:', lugarSel.lng);
                console.log('Temperatura:', clima.temp);
                console.log('Mínima:', clima.min);
                console.log('Máxima:', clima.max);
                console.log('Cómo está el clima?', clima.desc);
                break;
            case 2:
                break;
        }

        if (opt !== 0) await inquirePausa();
    } while ( opt !== 0 );

};

main();

