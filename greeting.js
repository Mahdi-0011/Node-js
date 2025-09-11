/** @format */

const arg = process.argv.slice(2);
const name = arg[0];
const time = arg[1];

const greetings = {
  morgon: "god morgon",
  kväll: "god kväll",
  dag: "god dag",
  natt: "god natt",
};

const greeting = greetings[time] || "hej";

console.log(`${greeting}, ${name}!`);
