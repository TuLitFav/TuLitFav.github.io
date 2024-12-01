const saveBtn = document.getElementById('save-btn');
const personList = document.getElementById('person-list');
const archivedList = document.getElementById('archived-list');
const showArchived = document.getElementById('show-archived');
const threeDotsMenu = document.getElementById('three-dots');
const menuOptions = document.getElementById('menu-options');

// Guardar persona en la base de datos
saveBtn.addEventListener('click', async () => {
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const dob = document.getElementById('dob').value;
    const info = document.getElementById('info').value;
    const image = document.getElementById('image').files[0] ? document.getElementById('image').files[0].name : '';

    const person = { name, surname, dob, info, image };

    // Enviar los datos al servidor
    const response = await fetch('http://localhost:3000/personas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(person)
    });

    const newPerson = await response.json();
    showPeople(); // Actualizar la lista de personas
});

// Mostrar las personas activas
const showPeople = async () => {
    const response = await fetch('http://localhost:3000/personas');
    const people = await response.json();

    personList.innerHTML = '';
    people.forEach(person => {
        const div = document.createElement('div');
        div.classList.add('person-card');
        div.innerHTML = `
            <h3>${person.name} ${person.surname}</h3>
            <button class="archive-btn" onclick="archivePerson('${person._id}')">Archivar</button>
        `;
        personList.appendChild(div);
    });
};

// Archivar persona
const archivePerson = async (id) => {
    const response = await fetch(`http://localhost:3000/archivar/${id}`, { method: 'PATCH' });
    const archivedPerson = await response.json();
    showPeople(); // Actualizar la lista de personas activas
    showArchivedPeople(); // Actualizar la lista de personas archivadas
};

// Mostrar personas archivadas
const showArchivedPeople = async () => {
    const response = await fetch('http://localhost:3000/archivadas');
    const people = await response.json();

    archivedList.innerHTML = '';
    people.forEach(person => {
        const div = document.createElement('div');
        div.classList.add('person-card');
        div.innerHTML = `<h3>${person.name} ${person.surname} (Archivado)</h3>`;
        archivedList.appendChild(div);
    });
