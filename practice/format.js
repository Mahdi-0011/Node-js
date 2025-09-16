const args = process.argv;
const text = args[2];
const command = args[3];

let result = '';

if (command === 'upper') {
  result = text.toUpperCase();
} else if (command === 'lower') {
  result = text.toLowerCase();
} else if (command === 'reverse') {
  result = text.split('').reverse().join('');
} else {
  result = text;
}

console.log(result);
