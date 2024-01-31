let table = document.getElementById('detailsTable');
let tableBody = document.getElementById('tableBody');
let phoneElement = document.getElementById("phoneInput");
let nameElement = document.getElementById("nameInput");
let emailElement = document.getElementById('emailInput');
let ageElement = document.getElementById('ageInput');
let genderMaleElement = document.getElementById('genderMale');
let genderFemaleElement = document.getElementById('genderFemale');
let areaOfIntrestValue = "";
let pageLimit = 5;
let pageStart = 0;
let dateValue = new Date();
let newElement = true;
let show = true;
let edit = false;
let showOrHideButtonElement = document.getElementById('showOrHideButton');
showOrHideButtonElement.textContent = 'HIDE';
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
// details array
let detailsArray = [];
if(localStorage.getItem('data')){
    detailsArray = JSON.parse(localStorage.getItem('data'));
}
createTable(detailsArray,pageLimit,pageStart);
if(localStorage.getItem('data')){
    detailsArray = JSON.parse(localStorage.getItem('data'));
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
//form validation
let addData = true;
function validateForm(){
    validateDetails();
    if(addData){
        console.log('completed Validation');
    }
    newElement = true;
    resetDetails();
    createTable(detailsArray,pageLimit,pageStart);
}


// validating details
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
    if(newElement = true){
        dateValue = new Date();
    }
    if(edit == true){
        return;
    }
    // adding all details to the array
    let tempDetailsObject = {'name':nameElement.value,'phone':phoneElement.value,'email':emailElement.value,
        'age':ageElement.value,'male':genderMaleElement.checked,'female':genderFemaleElement.checked,'intrests':areaOfIntrestValue,
        'date':dateValue.getFullYear()+dateValue.getMonth()+dateValue.getDate()+" "+dateValue.getHours() + "hr " + dateValue.getMinutes() + "mins " + dateValue.getSeconds()
    }
    //making details unique
    if(edit !=true){
        let lengthOfArray = detailsArray.length;
    for(let i=0;i<lengthOfArray;i++){
        if(detailsArray[i]['name'] == nameElement.value){
            alert ('User with same details already present try another');
            addData = false;
            return;
        }
    }
    }
    // pushing that array to local storage
    detailsArray.push(tempDetailsObject);
    console.log(detailsArray);
    localStorage.setItem('data',JSON.stringify(detailsArray));
}
//resetting form details
function resetDetails(){
    var form = document.getElementById("inputForm");
    form.reset();
    
}

//creating the table based on the data array
function createTable(detailsArray, pageLimit, pageStart) {
    if (pageStart > detailsArray.length) {
        return;
    }

    tableBody.innerHTML = "";
    let tempLimit = pageStart + pageLimit;

    for (let i = pageStart; i < detailsArray.length; i++) {
        if (i >= tempLimit) {
            return;
        }

        let tempRow = document.createElement('tr');
        let tempName = document.createElement('td');
        tempName.textContent = detailsArray[i]['name'];
        let tempPhone = document.createElement('td');
        tempPhone.textContent = detailsArray[i]['phone'];
        let tempEmail = document.createElement('td');
        tempEmail.textContent = detailsArray[i]['email'];
        let tempAge = document.createElement('td');
        tempAge.textContent = detailsArray[i]['age'];
        let tempIntrests = document.createElement('td');
        tempIntrests.textContent = detailsArray[i]['intrests'];
        

        // Move the dateValue inside the loop to generate a new date for each entry
        let tempCreatedOrEditedDate = document.createElement('td');
        
        tempCreatedOrEditedDate.textContent = detailsArray[i]['date'];

        let tempEditOrDelete = document.createElement('td');
        let tempEditButton = document.createElement('button');
        tempEditButton.className = 'editOrDeleteButtons button';
        tempEditButton.textContent = "edit";
        let tempDeleteButton = document.createElement('button');
        tempDeleteButton.textContent = "delete";
        tempDeleteButton.className = 'editOrDeleteButtons button';
        tempDeleteButton.addEventListener('click',()=>{
            deleteDetails(i);
        });
        tempEditButton.addEventListener('click',()=>{
            editDetails(i);
        })
        tempEditOrDelete.appendChild(tempEditButton);
        tempEditOrDelete.appendChild(tempDeleteButton);

        tempRow.appendChild(tempName);
        tempRow.appendChild(tempPhone);
        tempRow.appendChild(tempEmail);
        tempRow.appendChild(tempAge);
        tempRow.appendChild(tempIntrests);
        tempRow.appendChild(tempEditOrDelete);
        tempRow.appendChild(tempCreatedOrEditedDate);

        tableBody.appendChild(tempRow);
    }
}

// next entries
function nextEntries() {
    newElement = false;
    pageStart = pageStart + pageLimit;
    console.log("prev start", "page start",pageStart,"page limit",pageLimit);
    if(pageStart>detailsArray.length){
        pageStart = pageStart-pageLimit;
        createTable(detailsArray,pageLimit,pageStart);
        return;
    }
    console.log('pageStart',pageStart);
    createTable(detailsArray,pageLimit,pageStart);
}
// prev entries
function prevEntries() {
    newElement = false;
    pageStart = pageStart - (pageLimit);
    console.log("prev start", "page start",pageStart,"page limit",pageLimit);
    if(pageStart<1){
        pageStart = 0;
        createTable(detailsArray,pageLimit,pageStart);
        console.log("prev ended");
        return;
    }
    createTable(detailsArray,pageLimit,pageStart);
}

// Add an event listener for the 'input' event on the search input
let searchInput = document.getElementById('globalSearch');
searchInput.addEventListener('input', function () {
    searchTable();
});

// Search function
function searchTable() {
    let searchTerm = searchInput.value.toLowerCase();
    let filteredArray = detailsArray.filter(entry => {
        return (
            entry.name.toLowerCase().includes(searchTerm) ||
            entry.phone.includes(searchTerm) ||
            entry.email.toLowerCase().includes(searchTerm) ||
            entry.age.toString().includes(searchTerm) ||
            entry.intrests.includes(searchTerm)
        );
    });

    createTable(filteredArray, pageLimit, 0); // Display the filtered data starting from the first page
}
//serach at column level
// Add an event listener for the 'input' event on the search input
let searchInputAtColumn1 = document.getElementById('nameSearch');
searchInputAtColumn1.addEventListener('input', function () {
    searchColumn('name',searchInputAtColumn1);
});
let searchInputAtColumn2 = document.getElementById('phoneSearch');
searchInputAtColumn2.addEventListener('input', function () {
    searchColumn('phone',searchInputAtColumn2);
});
let searchInputAtColumn3 = document.getElementById('emailSearch');
searchInputAtColumn3.addEventListener('input', function () {
    searchColumn('email',searchInputAtColumn3);
});
let searchInputAtColumn4 = document.getElementById('ageSearch');
searchInputAtColumn4.addEventListener('input', function () {
    searchColumn('age',searchInputAtColumn4);
});
let searchInputAtColumn5 = document.getElementById('intrestsSearch');
searchInputAtColumn5.addEventListener('input', function () {
    searchColumn('intrests',searchInputAtColumn5);
});
let searchInputAtColumn7 = document.getElementById('dateSearch');
searchInputAtColumn7.addEventListener('input', function () {
    searchColumn('date',searchInputAtColumn7);
});

function searchColumn(columnName,searchInputAtColumn) {
    let searchTerm = searchInputAtColumn.value.toLowerCase();
    let filteredArray = detailsArray.filter(entry => {
        // Check if the specified column name exists in the entry
        if (entry.hasOwnProperty(columnName)) {
            // Check if the specified column contains the search term
            return entry[columnName].toString().toLowerCase().includes(searchTerm);
        } else {
            console.error("Invalid column name.");
            return false;
        }
    });

    createTable(filteredArray, pageLimit, 0); // Display the filtered data starting from the first page
}
function editDetails(index){
    document.getElementById('inputForm').reset();
    document.getElementById('optionGroupRight').innerHTML = "";
    document.getElementById('optionGroupLeft').innerHTML = '<option id="option1">c</option><option id="option2">Java</option><option id="option3">Python</option><option id="option4">HTML</option>'
    nameElement.value = detailsArray[index]['name'];
    phoneElement.value = detailsArray[index]['phone'];
    emailElement.value = detailsArray[index]['email'];
    ageElement.value = detailsArray[index]['age'];
                                        // making the intrests reset
    let intrestsArray = detailsArray[index]['intrests'].split(",");
    let intrestsMainArray = ['c','Java','Python','HTML'];
    
    let leftSelect = document.getElementById('leftSelect');
    let rightSelect = document.getElementById('rightSelect');

    leftSelect.innerHTML = "";
    rightSelect.innerHTML = "";
    // Populate rightSelect with array2 values
    intrestsArray.forEach(value => {
        let option = document.createElement('option');
        option.value = value;
        option.text = value;
        rightSelect.add(option);
    });
    // Calculate the difference between array1 and array2
    let differenceArray = intrestsMainArray.filter(value => !intrestsArray.includes(value));
    // Populate leftSelect with the difference values
    differenceArray.forEach(value => {
        let option = document.createElement('option');
        option.value = value;
        option.text = value;
        leftSelect.add(option);
    });
                                            //ended intrests reset
    console.log(detailsArray[index]['name']);

    if(detailsArray[index]['male'].checked == true){
        genderMaleElement.checked = true;
        genderFemaleElement.checked = false;
    }else{
        genderFemaleElement.checked = true;
        genderMaleElement.checked = false;
    }
    let saveButton = document.createElement('button');
    saveButton.textContent = "SAVE";
    saveButton.className = 'button';
    saveButton.id = "saveButton";
    saveButton.addEventListener('click',()=>{
        saveDetails(index);
    })
    document.getElementById('tableSection2').appendChild(saveButton);
    document.getElementById('submitButton').style.display = 'none';
}
function saveDetails(index){
    validateDetails();
    detailsArray[index]['name'] = nameElement.value;
    detailsArray[index]['phone'] = phoneElement.value;
    detailsArray[index]['email'] = emailElement.value;
    detailsArray[index]['age'] = ageElement.value;
    detailsArray[index]['male'] = genderMaleElement.checked;
    detailsArray[index]['female'] = genderFemaleElement.checked;
    
    document.getElementById('leftSelect').innerHTML = '<optgroup id="optionGroupLeft"><option id="option1">c</option><option id="option2">Java</option><option id="option3">Python</option><option id="option4">HTML</option></optgroup>';
    document.getElementById('rightSelect').innerHTML = "";
    localStorage.setItem('data',JSON.stringify(detailsArray));
    createTable(detailsArray, pageLimit, pageStart);

    resetDetails();
    document.getElementById('submitButton').style.display = 'block';
    document.getElementById('saveButton').style.display = 'none';
}
function arrayDifference(arr1, arr2) {
    return arr1.filter(item => !arr2.includes(item));
}
function deleteDetails(index){
    let result = window.confirm("Do you want to proceed?");

    if (result) {
        // User clicked "OK" or "Yes"
        console.log("User clicked OK");
    } else {
        // User clicked "Cancel" or "No"
        return;
    }
    console.log(detailsArray[index]);
    detailsArray.splice(index,1);
    console.log(detailsArray);
    localStorage.setItem('data',JSON.stringify(detailsArray));
    createTable(detailsArray, pageLimit, pageStart);
}
document.getElementById('noOfEntries').addEventListener('input',()=>{
    pageLimit = document.getElementById('noOfEntries').value;
    createTable(detailsArray, pageLimit, pageStart);
});

let currentColumn = -1; // Variable to store the currently sorted column
let ascending = true; // Variable to track the sorting order

function sortTable(columnIndex) {
    let rows = Array.from(table.tBodies[0].rows); // Exclude the header and footer rows

    // Sort the rows based on the specified column
    rows.sort((a, b) => {
        let aValue = a.cells[columnIndex].textContent.trim();
        let bValue = b.cells[columnIndex].textContent.trim();

        if (!isNaN(parseFloat(aValue)) && !isNaN(parseFloat(bValue))) {
            // If the values are numbers, compare as numbers
            return parseFloat(aValue) - parseFloat(bValue);
        } else {
            // If the values are strings, compare as strings
            return aValue.localeCompare(bValue);
        }
    });

    // Reverse the order if the same column is clicked again
    if (currentColumn === columnIndex) {
        ascending = !ascending;
    } else {
        ascending = true;
    }

    // Apply the sorting order
    if (!ascending) {
        rows.reverse();
    }

    // Re-append the sorted rows to the table body
    for (let row of rows) {
        table.tBodies[0].appendChild(row);
    }

    // Update the currently sorted column
    currentColumn = columnIndex;
}
