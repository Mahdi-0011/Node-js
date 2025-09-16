const numbers = process.argv.slice(2).map(Number);

let sum = 0;

for (let n of numbers) sum += n; 

console.log(`Tal: [${numbers}], Summa: ${sum}, Medelvärde: ${sum / numbers.length}`);
