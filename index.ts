import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

let idGlobal = 1;

interface Task{
    id: number;
    title: string;
    completed: boolean;
}

const addTask = (tareaTexto:string) => {
    const tarea: Task = {
        id: idGlobal++,
        title: tareaTexto,
        completed: false,
    }
    tareas.push(tarea);
    console.log(`Tarea agregada: ${tarea.title}`);

};

const listTasks = () => {
    for (let i = 0; i < tareas.length; i++) {
        console.log("[", tareas[i].id, "]", tareas[i].title, " - ", tareas[i].completed ? "completed" : "pending");
    }
}

const removeTask = () => {
    const tareaEliminada = tareas.pop()!;
    console.log("Tarea eliminada: ", tareaEliminada.title);
}


const tareas : Task[] = [];
let opcionTexto : string;
let tareaTexto : string;
let opcion: number;

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
            addTask(tareaTexto);
            break;
            
        case 2:
            //Eliminar última tarea: elimina el último elemento del arreglo con .pop() e imprime el título eliminado
            removeTask();
            break;
        
        case 3:
            // Listar tareas: usa un ciclo for para recorrer el arreglo e imprimir cada título con su número de posición
            listTasks();
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



