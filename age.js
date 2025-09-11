const year = process.argv[2];
const age = new Date().getFullYear() - year;
console.log(`Du är ${age} år gammal!`);