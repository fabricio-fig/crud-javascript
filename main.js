//Functions
const openModal = () => document.getElementById('modal').classList.add('active');

const closeModal = () => {
	document.getElementById('modal').classList.remove('active');
	clearFields();
}

//CRUD - CREATE READ UPDATE DELETE

//server connection
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? [];
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient));

//creat client
const createClient = (client) => {
	const dbClient = getLocalStorage();
	dbClient.push(client)
	setLocalStorage(dbClient);
}
//read list of clients from databse
const readClient = () => getLocalStorage();

//update client
const updateClient = (index, client) => {
	const dbClient = readClient();
	dbClient[index] = client
	setLocalStorage(dbClient)
}
//delete client
const deleteClient = (index) => {
	const dbClient = readClient();
	dbClient.splice(index, 1);
	setLocalStorage(dbClient);
}

//integration with html
const saveClient = () =>{
	if(isValidFields()){
		const client = {
			nome: document.getElementById('name').value,
			email: document.getElementById('email').value,
			celular: document.getElementById('phone').value,
			cidade: document.getElementById('city').value
		}
		createClient(client);
		updateTable();
		closeModal();
	}
}
const isValidFields = () => {
	return document.getElementById('form').reportValidity();
}
const clearFields = () =>{
	const fields = document.querySelectorAll('.modal-field');
	fields.forEach(field => field.value = '');
}
const clearTable = () =>{
	const rows = document.querySelectorAll('#tableClient>tbody tr');
	rows.forEach(row => row.parentNode.removeChild(row));
}
const createRow = (client, index) => {
	const newRow = document.createElement('tr');
	newRow.innerHTML = `<td>${client.nome}</td>
                    	    <td>${client.email}</td>
                    	    <td>${client.celular}</td>
                    	    <td>${client.cidade}</td>
                    <td>
                        <button type="button" class="button green" id="edit-${index}">Editar</button>
                        <button type="button" class="button red" id="delete-${index}">Excluir</button>
                    </td>`;
	document.querySelector('#tableClient>tbody').appendChild(newRow);
}
const updateTable = () => {
          const dbClient = readClient();
          clearTable();
          dbClient.forEach(createRow);
}
const editDelete = (event) =>{
	if(event.target.type == 'button'){
		console.log(event.target.id)
	}	
}

updateTable();
//Events
document.getElementById('addClient').addEventListener('click', openModal);
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('cancel').addEventListener('click', closeModal);
document.getElementById('save').addEventListener('click', saveClient);
document.querySelector('#tableClient>tbody').addEventListener('click', editDelete);
