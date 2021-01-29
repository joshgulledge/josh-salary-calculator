$(document).ready(andGo);

let firstName;
let lastName;
let employee = {};

function andGo() {
  // get info from form
  firstName = $('#First-Name-Input');
  lastName = $('#Last-Name-Input');
  // const employeeID = $('')
  $('#submit-button-input').on('click', submitForm);
}

function submitForm(e) {
  e.preventDefault();
  const firstNameVal = firstName.val();
  const lastNameVal = lastName.val();
  console.log(firstNameVal, lastNameVal);
}
