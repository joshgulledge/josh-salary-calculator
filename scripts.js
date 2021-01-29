$(document).ready(andGo);

let employeeList = [];
let monthlyCost = 0;

function andGo() {
  $('#submit-button-input').on('click', submitForm);
}

function submitForm(e) {
  e.preventDefault();
  let employee = {};

  // get info and save into obj
  employee.firstName = $('#First-Name-Input').val();
  employee.lastName = $('#Last-Name-Input').val();
  employee.employeeID = $('#ID-Input').val();
  employee.jobTitle = $('#job-title-input').val();
  employee.annualSalary = $('#annual-salary-input').val();

  // push obj to array
  employeeList.push(employee);
  console.log(employeeList);

  // ----clear the input fields
  $('#First-Name-Input').val('');
  $('#Last-Name-Input').val('');
  $('#ID-Input').val('');
  $('#job-title-input').val('');
  $('#annual-salary-input').val('');

  // put data on table
  renderData(employee);

  // get monthly cost hence 12
  monthlyCost = employee.annualSalary / 12;
}

function renderData(employeeObj) {
  $('.employee-info').append(`
    <tr>
    <td>${employeeObj.firstName}</td>
    <td>${employeeObj.lastName}</td>
    <td>${employeeObj.employeeID}</td>
    <td>${employeeObj.jobTitle}</td>
    <td>${employeeObj.annualSalary}</td>
    </tr>
  `);

  $('#monthly-cost-output').empty().append(`${monthlyCost}`);
}
