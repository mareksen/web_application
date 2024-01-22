
// Definition of the Insured class to represent an insured person.
class Insured {
  constructor(name, surname, age, phone) {
    this.name = name;             // Name of the insured person
    this.surname = surname;       // Surname of the insured person
    this.age = age;               // Age of the insured person
    this.phone = phone;           // Phone number of the insured person
  }

  // Method to create a string description of the insured person
  toString() {
    return `${this.name} ${this.surname} - ${this.phone} - ${this.age} years`;
  }
}

// Loading an array of insured people from local storage or initializing an empty array
let insuredArray = JSON.parse(localStorage.getItem('insuredArray')) || [];

// Function to add a new insured person to the array and update local storage
function addInsured(name, surname, age, phone) {
  const insured = new Insured(name, surname, Number(age), phone);
  insuredArray.push(insured);
  localStorage.setItem('insuredArray', JSON.stringify(insuredArray));
  displayInsured();
}

// Function to display the list of insured people
function displayInsured() {
  const list = document.getElementById('insured-list');
  list.innerHTML = '';

  // For each insured person in the array, create a row in the table
  insuredArray.forEach((insured, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${insured.name} ${insured.surname}</td>
      <td>${insured.phone}</td>
      <td>${insured.age}</td>
      <td><button class="delete-btn" onclick="deleteInsured(${index})">Delete</button></td>
    `;
    list.appendChild(row);
  });
}

// Function to remove an insured person from the array and update local storage
function deleteInsured(index) {
  insuredArray.splice(index, 1);
  localStorage.setItem('insuredArray', JSON.stringify(insuredArray));
  displayInsured();
}

// Adding an event listener to the form for adding an insured person
document.getElementById('add-insured-form').addEventListener('submit', function(event) {
  event.preventDefault();
  // Retrieving values from the form
  const name = document.getElementById('name').value;
  const surname = document.getElementById('surname').value;
  const age = parseInt(document.getElementById('age').value);

  // Validation of name and surname
  if (!isValidName(name) || !isValidName(surname)) {
    alert('Name and surname can only contain letters and must be shorter than 20 characters.');
    return;
  }

  // Validation of age
  if (isNaN(age) || age < 18 || age > 120) {
    alert('You must be of legal age.');
    return;
  }

  // Validation of phone number
  const phone = document.getElementById('phone').value;
  if (!isValidPhoneNumber(phone)) {
    alert('Phone number should contain only numbers and can start with a + sign.');
    return;
  }

  // Adding an insured person and resetting the form
  addInsured(name, surname, age, phone);
  this.reset();
});

// Function to validate the name
function isValidName(name) {
  return /^[A-Za-záéíóúýčďěňřšťžÁÉÍÓÚÝČĎĚŇŘŠŤŽ]{1,20}$/.test(name);
}

// Function to validate the phone number
function isValidPhoneNumber(phone) {
  return /^\+?[0-9]+$/.test(phone);
}

// Displaying the list of insured people when the page is loaded
displayInsured();

