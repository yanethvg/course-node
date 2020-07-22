//requires
const fs = require("fs");
const colors = require("colors");

module.exports.mostrarTabla = (base, limite) => {
    return new Promise((resolve, reject) => {
        if (!Number(base) || !Number(limite)) {
            reject(`El valor introducido ${base} o ${limite} no es un numero `);
            return;
        }
        let data = "";
        console.log("==================".green);
        console.log(`tabla de ${base}`.green);
        console.log("==================".green);
        for (let i = 1; i <= limite; i++) {
            //console.log(`${base} * ${i} = ${base * i}`);
            data += `${base} * ${i} = ${base * i} \n`;
        }
        resolve(data);
    });
};

/*
let listarTabla = (base, limite = 10) => {

    console.log('=================='.green);
    console.log(`tabla de ${ base }`.green);
    console.log('=================='.green);

    for (let i = 1; i <= limite; i++) {
        console.log(`${ base } * ${ i } = ${ base * i }`)
    }


}

*/
module.exports.crearArchivo = (base, limite = 10) => {
    return new Promise((resolve, reject) => {
        if (!Number(base)) {
            reject(`El valor introducido ${base} no es un numero `);
            return;
        }
        let data = "";

        for (let i = 1; i <= limite; i++) {
            //console.log(`${base} * ${i} = ${base * i}`);
            data += `${base} * ${i} = ${base * i} \n`;
        }

        fs.writeFile(`tablas/tabla-${base}-al-${limite}.txt`, data, (err) => {
            if (err) reject(err);
            else resolve(`tabla-${base}-al-${limite}.txt`);
        });
    });
};

/*
let crearArchivo = (base) => {
    return new Promise((resolve, reject) => {
        let data = "";

        for (let i = 1; i <= 10; i++) {
            //console.log(`${base} * ${i} = ${base * i}`);
            data += `${base} * ${i} = ${base * i} \n`;
        }

        fs.writeFile(`tablas/tabla${base}.txt`, data, (err) => {
            if (err) reject(err);
            else resolve(`tabla-${base}.txt`);
        });
    });
};

module.exports = {
    crearArchivo,
};*/