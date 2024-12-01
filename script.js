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
            img.style.width = '
