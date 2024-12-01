document.getElementById('characterForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const basicInfo = document.getElementById('basicInfo').value;

    const characterList = document.getElementById