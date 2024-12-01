document.getElementById('characterForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe y la página se recargue

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const basicInfo = document.getElementById('basicInfo').value;
    const imageInput = document.getElementById('imageInput').files[0];

    const characterList = document.getElementById('characterList
