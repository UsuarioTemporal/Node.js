console.log('Inicio de programa')

setTimeout(() => {
    console.log('Primer Timeout')
}, 30);

setTimeout(() => {
    console.log('Segundo timeout');
}, 0);
setTimeout(() => {
    console.log('Tercer timeout');
}, 0);

console.log('Fin del programa');