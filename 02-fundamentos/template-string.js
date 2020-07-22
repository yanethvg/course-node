let nombre = "Deadpool";
let real = "Wade Winston";

// console.log(nombre + ' ' + real);
// console.log(`${ nombre } ${ real }`);

// let nombreCompleto = nombre + ' ' + real;
// let nombreTemplate = `${ nombre } ${ real }`;

// sintacticamente son iguales
// console.log(nombreCompleto === nombreTemplate);

// nombre y real existe en todo el main del programa
function getNombre() {
    return `${nombre} ${real}`;
}

console.log(`El nombre de: ${getNombre()}`);