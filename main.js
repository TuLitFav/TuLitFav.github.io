// Función para agregar una nueva persona a la base de datos
function agregarPersona() {
  const persona = {
    nombre: document.getElementById('nombre').value,
    apellido: document.getElementById('apellido').value,
    fecha_nacimiento: document.getElementById('fecha_nacimiento').value,
    descripcion: document.getElementById('descripcion').value,
    imagen: document.getElementById('imagen').value,
  };

  fetch('http://localhost:3000/personas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(persona),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Persona guardada:', data);
    cargarPersonas(); // Recargar la lista de personas después de agregar
  })
  .catch(error => console.error('Error al agregar persona:', error));
}

// Función para obtener todas las personas de la base de datos
function cargarPersonas() {
  fetch('http://localhost:3000/personas')
    .then(response => response.json())
    .then(data => {
      const listaPersonas = document.getElementById('lista-personas');
      listaPersonas.innerHTML = ''; // Limpiar la lista antes de cargar nuevas personas

      data.forEach(persona => {
        const div = document.createElement('div');
        div.classList.add('persona');
        div.innerHTML = `
          <p><strong>${persona.nombre} ${persona.apellido}</strong></p>
          <p>Fecha de nacimiento: ${persona.fecha_nacimiento}</p>
          <p>Descripción: ${persona.descripcion}</p>
          <p><img src="${persona.imagen}" alt="Imagen" width="50"></p>
          <button onclick="archivarPersona('${persona._id}')">Archivar</button>
        `;
        listaPersonas.appendChild(div);
      });
    })
    .catch(error => console.error('Error al cargar personas:', error));
}

// Función para archivar una persona
function archivarPersona(id) {
  fetch(`http://localhost:3000/archivar/${id}`, {
    method: 'PATCH',
  })
  .then(response => response.json())
  .then(data => {
    console.log('Persona archivada:', data);
    cargarPersonas(); // Recargar la lista después de archivar
  })
  .catch(error => console.error('Error al archivar persona:', error));
}

// Cargar las personas cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
  cargarPersonas();
});
