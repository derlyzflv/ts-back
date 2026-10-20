import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

let tareas : string[] = ["Diseñar wireframe", "Crear componentes"];

let opcionTexto : string;
let tareaTexto : string;
let tareaEliminada : string;
let opcion: number;
let i:number;
do
{
    console.log('======================');

    console.log("Seleccione una opcion: ");
    
    console.log('1. Agregar tarea');
    console.log('2. Eliminar última tarea');
    console.log('3. Listar tareas');
    console.log(`4. Salir`);
        
    const rl = readline.createInterface({ input, output });
    opcionTexto = await rl.question("* Opcion: ");
    opcion = parseInt(opcionTexto, 10)
    
    // MENU
    switch (opcion) {
        case 1:
            // Agregar tarea: lee el título que ingresa el usuario y agrégalo al arreglo con .push()
            tareaTexto = await rl.question("Escribe la tarea: ");
            tareas.push(tareaTexto);
            console.log(`Tarea agregada: ${tareaTexto}`);
            break;
            
        case 2:
            //Eliminar última tarea: elimina el último elemento del arreglo con .pop() e imprime el título eliminado
            tareaEliminada = tareas.pop()!;
            console.log(`Tarea eliminada: ${tareaEliminada}`);
            break;
        
        case 3:
            // Listar tareas: usa un ciclo for para recorrer el arreglo e imprimir cada título con su número de posición
            for(i = 0; i<tareas.length; i++){
                console.log(`Tarea: ${tareas[i]}  / Posicion: ${i}`);
            }
            break;
        
        case 4:
            // Salir: termina el ciclo
            break;
        
        default:
            break;
    } 

    rl.close();
}
while ( opcion != 4)