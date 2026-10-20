import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

const rl = readline.createInterface({ input, output });
// 🚫 No eliminar las líneas de arriba ⬆️

// ✍️ Escribe tu código aquí 👇
let systemName : string = 'Restaurante';
let version : number  = 3.15;
let userName : string = 'Derlyz';

// 🚫 No eliminar las líneas de abajo ⬇️
rl.close();

console.log("==================================");
console.log(`  ${systemName} v${version}`);
console.log(`  ¡Bienvenido, [${userName}]!`);
console.log("==================================");