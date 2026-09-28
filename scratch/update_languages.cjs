const fs = require('fs');

const f = 'src/data/students.ts';
let c = fs.readFileSync(f, 'utf8');
c = c.replace(/\{ name: "([^"]+)", level: (\d) \}/g, '{ name: "$1", conversacao: $2, leitura: $2, escuta: $2 }');
fs.writeFileSync(f, c);
