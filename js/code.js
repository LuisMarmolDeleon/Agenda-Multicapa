const API_URL = 'https://www.raydelto.org/agenda.php'

async function submitForm() {
  const name = document.getElementById('name').value.trim()
  const lastname = document.getElementById('lastname').value.trim()
  const phone = document.getElementById('phone').value.trim()

  if (!name || !lastname || !phone) {
    alert('Todos los campos son obligatorios')
    return
  }

  const requestData = {
    nombre: name,
    apellido: lastname,
    telefono: phone,
  }

  try {
    await postData(API_URL, requestData)
    alert("Usuario agregado!")
  } catch (error) {
    alert("Hubo un error tratando de agregar...")
  }

  document.getElementById('name').value = ''
  document.getElementById('lastname').value = ''
  document.getElementById('phone').value = ''
  
  await loadData()
}

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return await response.json()
}

async function loadData() {
  try {
    const data = await getData(API_URL)
    const table = document.getElementById('tableData')
    table.innerHTML = ''
    data.forEach((item) => {
      table.innerHTML += `<tr>
        <td>${item.nombre}</td>
        <td>${item.apellido}</td>
        <td>${item.telefono}</td>
      </tr>`
    })
  } catch (error) {
    console.error("Error loading data:", error)
  }
}

async function getData(url = '') {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return await response.json()
}

loadData()