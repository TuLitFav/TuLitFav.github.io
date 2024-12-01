// Almacenar personas en localStorage
function obtenerPersonas() {
    return JSON.parse(localStorage.getItem('personas')) || [];
}

function guardarPersonas(personas) {
    localStorage.setItem('personas', JSON.stringify(personas));
}

// Agregar una persona a la lista
document.getElementById('guardarBtn').addEventListener('click', function() {
    const persona = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        fecha_nacimiento: document.getElementById('fecha_nacimiento').value,
        descripcion: document.getElementById('descripcion').value,
        estado: 'normal',  // 'normal', 'vistado', 'en-busqueda'
        id: Date.now(),
    };

    const personas = obtenerPersonas();
    personas.push(persona);
    guardarPersonas(personas);
    cargarPersonas();
    document.getElementById('formulario').reset();
});

// Cargar las personas desde localStorage
function cargarPersonas() {
    const personas = obtenerPersonas();
    const listaPersonas = document.getElementById('lista-personas');
    listaPersonas.innerHTML = '';

    personas.forEach(persona => {
        const div = document.createElement('div');
        div.classList.add('persona');
        div.classList.add(persona.estado);
        div.dataset.id = persona.id;
        div.innerHTML = `
            <p class="nombre">${persona.nombre} ${persona.apellido}</p>
            <p>Fecha de nacimiento: ${persona.fecha_nacimiento}</p>
            <p>${persona.descripcion}</p>
        `;
        div.addEventListener('click', function() {
            seleccionarPersona(persona.id);
        });
        listaPersonas.appendChild(div);
    });
}

// Filtrar personas por nombre
function filtrarPersonas() {
    const filtro = document.getElementById('searchInput').value.toLowerCase();
    const personas = obtenerPersonas();
    const listaPersonas = document.getElementById('lista-personas');
    listaPersonas.innerHTML = '';

    personas.filter(persona => persona.nombre.toLowerCase().includes(filtro))
        .forEach(persona => {
            const div = document.createElement('div');
            div.classList.add('persona');
            div.classList.add(persona.estado);
            div.dataset.id = persona.id;
            div.innerHTML = `
                <p class="nombre">${persona.nombre} ${persona.apellido}</p>
                <p>Fecha de nacimiento: ${persona.fecha_nacimiento}</p>
                <p>${persona.descripcion}</p>
            `;
            div.addEventListener('click', function() {
                seleccionarPersona(persona.id);
            });
            listaPersonas.appendChild(div);
        });
}

// Seleccionar una persona
let personaSeleccionada = null;

function seleccionarPersona(id) {
    personaSeleccionada = id;
    const personas = obtenerPersonas();
    const persona = personas.find(p => p.id === id);

    if (persona) {
        document.getElementById('motivoAviso').value = '';
        document.getElementById('verbalBtn').disabled = false;
        document.getElementById('buscarBtn').disabled = false;
        document.getElementById('borrarBtn').disabled = false;
    }
}

// Dar aviso verbal
function darAvisoVerbal() {
    if (!personaSeleccionada) return;

    const personas = obtenerPersonas();
    const persona = personas.find(p => p.id === personaSeleccionada);
    const motivo = document.getElementById('motivoAviso').value;
    if (!motivo) {
        alert('Por favor, ingresa el motivo del aviso verbal');
        return;
    }

    persona.estado = 'vistado';
    persona.motivoAviso = motivo;
    guardarPersonas(personas);
    cargarPersonas();
}

// Poner en búsqueda
function ponerEnBusqueda() {
    if (!personaSeleccionada) return;

    const personas = obtenerPersonas();
    const persona = personas.find(p => p.id === personaSeleccionada);

    persona.estado = 'en-busqueda';
    guardarPersonas(personas);
    cargarPersonas();
}

// Borrar registro
function borrarPersona() {
    if (!personaSeleccionada) return;

    const personas = obtenerPersonas();
    const filteredPersonas = personas.filter(p => p.id !== personaSeleccionada);
    guardarPersonas(filteredPersonas);
    cargarPersonas();
    document.getElementById('verbalBtn').disabled = true;
    document.getElementById('buscarBtn').disabled = true;
    document.getElementById('borrarBtn').disabled = true;
}

// Cargar personas al inicio
window.addEventListener('DOMContentLoaded', function() {
    cargarPersonas();
});
