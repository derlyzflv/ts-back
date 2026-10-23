import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

let idGlobal = 1;

interface Task {
    id: number;
    title: string;
    completed: boolean;
}

/* 
3. Hacer addTask asíncrona con await#
Agrega la palabra clave async a addTask y, antes de confirmar que la tarea fue agregada, usa await saveToDB(...) para esperar a que la simulación termine.

El programa debe “pausar” en ese punto hasta recibir respuesta — igual que lo haría con una base de datos real.

Recuerda: ahora que addTask es async, devuelve una Promise. Cuando la llames desde el menú debes agregar await delante: await addTask(title). Sin el await, el programa no esperará a que termine y continuará inmediatamente. */

/* 
4. Manejo de errores con try/catch#
Envuelve todo el cuerpo de addTask en un bloque try/catch. Si el título que ingresa el usuario llega vacío, lanza un error con throw new Error(...). El bloque catch debe capturarlo e imprimir el mensaje en consola sin que el programa se rompa.
 */

const addTask = async (tareaTexto: string): Promise<void> => {
    try {
        if (tareaTexto.trim() === "") {
            throw new Error("El título de la tarea no puede estar vacío");
        }
        const tarea: Task = {
            id: idGlobal++,
            title: tareaTexto,
            completed: false,
        }
        tareas.push(tarea);
        await saveToDB(tarea);
        //console.log(`Tarea agregada: ${tarea.title}`);
    } catch (error) {
        if (error instanceof Error) {
            console.log(`ERROR: ${error.message}`);
        }
    }
};

const listTasks = () => {
    // for (let i = 0; i < tareas.length; i++) {
    //     console.log("[", tareas[i].id, "]", tareas[i].title, " - ", tareas[i].completed ? "completed" : "pending");
    // }
    imprimirTareas(tareas);
}
/* Actualmente removeTask solo puede eliminar la última tarea del arreglo. ¿Qué pasaría si el usuario quisiera eliminar una tarea específica?

Objetivo: Mejora la función para que reciba un id como parámetro y elimine la tarea correspondiente sin importar su posición en el arreglo. Actualiza también la opción del menú para que solicite el id al usuario.

No hay una única forma correcta de resolverlo — explora, experimenta y elige la que más sentido te haga. Algunas pistas de métodos que podrían servirte:

.findIndex() + .splice()
.filter()
.forEach() con lógica propia
Haz un commit con tu solución cuando termines: */

const removeTask = (id: number) => {
    const tareaEliminada: number = tareas.findIndex((t: Task) => t.id === id);
    if (tareaEliminada !== -1) {
        const tareaTitulo: Task = tareas.find((t: Task) => t.id === id)!;
        tareas.splice(tareaEliminada, 1);
        console.log("Tarea eliminada: ", tareaTitulo.title);
    } else {
        console.log("ERROR: Tarea no encontrada");
    }
}

const completarTarea = (id: number) => {
    const tareaCompletada: Task | undefined = tareas.find((t: Task) => t.id === id);
    if (tareaCompletada !== undefined) {
        tareaCompletada.completed = true;
        console.log(tareaCompletada);
    } else {
        console.log("ERROR: Tarea no encontrada");
    }
}

const listaPendientes = () => {
    const tareasPendientes: Task[] = tareas.filter((t: Task) => t.completed === false);
    console.log(tareasPendientes);
}
const listaCompletados = () => {
    const tareasCompletadas: Task[] = tareas.filter((t: Task) => t.completed === true);
    console.log(tareasCompletadas);
}

const imprimirTareas = (tareas: Task[]) => {
    const tareasEnTexto: string[] = tareas.map(({ id, title, completed }: Task) => {
        // guardar en cada indice una cadena de texto
        return `[${completed ? 'Completed' : 'No Completed'}] ID: ${id} - ${title}`;
    });
    tareasEnTexto.forEach(element => {
        console.log(element);
    });
}
/* 
2. Simular guardado en base de datos con una Promesa#
Crea una función saveToDB que reciba una Tarea y retorne una Promise. Dentro de la promesa, usa setTimeout de 2 segundos antes de resolverla — esto simula el tiempo que tomaría guardar datos en un servidor real.

Cuando la promesa resuelva, imprime un mensaje confirmando que la tarea fue guardada. */



const saveToDB = (tarea: Task): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Tarea guardada: ${tarea.title}`);
            resolve();
        }, 2000);
    });
}

const tareas: Task[] = [];
await addTask("Prototipo Home");
await addTask("Requisitos Funcionales");
await addTask("Interfaz Home");
let opcionTexto: string;
let tareaTexto: string;
let opcion: number;

do {
    console.log('======================');

    console.log("Seleccione una opcion: ");

    console.log('1. Agregar tarea');
    console.log('2. Eliminar tarea');
    console.log('3. Listar tareas');
    console.log(`4. Completar tarea`);
    console.log(`5. Listar Pendientes`);
    console.log(`6. Listas Completados`);
    console.log(`7. Salir`);

    const rl = readline.createInterface({ input, output });
    opcionTexto = await rl.question("* Opcion: ");
    opcion = parseInt(opcionTexto, 10)

    // MENU
    switch (opcion) {
        case 1:
            // Agregar tarea: lee el título que ingresa el usuario y agrégalo al arreglo con .push()
            tareaTexto = await rl.question("Escribe la tarea: ");
            await addTask(tareaTexto);
            break;

        case 2:
            //Eliminar última tarea: elimina el último elemento del arreglo con .pop() e imprime el título eliminado
            let idEliminado: string = await rl.question("Escribe el id de la tarea a eliminar: ");
            removeTask(parseInt(idEliminado, 10));
            break;

        case 3:
            // Listar tareas: usa un ciclo for para recorrer el arreglo e imprimir cada título con su número de posición
            listTasks();
            break;

        case 4:
            // Completar tarea
            let idCompletado: string = await rl.question("Escribe el id de la tarea completada: ");
            completarTarea(parseInt(idCompletado, 10));
            break;

        case 5:
            // Listar Pendientes
            listaPendientes();
            break;

        case 6:
            // Listar Completadas
            listaCompletados();
            break;

        case 7:
            // Salir: termina el ciclo
            console.log("HASTA LA  PROXIMA");
            break;

        default:
            console.log("¡¡¡ Comando no valido !!!")
            break;
    }

    rl.close();
}
while (opcion != 7)



