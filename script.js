let persons = [];
let visitedCount = 0;
let verbalWarningCount = 0;

document.getElementById('personForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const index = document
