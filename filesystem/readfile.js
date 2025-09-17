const fs = require('fs')

const filename = process.argv[2] 
if (!filename) {
  console.error('Ange ett filnamn som argument, t.ex. node readfile.js abc.txt')
  process.exit(1)
}

try {
  const data = fs.readFileSync(filename, 'utf8')
  console.log(data)
} catch (err) {
  console.error(`Fel vid läsning av fil: ${err.message}`)
}
