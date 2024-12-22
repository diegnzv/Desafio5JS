const tareas = [
    { id: 33, descripcion: 'Compra del mes', completada: true },
    { id: 66, descripcion: 'Hacer deporte', completada: false },
    { id: 99, descripcion: 'Salir con los amigos', completada: true }
];

const entradaTarea = document.getElementById('entradaTarea');
const botonAgregarTarea = document.getElementById('botonAgregarTarea');
const listaTareas = document.getElementById('listaTareas');
const totalTareas = document.getElementById('totalTareas');
const tareasCompletadas = document.getElementById('tareasCompletadas');

function renderizarTareas() {
    listaTareas.innerHTML = '';
    tareas.forEach((tarea, indice) => {
        const fila = document.createElement('tr');

        const celdaID = document.createElement('td');
        celdaID.textContent = tarea.id;
        fila.appendChild(celdaID);

        const celdaDescripcion = document.createElement('td');
        celdaDescripcion.textContent = tarea.descripcion;
        fila.appendChild(celdaDescripcion);

        const celdaCompletada = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarea.completada;
        checkbox.onclick = () => alternarTarea(indice);
        celdaCompletada.appendChild(checkbox);
        fila.appendChild(celdaCompletada);

        const celdaAcciones = document.createElement('td');
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = '❌';
        botonEliminar.className = 'btn-delete';
        botonEliminar.onclick = () => eliminarTarea(indice);
        celdaAcciones.appendChild(botonEliminar);
        fila.appendChild(celdaAcciones);

        listaTareas.appendChild(fila);
    });

    actualizarEstadisticas();
}

function agregarTarea() {
    const descripcion = entradaTarea.value.trim();
    if (descripcion) {
        const nuevaTarea = {
            id: Date.now(),
            descripcion,
            completada: false
        };
        tareas.push(nuevaTarea);
        entradaTarea.value = '';
        renderizarTareas();
    }
}

function eliminarTarea(indice) {
    tareas.splice(indice, 1);
    renderizarTareas();
}

function alternarTarea(indice) {
    tareas[indice].completada = !tareas[indice].completada;
    renderizarTareas();
}

function actualizarEstadisticas() {
    totalTareas.textContent = tareas.length;
    tareasCompletadas.textContent = tareas.filter(tarea => tarea.completada).length;
}

botonAgregarTarea.onclick = agregarTarea;

renderizarTareas();
