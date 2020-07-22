// let nombre = 'Wolverine';

// if (true) {
//     let nombre = 'Magento';
// }

// console.log(nombre);

// VAR
// cuando se declara una variable con var se puede iniciar la cantidad
// que se crean necesarias, SIEMPRE TENDRA EL VALOR DE LA ULTIMO VALOR
/*
var nombre='Erick';
var nombre='Erick2';
*/

// LET
// la variable no se puede iniciar como en el caso de var SOLAMENTE UNA SOLA VEZ,
//SOLO SE PUEDE ASIGNAR
// se respeta el scope de la variable
let i = "Hola Mundo";

// i solo esta inicializado y existe dentro del for dentro de su scope
// por eso imprime el Hola mundo del scope de afuera del for
for (let i = 0; i <= 5; i++) {
    console.log(`i: ${i}`);
}

console.log(i);