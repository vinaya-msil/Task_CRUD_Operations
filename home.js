let detailsArray = {};
let lengthOfObject = 0;
let limitOfEntries = 5;
let locallyStoredObjectsLength = 0;
let tableBody = document.getElementById('tableBody');
if (localStorage.getItem('locallyStoredObjectsLength')) {
        locallyStoredObjectsLength = localStorage.getItem('locallyStoredObjectsLength');
        lengthOfObject = locallyStoredObjectsLength;
}

//search functionality
document.getElementById('searchInput').addEventListener('input', function () {
        // Get input value
        const searchValue = this.value.toLowerCase();

        // Get table rows
        const rows = document.getElementById('detailsTable').getElementsByTagName('tbody')[0].getElementsByTagName('tr');

        // Loop through all rows
        for (let i = 0; i < rows.length; i++) {
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
// some initializations
let currentStart = 1;
let table = document.getElementById("detailsTable");
let rowCount = table.rows.length;
// clearing local storage
// localStorage.clear();
//user details
let user_name = document.getElementById("userName");
let email = document.getElementById("userEmail");
let phone = document.getElementById("userPhone");
let age = document.getElementById("userAge");
let areaOfIntrest = document.getElementById("rightSelect");

// detailsTable
document.getElementById("detailsTable").style.display = "none";
let hide = false;
document.getElementById("displayOrHideTable").textContent = "SHOW";
function displayOrHideTable() {
        if (hide) {
                document.getElementById("detailsTable").style.display = "none";
                document.getElementById("displayOrHideTable").textContent = "SHOW";
                hide = false;
        } else {
                document.getElementById("detailsTable").style.display = "block";
                document.getElementById("displayOrHideTable").textContent = "HIDE";
                hide = true;
        }
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
// validating and adding the data to table
function validateAndAdd() {
        //validating
        //name
        if (user_name.value.length === 0) {
                alert("Name cannot be empty");
                return;
        }
        else if (!(/^[a-zA-Z\s]+$/.test(user_name.value))) {
                alert("name should only contain letters and spaces");
                return;
        }
        // email
        if (!(/\S+@\S+\.\S+/.test(email.value))) {
                alert("in email before and after @ and . should not be empty nor only white space character ");
                return;
        }
        // phone no
        if (!(/^[6-9]\d{9}$/).test(phone.value)) {
                alert("Number should be only digits and its length only 10 and start number greater than 5 ");
                return;
        }
        // age
        if (age.value < 18) {
                alert("Age should not be less than 18");
                return;
        }
        if (parseInt(age.value) > 120) {
                alert("Age should not be greater than 120");
                return;
        }
        // multi select
        var rightSelect = document.getElementById('rightSelect');
        var areaOfIntrestValue = "";

        // Iterate through the options in rightSelect and add their values to the array
        for (var i = 0; i < rightSelect.options.length; i++) {
                areaOfIntrestValue = areaOfIntrestValue + rightSelect.options[i].value + ",";
        }
        if (areaOfIntrestValue.length === 0) {
                alert("please selct any one or more areas of intreset");
        }

        let keyPresent = false;
        for (let i = 1; i <= lengthOfObject; i++) {
                if (user_name.value == localStorage.getItem("name" + i)) {
                        keyPresent = true;
                        break;
                }
        }
        if (keyPresent) {
                alert("Duplicate entry try entering new");
                return;
        }
        console.log(user_name.value in detailsArray);
        console.log(user_name.value);
        console.log(detailsArray);

        lengthOfObject++;
        let dynamicRow = document.createElement("tr");

        let tdName = document.createElement("td");
        tdName.textContent = user_name.value;
        dynamicRow.appendChild(tdName);
        let tdEmail = document.createElement("td");
        tdEmail.textContent = email.value;
        dynamicRow.appendChild(tdEmail);
        let tdPhone = document.createElement("td");
        tdPhone.textContent = phone.value;
        dynamicRow.appendChild(tdPhone);
        let tdAge = document.createElement("td");
        tdAge.textContent = age.value;
        dynamicRow.appendChild(tdAge);
        let tdEdit = document.createElement('button');
        tdEdit.textContent = "edit";
        



        detailsArray["name" + lengthOfObject] = user_name.value;
        detailsArray["email" + lengthOfObject] = email.value;
        detailsArray["phone" + lengthOfObject] = phone.value;
        detailsArray["age" + lengthOfObject] = age.value;

        detailsArray["areaOfIntrest" + lengthOfObject] = areaOfIntrestValue;

        let tdAreaOfIntrest = document.createElement("td");
        tdAreaOfIntrest.textContent = areaOfIntrestValue;
        dynamicRow.appendChild(tdAreaOfIntrest);
        dynamicRow.appendChild(tdEdit);
        //appending the entire row to table
        table.appendChild(dynamicRow);

        localStorage.setItem(("name" + lengthOfObject), user_name.value);
        localStorage.setItem(("email" + lengthOfObject), email.value);
        localStorage.setItem(("phone" + lengthOfObject), phone.value);
        localStorage.setItem(("age" + lengthOfObject), age.value);
        localStorage.setItem(("intrests" + lengthOfObject), areaOfIntrestValue);
        localStorage.setItem('locallyStoredObjectsLength', lengthOfObject);
        localStorage.setItem('editButton'+lengthOfObject);
        // editing content here
        tdEdit.addEventListener('click', updateDetails(localStorage.getItem(lengthOfObject)));
        
        displayEntries();
}

function editDetails(rowNumber) {
        console.log("Row Number Making this editable");
        console.log(rowNumber);

        let rows = tableBody.getElementsByTagName('tr');
        for(let i=0;i<rows.length;i++){
                if(i==rowNumber){
                        let cells = document.getElementsByTagName('td');
                        for(let k=0;k<cells.length;k++){
                                cells[k].contentEditable = "true";
                        }
                }
        }

}

function updateDetails(rowNumber) {
        console.log("Row Number Making this editable"+rowNumber);
        let rows = tableBody.getElementsByTagName('tr');
        for(let i=0;i<rows.length;i++){
                if(i==rowNumber){
                        let cells = document.getElementsByTagName('td');
                        for(let k=0;k<1;k++){
                                cells[0].contentEditable = "false";
                                cells[1].contentEditable = "false";
                                cells[2].contentEditable = "false";
                                cells[3].contentEditable = "false";
                                cells[4].contentEditable = "false";
                                localStorage.setItem(("name"+i),cells[0].textContent);
                                localStorage.setItem(("email"+i),cells[1].textContent);
                                localStorage.setItem(("phone"+i),cells[2].textContent);
                                localStorage.setItem(("age"+i),cells[3].textContent);
                                localStorage.setItem(("intrests"+i),cells[4].textContent);


                        }
                }
                
        }

}

displayEntries();
// Get the select element
const selectedNoOfEntries = document.getElementById('noOfEntries');
// Add a change event listener
console.log(selectedNoOfEntries.value);
selectedNoOfEntries.addEventListener('input', function () {
        limitOfEntries = selectedNoOfEntries.value;
        console.log(limitOfEntries);
        displayEntries();
});
// creating five entries of table
function displayEntries() {
        while (table.rows.length > 1) {
                table.deleteRow(1);
        }
        if (currentStart < 1) {
                return;
        }

        for (let i = currentStart; i < parseInt(currentStart) + parseInt(limitOfEntries); i++) {
                // console.log("currentStart :",currentStart);
                // console.log(parseInt(currentStart) + parseInt(limitOfEntries));
                // console.log(limitOfEntries);

                if (locallyStoredObjectsLength > 0) {

                        if (!localStorage.getItem("name" + i)) {
                                return;
                        }

                        let dynamic_row = document.createElement('tr');
                        dynamic_row.id = "row" + i;

                        let dynamic_name_data = document.createElement('td');
                        dynamic_name_data.textContent = localStorage.getItem("name" + i);

                        let dynamic_email_data = document.createElement('td');
                        dynamic_email_data.textContent = localStorage.getItem("email" + i);

                        let dynamic_phone_data = document.createElement('td');
                        dynamic_phone_data.textContent = localStorage.getItem("phone" + i);

                        let dynamic_age_data = document.createElement('td');
                        dynamic_age_data.textContent = localStorage.getItem("age" + i);

                        let dynamic_areaOfIntrest_data = document.createElement('td');
                        dynamic_areaOfIntrest_data.textContent = localStorage.getItem("intrests" + i);

                        let dynamic_edit_button = document.createElement("button");
                        dynamic_edit_button.textContent = "edit";
                        let dynamic_save_button = document.createElement('button');
                        dynamic_save_button.textContent = "save";
                        

                        dynamic_row.appendChild(dynamic_name_data);
                        dynamic_row.appendChild(dynamic_email_data);
                        dynamic_row.appendChild(dynamic_phone_data);
                        dynamic_row.appendChild(dynamic_age_data);
                        dynamic_row.appendChild(dynamic_areaOfIntrest_data);
                        dynamic_row.appendChild(dynamic_edit_button);
                        dynamic_row.appendChild(dynamic_save_button);
                        tableBody.appendChild(dynamic_row);
                        // // adding event listener for edit button
                        dynamic_edit_button.addEventListener('click',()=>{
                                editDetails(i);
                        });
                        dynamic_save_button.addEventListener('click',()=>{
                                updateDetails(i);
                        });
                }
        }
}

function nextEntries() {
        let temp = currentStart + limitOfEntries;
        if (!localStorage.getItem("name" + temp)) {
                return;
        }
        currentStart = currentStart + limitOfEntries;
        displayEntries();
}
function prevEntries() {
        let temp = currentStart - limitOfEntries;
        if (!localStorage.getItem("name" + temp)) {
                return;
        }
        currentStart = currentStart - limitOfEntries;
        displayEntries();
}