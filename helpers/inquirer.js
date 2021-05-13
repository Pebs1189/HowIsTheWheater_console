const inquirer = require('inquirer');

require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.yellow} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.yellow} Listar tarea`
            },
            {
                value: '3',
                name: `${'3.'.yellow} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.yellow} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.yellow} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.yellow} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.yellow} Salir`
            }
        ]
    }
];

const pulseEnter = [
    {
        type: 'input',
        name: 'ENTER',
        message: `Pulse ${'ENTER'.green} para seguir.`,
    }
];

const inquireMenu = async () => {
    console.clear();

    console.log('========================='.green);
    console.log('  Seleccione una opción  '.white);
    console.log('=========================\n'.green);

    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;
};

const inquirePausa = async () => {
    console.log('\n');
    await inquirer.prompt(pulseEnter);
};

const leerImput = async (message) => {
    const question = [
        {
            type: 'input',
            name:'desc',
            message,
            validate( value ) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }

                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);

    return desc;
};

const listadoTareasBorrar = async (tareas = []) => {
    const choices = tareas.map( (tarea, i) => {
        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`.green
        }
    });

    choices.unshift({
        value:'0',
        name:`${'0.'.green} Cancelar`
    });

    const preguntas = [
        {
            type:'list',
            name:'id',
            message: 'Borrar',
            choices
        }
    ];

    const {id} = await inquirer.prompt(preguntas);

    return id;
};

const confirmar = async (message) => {
    const preguntas = [
        {
            type:'confirm',
            name:'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(preguntas);
    return ok;
};

const mostradoCheckList = async (tareas = []) => {
    const choices = tareas.map( (tarea, i) => {
        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`.green,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const preguntas = [
        {
            type:'checkbox',
            name:'ids',
            message: 'Selecciones',
            choices
        }
    ];

    const {ids} = await inquirer.prompt(preguntas);

    return ids;
};

module.exports = {
    inquireMenu,
    inquirePausa,
    leerImput,
    listadoTareasBorrar,
    confirmar,
    mostradoCheckList
};