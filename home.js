let currentDate = new Date();
currentDate = currentDate.getHours() + currentDate.getMinutes() + currentDate.getSeconds();
let tableBody = document.getElementById('tableBody');
let phoneElement = document.getElementById("phoneInput");
let nameElement = document.getElementById("nameInput");
let emailElement = document.getElementById('emailInput');
let ageElement = document.getElementById('ageInput');
let genderMaleElement = document.getElementById('genderMale');
let currentStart = 1;
let pageLimit = 5;
let limitNoOfEntries = document.getElementById('noOfEntries');
let genderFemaleElement = document.getElementById('genderFemale');
let showOrHideButtonElement = document.getElementById('showOrHideButton');
let globalSearchElement = document.getElementById('globalSearch');
let presentCount = localStorage.getItem('presentCount');
let rightSelect = document.getElementById("rightSelect");
var areaOfIntrestValue = "";
console.log(presentCount);
// // storage object
let myStorage = {};
if(localStorage.getItem('data')){
    myStorage = JSON.parse(localStorage.getItem('data'));
}
// validating form
showOrHideButtonElement.textContent = 'HIDE';
globalSearchElement.style.display = 'block';
let table = document.getElementById('detailsTable');
table.style.display = "block";
let show = true;
let addData = true;
function validateForm(){
    validateDetails();
    if(addData){
        addToMyStorage();
    }
    makeTable(currentStart,limitNoOfEntries.value);
}
// making that in age input field to enter only digits
ageElement.addEventListener('input',() =>{
    ageElement.value = ageElement.value.replace(/\D/g,'');
    if((ageElement.value)>120){
        alert('invalid age > 120');
    }
})
// making that in phone input field to enter only digits
phoneElement.addEventListener('input',() =>{
    phoneElement.value = phoneElement.value.replace(/\D/g,'');
})
// making that in name input field to enter only characters and spaces
nameElement.addEventListener('input',()=>{
    nameElement.value = nameElement.value.replace(/[^a-zA-Z\s]/g,'');
})
function showOrHideButton(){
    if(show){
        showOrHideButtonElement.textContent= 'SHOW';
        document.getElementById('tableSection').style.display = 'none';
        // table.style.display = 'none';
        // globalSearchElement.style.display = 'none';
        show = false;
    }
    else{
        showOrHideButtonElement.textContent= 'HIDE';
        // table.style.display = 'block';
        // globalSearchElement.style.display = 'block';
        document.getElementById('tableSection').style.display = 'block';
        show = true;
        
    }
}
function addToMyStorage() {
    if (presentCount == null) {
        addToLocalStorage('presentCount', 0);
        console.log(presentCount);
    }

    presentCount = localStorage.getItem('presentCount');
    presentCount = parseInt(presentCount) || 0; // Convert to number and handle NaN case
    const tempObject = {
        'name': nameElement.value,
        'phone': phoneElement.value,
        'email': emailElement.value,
        'age': ageElement.value,
        'genderMale': genderMaleElement.checked,
        'genderFemale': genderFemaleElement.checked,
        'dateCreated': currentDate,
        'dateEdited': currentDate,
        'areaOfIntrests' : areaOfIntrestValue
    }

    presentCount = presentCount + 1;  // Increment after creating the new entry
    myStorage['entry' + presentCount] = tempObject;
    localStorage.setItem('data', JSON.stringify(myStorage));
    localStorage.setItem('presentCount', presentCount);  // Update presentCount in local storage
    console.log('data', localStorage.getItem('data'), myStorage);
}
function addToLocalStorage(id,data){
    localStorage.setItem(id,data);
}
//moving options
function moveOptions(sourceId, destinationId) {
    var sourceSelect = document.getElementById(sourceId);
    var destinationSelect = document.getElementById(destinationId);

    // Move selected options from source to destination
    for (var i = 0; i < sourceSelect.options.length; i++) {
            var option = sourceSelect.options[i];
            if (option.selected) {
                    destinationSelect.add(new Option(option.text, option.value));
                    sourceSelect.remove(i);
                    i--; // Adjust index since we removed an option
            }
    }
}
function validateDetails(){
    
    for (var i = 0; i < rightSelect.options.length; i++) {
        areaOfIntrestValue = areaOfIntrestValue + rightSelect.options[i].value;
    }
    if(nameElement.value.trim() == ""){
        alert('name should not be empty');
        addData = false;
        return;
    }
    if(phoneElement.value.toString().length!==10){
        alert('Invalid Phone Number');
        addData = false;
        return;
    }
    if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailElement.value))){
        alert('invalid email');
        addData = false;
        return;
    }
    if(!(genderFemaleElement.checked || genderMaleElement.checked)){
        alert('select gender');
        addData = false;
        return;
    }
    if(ageElement.value<18 || ageElement.value>120){
        alert("invalid age");
        addData = false;
        return;
    }
    if(areaOfIntrestValue == ""){
        alert("select area of intrests");
        addData = false;
        return;
    }
    // Iterate through the options in rightSelect and add their values to the array
    areaOfIntrestValue = "";
    for (var i = 0; i < rightSelect.options.length; i++) {
        areaOfIntrestValue = areaOfIntrestValue + rightSelect.options[i].value + ",";
    }

}
makeTable(currentStart,limitNoOfEntries.value);
function makeTable(currentStart,pageLimit){
    let myStorage = {};
    if(localStorage.getItem('data')){
        myStorage = JSON.parse(localStorage.getItem('data'));
    }
    tableBody.innerHTML = "";
    
    for(let i=currentStart;i<(parseInt(currentStart) + parseInt(pageLimit));i++){
        if(!(myStorage['entry'+(presentCount-i)])){
            console.log("stopped executing","current start ",currentStart,"present count ",presentCount);
            return;
        }
        let tempTr = document.createElement('tr');
        let temptdName = document.createElement('td');
        temptdName.textContent = myStorage['entry'+(presentCount-i+1)]['name'];
        let temptdPhone = document.createElement('td');
        temptdPhone.textContent = myStorage['entry'+(presentCount-i+1)]['phone'];
        let temptdEmail = document.createElement('td');
        temptdEmail.textContent = myStorage['entry'+(presentCount-i+1)]['email'];
        let temptdAge = document.createElement('td');
        temptdAge.textContent = myStorage['entry'+(presentCount-i+1)]['age'];
        let temptdIntrests = document.createElement('td');
        temptdIntrests.textContent = myStorage['entry'+(presentCount-i+1)]['areaOfIntrests'];
        // creating edit and delete button
        let tempEditButton = document.createElement('button');
        let tempDeleteButton = document.createElement('button');
        tempEditButton.textContent = 'Edit';

        tempEditButton.addEventListener('click',function(){
            // console.log('here we are editing',myStorage['entry'+(presentCount-i)]);
            editDetails(myStorage['entry'+(presentCount-i+1)],presentCount-i+1);
        });
        
        tempDeleteButton.textContent = 'Delete';
        let tempButtons = document.createElement('td');
        tempDeleteButton.addEventListener('click',function(){
            // console.log('here we are deleting',myStorage['entry'+(presentCount-i)]);
            deleteDetails(presentCount-i);
        });
        tempButtons.appendChild(tempEditButton);
        tempButtons.appendChild(tempDeleteButton);
        let temptdCreateOrEdit = document.createElement('td');
        temptdCreateOrEdit.textContent = myStorage['entry'+(presentCount-i)]['dateCreated'];
        tempTr.appendChild(temptdName);
        tempTr.appendChild(temptdPhone);
        tempTr.appendChild(temptdEmail);
        tempTr.appendChild(temptdAge);
        tempTr.appendChild(temptdIntrests);
        tempTr.appendChild(tempButtons);
        tempTr.appendChild(temptdCreateOrEdit);
        
        tableBody.appendChild(tempTr);
    }

    console.log("no of entries ",Object.keys(myStorage).length);
}
//search functionality
document.getElementById('globalSearch').addEventListener('input', function () {
    // Get input value
    const searchValue = this.value.toLowerCase();

    // Get table rows
    const rows = document.getElementById('detailsTable').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    let rowsLength = presentCount;
    // Loop through all rows
    for (let i = 0; i < rowsLength; i++) {
            const cells = rows[i].getElementsByTagName('td');
            let rowContainsValue = false;

            // Loop through cells in the current row
            for (let j = 0; j < cells.length; j++) {
                    const cellText = cells[j].textContent.toLowerCase();

                    // Check if the cell text contains the search value
                    if (cellText.includes(searchValue)) {
                            rowContainsValue = true;
                            break;
                    }
            }

            // Show or hide the row based on whether it contains the search value
            rows[i].style.display = rowContainsValue ? '' : 'none';
    }
});

function editDetails(editingObject, entryIndex) {
    document.getElementById('submitButton').style.display = 'none';
    console.log('editingObject editingObject ', editingObject);
    nameElement.value = editingObject['name'];
    phoneElement.value = editingObject['phone'];
    emailElement.value = editingObject['email'];
    ageElement.value = editingObject['age'];
    genderFemaleElement.checked = editingObject['genderFemale'],
    genderMaleElement.checked = editingObject['genderMale'];
    makeTable(currentStart, limitNoOfEntries.value);

    let saveButton = document.createElement('button');
    saveButton.textContent = "SAVE";
    saveButton.className = 'button';
    saveButton.id = 'saveButton';
    let topSection = document.getElementById('tableSection2');
    topSection.appendChild(saveButton);
    saveButton.addEventListener('click', () => {
        saveDetails(editingObject, entryIndex);
    });
    makeTable(currentStart, limitNoOfEntries.value);
}

function saveDetails(editingObject, entryIndex) {
    editingObject['name'] = nameElement.value;
    editingObject['phone'] = phoneElement.value;
    editingObject['email'] = emailElement.value;
    editingObject['age'] = ageElement.value;
    editingObject['genderFemale'] = genderFemaleElement.checked;
    editingObject['genderMale'] = genderMaleElement.checked;
    myStorage['entry' + entryIndex] = editingObject;
    localStorage.setItem('data', JSON.stringify(myStorage));
    document.getElementById('saveButton').style.display = 'none';
    document.getElementById('submitButton').style.display = 'block';
    location.reload();
}

// searches Name
document.getElementById('nameSearch').addEventListener('input', function () {
    const searchValue = this.value.toLowerCase();
    const rows = document.getElementById('detailsTable')
        .getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    let rowsLength = presentCount;
    for (let i = 0; i < rowsLength; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const firstCellText = cells[0].textContent.toLowerCase();
        const rowContainsValue = firstCellText.includes(searchValue);
        rows[i].style.display = rowContainsValue ? '' : 'none';
    }
});

// searches phone
document.getElementById('phoneSearch').addEventListener('input', function () {
    const searchValue = this.value.toLowerCase();
    const rows = document.getElementById('detailsTable')
        .getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    let rowsLength = presentCount;
    for (let i = 0; i < rowsLength; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const firstCellText = cells[1].textContent.toLowerCase();
        const rowContainsValue = firstCellText.includes(searchValue);
        rows[i].style.display = rowContainsValue ? '' : 'none';
    }
});

// searches email
document.getElementById('emailSearch').addEventListener('input', function () {
    const searchValue = this.value.toLowerCase();
    const rows = document.getElementById('detailsTable')
        .getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    let rowsLength = presentCount;
    for (let i = 0; i < rowsLength; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const firstCellText = cells[2].textContent.toLowerCase();
        const rowContainsValue = firstCellText.includes(searchValue);
        rows[i].style.display = rowContainsValue ? '' : 'none';
    }
});
// searches age
document.getElementById('ageSearch').addEventListener('input', function () {
    const searchValue = this.value.toLowerCase();
    const rows = document.getElementById('detailsTable')
        .getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    let rowsLength = presentCount;
    for (let i = 0; i < rowsLength; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const firstCellText = cells[3].textContent.toLowerCase();
        const rowContainsValue = firstCellText.includes(searchValue);
        rows[i].style.display = rowContainsValue ? '' : 'none';
    }
});
// searches intrests
document.getElementById('intrestsSearch').addEventListener('input', function () {
    const searchValue = this.value.toLowerCase();
    const rows = document.getElementById('detailsTable')
        .getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    let rowsLength = presentCount;
    for (let i = 0; i < rowsLength; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const firstCellText = cells[4].textContent.toLowerCase();
        const rowContainsValue = firstCellText.includes(searchValue);
        rows[i].style.display = rowContainsValue ? '' : 'none';
    }
});
//resetting form
function resetDetails(){
    var form = document.getElementById("inputForm");
    form.reset();

}
// search dates
document.getElementById('dateAndTime').addEventListener('input', function () {
    const searchValue = this.value.toLowerCase();
    const rows = document.getElementById('detailsTable')
        .getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    let rowsLength = presentCount;
    for (let i = 0; i < rowsLength; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const firstCellText = cells[5].textContent.toLowerCase(); 
        const rowContainsValue = firstCellText.includes(searchValue);
        rows[i].style.display = rowContainsValue ? '' : 'none';
    }
});

function deleteDetails(rowNumber){
    // console.log(delete myStorage['entry'+rowNumber]);
    
    // myStorage = JSON.parse(localStorage.getItem('data'));
    // delete myStorage['entry'+rowNumber];
    // localStorage.setItem('data',JSON.stringify(myStorage));
    // console.log('makeTable(currentStart,limitNoOfEntries.value);',currentStart,'  ',limitNoOfEntries.value );
    // makeTable(currentStart, limitNoOfEntries.value);
    // location.reload();
}
console.log(myStorage);
// sorting function 
function sortTable() {
    // Get the table
    let table = document.getElementById('detailsTable');

    // Get the rows of the tbody
    let rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

    // Convert the HTMLCollection to an array for easier manipulation
    let rowsArray = Array.from(rows);

    // Sort the array based on the text content of the first cell in each row
    rowsArray.sort((a, b) => {
        let aValue = a.cells[0].textContent.trim();
        let bValue = b.cells[0].textContent.trim();

        // Convert values to numbers for numeric sorting
        return isNaN(aValue) || isNaN(bValue) ? aValue.localeCompare(bValue) : aValue - bValue;
    });

    // Clear the existing table body content
    table.getElementsByTagName('tbody')[0].innerHTML = '';

    // Append the sorted rows back to the table body
    rowsArray.forEach(row => {
        table.getElementsByTagName('tbody')[0].appendChild(row);
    });
}

function nextEntries() {
    let tempLimit = limitNoOfEntries.value;
    console.log('currentStart,pageLimit',currentStart,tempLimit);
    console.log("next");
    
    console.log("next clicked");
    if(currentStart>Object.keys(myStorage).length){
        return;
    }
    if(currentStart<Object.keys(myStorage).length){
        if((parseInt(currentStart) + parseInt(tempLimit))>Object.keys(myStorage).length){
            makeTable(currentStart,Object.keys(myStorage).length);
            return;
        }
    }
    currentStart = parseInt(currentStart) + parseInt(tempLimit);
    makeTable(currentStart,tempLimit);
}
noOfEntries.addEventListener('input', function () {
    pageLimit = limitNoOfEntries.value; 
    makeTable(currentStart,pageLimit);
});
function prevEntries() {
    let tempLimit2 = limitNoOfEntries.value;
    console.log("prev");
    currentStart = currentStart - tempLimit2;
    
    if(currentStart<1){
        currentStart = 1;
    }
    console.log('currentStart,pageLimit',currentStart,tempLimit2);
    makeTable(currentStart,tempLimit2);
    console.log("prev clicked");
}

// sorting function 
function sortColumn(columnName) {
    // Get the table
    let table = document.getElementById('detailsTable');

    let columnValue = 0;
    if(columnName == "name"){
        columnValue = 0;
    }
    if(columnName == "phone"){
        columnValue = 1;
    }
    if(columnName == "email"){
        columnValue = 2;
    }
    if(columnName == "age"){
        columnValue = 3;
    }
    if(columnName == "intrests"){
        columnValue = 4;
    }
    if(columnName == "create"){
        columnValue = 6;
    }
    // Get the rows of the tbody
    let rows = table.getElementsByTagName('tbody')[parseInt(columnValue)].getElementsByTagName('tr');

    // Convert the HTMLCollection to an array for easier manipulation
    let rowsArray = Array.from(rows);

    // Sort the array based on the text content of the first cell in each row
    rowsArray.sort((a, b) => {
        let aValue = a.cells[parseInt(columnValue)].textContent.trim();
        let bValue = b.cells[parseInt(columnValue)].textContent.trim();

        // Convert values to numbers for numeric sorting
        return isNaN(aValue) || isNaN(bValue) ? aValue.localeCompare(bValue) : aValue - bValue;
    });

    // Clear the existing table body content
    table.getElementsByTagName('tbody')[parseInt(columnValue)].innerHTML = '';

    // Append the sorted rows back to the table body
    rowsArray.forEach(row => {
        table.getElementsByTagName('tbody')[parseInt(columnValue)].appendChild(row);
    });
}