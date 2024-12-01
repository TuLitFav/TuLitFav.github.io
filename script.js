const personList = document.getElementById('person-list');
const saveBtn = document.getElementById('save-btn');
const search = document.getElementById('search');

const people = JSON.parse(localStorage.getItem('people')) || []; // Cargar los datos desde LocalStorage o iniciar vacío

// Función para crear una tarjeta de persona
const createPersonCard = (person, index) => {
    const card = document.createElement('div');
    card.className = 'person-card';

    const header = document.createElement('div');
    header.className = 'person-header';

    const title = document.createElement('h3');
    title.textContent = `${person.name} ${person.surname}`;
    if (person.warning) title.classList.add('red');
    if (person.search) title.classList.add('yellow');
    header.appendChild(title);

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Detalles';
    toggleBtn.addEventListener('click', () => {
        details.style.display = details.style.display === 'none' ? 'block' : 'none';
    });
    header.appendChild(toggleBtn);

    const details = document.createElement('div');
    details.className = 'person-details';
    const imagePreview = person.image ? `<img src="${person.image}" alt="Imagen de ${person.name}" class="person-image">` : '';

    details.innerHTML = `
        ${imagePreview}
        <p><strong>Fecha de Nacimiento:</strong> ${person.dob}</p>
        <p><strong>Descripción:</strong> ${person.info}</p>
        <div class="actions">
            <button class="warning-btn">Aviso Verbal Dado</button>
            <textarea placeholder="Motivo del aviso"></textarea>
            <button class="search-btn">En Búsqueda</button>
            <button class="delete-btn">Borrar</button> <!-- Botón de Borrar -->
        </div>
    `;

    // Botón de "Aviso Verbal Dado"
    const warningBtn = details.querySelector('.warning-btn');
    warningBtn.addEventListener('click', () => {
        person.warning = !person.warning; // Alterna el estado de "aviso verbal"
        if (person.warning) {
            title.classList.add('red');
        } else {
            title.classList.remove('red');
        }
        saveToLocalStorage(); // Guardar los cambios en LocalStorage
    });

    // Botón de "En Búsqueda"
    const searchBtn = details.querySelector('.search-btn');
    searchBtn.addEventListener('click', () => {
        person.search = !person.search; // Alterna el estado de "en búsqueda"
        if (person.search) {
            title.classList.add('yellow');
        } else {
            title.classList.remove('yellow');
        }
        saveToLocalStorage(); // Guardar los cambios en LocalStorage
    });

    // Botón de Borrar
    const deleteBtn = details.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        const password = prompt("Por favor, ingresa la contraseña para borrar este registro:");

        // Verificar contraseña (aquí se puede hacer un control más seguro si se necesita)
        if (password === "tu_contraseña") { // Cambia esto por tu propia contraseña
            people.splice(index, 1); // Eliminar la persona del array
            saveToLocalStorage(); // Actualizar LocalStorage
            personList.removeChild(card); // Eliminar la tarjeta de la interfaz
        } else {
            alert("Contraseña incorrecta.");
        }
    });

    card.appendChild(header);
    card.appendChild(details);
    return card;
};

// Guardar persona y agregarla a la lista
const saveToLocalStorage = () => {
    localStorage.setItem('people', JSON.stringify(people)); // Guardar los datos en LocalStorage
    displayPeople(); // Actualizar la vista
};

// Mostrar todas las personas en la lista
const displayPeople = () => {
    personList.innerHTML = ''; // Limpiar lista antes de mostrar
    people.forEach((person, index) => {
        personList.appendChild(createPersonCard(person, index));
    });
};

// Guardar nueva persona
saveBtn.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const dob = document.getElementById('dob').value;
    const info = document.getElementById('info').value;
    const imageInput = document.getElementById('image');
    const image = imageInput.files.length ? URL.createObjectURL(imageInput.files[0]) : null;

    if (!name || !surname) {
        alert('Por favor, completa todos los campos obligatorios.');
        return;
    }

    const newPerson = { name, surname, dob, info, image, warning: false, search: false };
    people.push(newPerson);

    saveToLocalStorage(); // Guardar en LocalStorage
});

// Búsqueda dinámica
search.addEventListener('input', () => {
    const query = search.value.toLowerCase();
    Array.from(personList.children).forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = title.includes(query) ? 'block' : 'none';
    });
});

// Al cargar la página, mostrar las personas guardadas
displayPeople();

const API_URL = "junction.proxy.rlwy.net"; // Cambia esto por tu URL de Railway

