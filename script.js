document.getElementById('characterForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const basicInfo = document.getElementById('basicInfo').value;

    const characterList = document.getElementById
let currentCharacter = null; // Variable para almacenar el personaje actual

document.getElementById('characterForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const basicInfo = document.getElementById('basicInfo').value;
    const imageInput = document.getElementById('imageInput').files[0];

    const characterList = document.getElementById('characterList');
    const listItem = document.createElement('li');
    listItem.textContent = `${firstName} ${lastName} - ${basicInfo}`;
    
    // Crear un contenedor para la imagen
    if (imageInput) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.width = '50px'; // Ajustar el tamaño de la imagen
            img.style.marginLeft = '10px';
            listItem.appendChild(img);
        };
        reader.readAsDataURL(imageInput);
    }

    listItem.dataset.firstName = firstName; // Guardar el nombre para referencia
    listItem.dataset.lastName = lastName; // Guardar el apellido para referencia
    characterList.appendChild(listItem);

    // Limpiar el formulario
    this.reset();
    currentCharacter = listItem; // Guardar el personaje actual
});

document.getElementById('reportVisited').addEventListener('click', function() {
    if (currentCharacter) {
        const reason = 'Visitado';
        const redDot = document.createElement('span');
        redDot.className = 'red-dot';
        currentCharacter.appendChild(redDot);
        currentCharacter.textContent += ` (${reason})`;
let currentCharacter = null; // Variable para almacenar el personaje actual

document.getElementById('characterForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const basicInfo = document.getElementById('basicInfo').value;
    const imageInput = document.getElementById('imageInput').files[0];

    const characterList = document.getElementById('characterList');
    const listItem = document.createElement('li');
    listItem.textContent = `${firstName} ${lastName} - ${basicInfo}`;
    
    // Crear un contenedor para la imagen
    if (imageInput) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.width = '50px'; // Ajustar el tamaño de la imagen
            img.style.marginLeft = '10px';
            listItem.appendChild(img);
        };
        reader.readAsDataURL(imageInput);
    }

    listItem.dataset.firstName = firstName; // Guardar el nombre para referencia
    listItem.dataset.lastName = lastName; // Guardar el apellido para referencia
    characterList.appendChild(listItem);

    // Limpiar el formulario
    this.reset();
    currentCharacter = listItem; // Guardar el personaje actual
});

// Función para reportar como visitado
document.getElementById('reportVisited').addEventListener('click', function() {
    if (currentCharacter) {
        const reason = 'Visitado';
        const redDot = document.createElement('span');
        redDot.className = 'red-dot';
        currentCharacter.appendChild(redDot);
        currentCharacter.textContent += ` (${reason})`;
    } else {
        alert('Por favor, agrega un personaje primero.');
    }
});

// Función para dar aviso verbal
document.getElementById('reportVerbalWarning').addEventListener('click', function() {
    if (currentCharacter) {
        const reason = 'Aviso Verbal';
        const redDot = document.createElement('span');
        redDot.className = 'red-dot';
        currentCharacter.appendChild(redDot);
        currentCharacter.textContent += ` (${reason
