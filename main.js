//info = bussinesLogic

let personas = [];




function addPerson(pid, pnombre, pciudad, pcumple, pemail){

    let newPerson ={
        id : pid,
        nombre : pnombre,
        ciudad : pciudad,
        cumpleanos : pcumple,
        email : pemail,
        petList : []
    }
    personas.push(newPerson);
    localStoragePersonList(personas);
}

function getPersonList(){
    let storeList = localStorage.getItem('localPersonList');
    if(storeList == null){
        personas = []
    }else{
        personas = JSON.parse(storeList);
    }
    return personas;
}

function localStoragePersonList(plist){
    localStorage.setItem('localPersonList', JSON.stringify(plist));
}

//Para agregar a la mascota

function encontrarPerson(pid){
    let personObj;
    for (let i = 0; i < personas.length; i++){
        if (personas[i].id == pid){
            personObj = personas[i];
        }
    }
    return personObj;
}

function addMascota(ppersonObj, ppetNombre, ptype, pgender){
    let newMascota = {
        nombre : ppetNombre,
        tipo : ptype,
        gender : pgender
    }
    let index = personas.indexOf(ppersonObj);
    ppersonObj.petList.push(newMascota);

    personas[index] = ppersonObj;
    localStoragePersonList(personas);
}






document.querySelector('#btnGuardarPersona').addEventListener('click', guardarPersona);
document.querySelector('#btnAsignar').addEventListener('click', agregarMascota);

imprimirTabla();
imprimirMascota();

function guardarPersona(){
    let gId = document.querySelector('#txtId').value,
        gNombre = document.querySelector('#txtNombre').value,
        gCiudad = document.querySelector('#txtCiudad').value,
        gCumple = document.querySelector('#txtCumpleanos').value,
        gCorreo = document.querySelector('#txtCorreo').value


    addPerson(gId, gNombre, gCiudad, gCumple, gCorreo);
    imprimirTabla();
}

function imprimirTabla(){

    let list = getPersonList(),
        tbody = document.querySelector('#friendsTable tbody');

    tbody.innerHTML = '';

    for(let i = 0; i < list.length; i++){
        let row = tbody.insertRow(i),
            idCell = row.insertCell(0),
            nombreCell = row.insertCell(1),
            ciudadCell = row.insertCell(2),
            cumpleCell = row.insertCell(3),
            correoCell = row.insertCell(4),
            selectCell = row.insertCell(5);



        idCell.innerHTML = list[i].id;
        nombreCell.innerHTML = list[i].nombre;
        ciudadCell.innerHTML = list[i].ciudad;
        cumpleCell.innerHTML = list[i].cumpleanos;
        correoCell.innerHTML = list[i].email;

        let inputSelect = document.createElement('input');
        inputSelect.type = 'radio';
        inputSelect.value = list[i].id;
        inputSelect.name = 'rbtPerson';
        selectCell.appendChild(inputSelect);



        tbody.appendChild(row);
        
    }
}

function agregarMascota(){
    let gNombre = document.querySelector('#txtMascota').value,
        gAnimal = document.querySelector('#txtAnimal').value,
        gGenero = document.querySelector('#txtGenero').value,
        personId = document.querySelector('#friendsTable tbody input[type=radio]:checked').value;

    let personObj = encontrarPerson(personId);

    addMascota(personObj, gNombre, gAnimal, gGenero);
    imprimirMascota();

}

function imprimirMascota(){
    let list = getPersonList(),
        tbody = document.querySelector('#animalTable tbody');

    tbody.innerHTML = '';
    //lista para recorrer amigos
    for(let i = 0; i < list.length; i++){
        //lista para recorrer animales de cada persona
        for(let j = 0; j < list[i].petList.length; j++){
            let row = tbody.insertRow(j),
                ownerCell = row.insertCell(0),
                nombreCell = row.insertCell(1),
                tipoCell = row.insertCell(2),
                generoCell = row.insertCell(3);

            ownerCell.innerHTML = list[i].nombre;
            nombreCell.innerHTML = list[i].petList[j].nombre;
            tipoCell.innerHTML = list[i].petList[j].tipo;
            generoCell.innerHTML = list[i].petList[j].gender;
        }
    }
}




