const arg = process.argv[2];
const pris = Number(process.argv[2]);
const rabatt = Number(process.argv[3]);

const slutPris = pris * (1 - rabatt / 100);

console.log(`Pris: ${pris}kr, Rabatt: ${rabatt}%, Slutpris: ${slutPris}kr`);
