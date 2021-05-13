const {leerImput, inquireMenu, inquirePausa} = require('./helpers/inquirer');
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
                const lugar = await leerImput("Ciudad:");
                //buscar la ciudad
                
                //seleccionar la ciudad

                //obtener datos del clima de la ciudad seleccionada

                //mostrar resultados
                console.log('\nInformación de la ciudad \n'.green);
                console.log('Ciduad:', );
                console.log('Lat:', );
                console.log('Lng:', );
                console.log('Temperatura:', );
                console.log('Mínima:', );
                console.log('Máxima:', );
                break;
            case 2:
                break;
        }

        if (opt !== 0) await inquirePausa();
    } while ( opt !== 0 );

};

main();

