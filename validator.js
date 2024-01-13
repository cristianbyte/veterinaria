console.log(localStorage.getItem("veterinaria"))

let fechaActual = new Date();

let data = JSON.parse(localStorage.getItem("veterinaria")) ? JSON.parse(localStorage.getItem("veterinaria")) : [{
    pet: 'Example',
    name: 'Example',
    cel: '3000000000',
    date: '2000-01-20',
    time: '00:00',
    text: 'none'
}]
let table = document.getElementsByClassName('table')[0]
// editing = (estado,  indice objeto)
let editing = [false, undefined]

const pet = document.getElementById('name_pet')
const name = document.getElementById('name_person')
const cel = document.getElementById('cel')
const date = document.getElementById('date')
const time = document.getElementById('time')
const text = document.getElementById('sintomas')

// añadir a la lista
function addData(objec) {
    data.push(objec)
}

// recolectar datos
function collectData() {
    return  {
        pet: document.getElementById('name_pet').value,
        name: document.getElementById('name_person').value,
        cel: document.getElementById('cel').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        text: document.getElementById('sintomas').value,
    }
}

function listenDelete(buttons) {
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            data.splice(button.getAttribute('data-id'), 1)
            updateTable()
        })
    })
}

function listenEdit(buttons) {
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            pet.value = data[button.getAttribute('data-id')].pet
            name.value = data[button.getAttribute('data-id')].name
            cel.value = data[button.getAttribute('data-id')].cel
            date.value = data[button.getAttribute('data-id')].date
            time.value = data[button.getAttribute('data-id')].time
            text.value = data[button.getAttribute('data-id')].text
            editing[0] = true
            editing[1] = button.getAttribute('data-id')
        })
    })
}

function updateTable() {
    console.log('updating...')
    let alldata = ''
    let id = 0
    table.innerHTML = `
    <thead>
    <tr>
    <th scope="col">Mascota</th>
    <th scope="col">Dueño</th>
    <th scope="col">Contacto</th>
    <th scope="col">Fecha</th>
    <th scope="col">Hora</th>
    <th scope="col">Sintomas</th>
    <th scope="col">Editar</th>
    </tr>
    </thead>
    <tbody>
    ${data.forEach((inf) => {
        console.log(fechaActual.toISOString().slice(0, 10), inf.date)
        alldata += `
        ${fechaActual.toISOString().slice(0, 10) == inf.date ? '<tr class="today" >':'<tr>' }
        <td>${inf.pet}</td>
        <td>${inf.name}</td>
        <td>${inf.cel}</td>
        <td>${inf.date}</td>
        <td>${inf.time}</td>
        <td>${inf.text}</td>
        <td >
        <button data-id='${id}' class='btn btn-danger bx bx-trash-alt'></button>
        <button data-id='${id++}'class="btn btn-primary bx bx-edit-alt" ></button>
        </td>
        </tr>
        `
    }), alldata
        }
</tbody>
`;
    listenDelete(document.querySelectorAll('td .btn-danger'))
    listenEdit(document.querySelectorAll('td .btn-primary'))
    localStorage.setItem("veterinaria", JSON.stringify(data));
}



// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            event.preventDefault()
            event.stopPropagation()
            if (editing[0]) {
                data[editing[1]] = collectData()
                updateTable()
                document.querySelector('form').reset()
                form.classList.remove('was-validated')
                editing = [false, undefined]
                return
            }
            form.classList.add('was-validated')
            if (form.checkValidity()) {
                addData(collectData())
                updateTable()
                document.querySelector('form').reset()
                form.classList.remove('was-validated')
            };

        }, false)
    })
})()

updateTable()