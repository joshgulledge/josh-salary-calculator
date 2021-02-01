$(document).ready(andGo);

let employeeList = [];
let monthlyCost = 0;
let deletedEmployees = [];

function andGo() {
  $('#submit-button-input').on('click', submitForm);
  // $(document).on('click', '.delete-btn', deleteEmployee);
  $('#reset-button').on('click', resetButton);
  $(document).on('click', '.delete-btn', removeFromDom);
}

// the way i originally deleted the employee was find and remove it
// from the array then re render it on the page. after reading the
// comments in slack i didnt know if that was right. Left both functioning
// code functions here with only the remove from dom one active.

function deleteEmployee() {
  const { firstName, employeeID, ...rest } = searchEmployeeList(this.id);

  const indexWeWant = employeeList.findIndex(
    (obj) => obj.firstName === firstName
  );

  employeeList.splice(indexWeWant, 1);

  // empty existing employee table
  $('.employee-info').empty();

  // render table with new list
  employeeList.forEach((emplObj) => {
    renderData(emplObj);
  });

  calMonthCost(employeeList);
  $('#monthly-cost-output')
    .empty()
    .append(`$${Number(monthlyCost.toFixed(2))}`);
} // end deleteEmployee

function removeFromDom() {
  // target the row
  const theRow = $('.delete-btn').closest(`.table-row-${this.id}`);

  // get salary info from row
  const emplySal = $('#empl-salary').text();

  // remove row
  theRow.remove();

  // subtract from monthly cost
  monthlyCost -= Number((emplySal / 12).toFixed(2));
  if (monthlyCost < 1) monthlyCost = 0;

  // render monthly cost again
  $('#monthly-cost-output')
    .empty()
    .append(`$${Number(monthlyCost.toFixed(2))}`);
} // end removeFromDom

function resetButton() {
  $('.employee-info').empty();

  monthlyCost = 0;

  employeeList.forEach((obj) => {
    monthlyCost += Number((obj.annualSalary / 12).toFixed(2));

    renderData(obj);
  });
  // render monthly cost again
  $('#monthly-cost-output')
    .empty()
    .append(`$${Number(monthlyCost.toFixed(2))}`);
} // end resetButton

function searchEmployeeList(emplyID) {
  const [iFoundYou] = employeeList.filter((emp) => {
    return emp.employeeID === emplyID;
  });
  return iFoundYou;
} // end searchEmployeeList

function submitForm(e) {
  e.preventDefault();
  // init the employee obj
  let employee = {};

  // require from to be completed
  if (
    !$('#First-Name-Input').val() ||
    !$('#Last-Name-Input').val() ||
    !$('#ID-Input').val() ||
    !$('#job-title-input').val() ||
    !$('#annual-salary-input').val()
  ) {
    alert('Please fill out entire form');
    return;
  }

  // get info and save into obj
  employee.firstName = $('#First-Name-Input').val();
  employee.lastName = $('#Last-Name-Input').val();
  employee.employeeID = $('#ID-Input').val();
  employee.jobTitle = $('#job-title-input').val();
  employee.annualSalary = $('#annual-salary-input').val();

  // check if employID is already in use
  let idInUse = false;

  employeeList.map((obj) => {
    if (idInUse) return;
    idInUse = Object.values(obj).includes(employee.employeeID);
  });

  // if id is in use stop function
  if (idInUse) {
    $('#ID-Input').val('');
    alert('This Employee ID is already in use.');
    return;
  }

  // push obj to array
  employeeList.push(employee);

  // ----clear the input fields
  $('#First-Name-Input').val('');
  $('#Last-Name-Input').val('');
  $('#ID-Input').val('');
  $('#job-title-input').val('');
  $('#annual-salary-input').val('');

  // cal the monthly cost
  calMonthCost(employeeList);

  // put data on table
  renderData(employee);
} // end submitForm

function calMonthCost(allEmployees) {
  let annualSalaryList = [];

  allEmployees.map((obj) => {
    annualSalaryList.push(Number(obj.annualSalary));
  });

  // get monthly cost hence 12
  if (annualSalaryList.length !== 0) {
    const annualTotal = annualSalaryList.reduce((acc, salary) => acc + salary);

    monthlyCost = Number((annualTotal / 12).toFixed(2));
  } else {
    monthlyCost = 0;
  }

  // check if over 20000 a month
  if (monthlyCost > 20000) {
    $('#monthly-cost-output').addClass('over-budget');
  } else {
    $('#monthly-cost-output').removeClass('over-budget');
  }
} // end calMonthCost

function renderData(employeeObj) {
  $('.employee-info').append(`
    <tr class="table-row-${employeeObj.employeeID}">
    <td>${employeeObj.firstName}</td>
    <td>${employeeObj.lastName}</td>
    <td>${employeeObj.employeeID}</td>
    <td>${employeeObj.jobTitle}</td>
    <td id="empl-salary">${employeeObj.annualSalary}</td>
    <td><button id="${employeeObj.employeeID}"  class="delete-btn" >Delete Employee</button></td>

    </tr>
  `);

  $('#monthly-cost-output')
    .empty()
    .append(`$${Number(monthlyCost.toFixed(2))}`);
} // end renderData
