const args = process.argv.slice(2);

if (args.length < 2) {
  console.log("Använd: node temp.js <nummer> <C/F>");
  process.exit(1);
}

const value = parseFloat(args[0]);
const unit = args[1].toUpperCase();

let result;

if (unit === "C") {
  result = (value * 9/5) + 32;
  console.log(`${value}°C = ${result.toFixed(1)}°F`);
} else if (unit === "F") {
  result = (value - 32) * 5/9;
  console.log(`${value}°F = ${result.toFixed(1)}°C`);
} else {
  console.log("Använd C för Celsius eller F för Fahrenheit.");
}
