$(document).ready(andGo);

let employeeList = [];
let monthlyCost = 0;

function andGo() {
  $('#submit-button-input').on('click', submitForm);
  $('#delete-btn').on('click', deleteEmployee);
}

function deleteEmployee() {
  // get the inputs
  const empDltInput = $('#employee-delete-input');
  const empIDDltInput = $('#employeeID-delete-input');

  // find the right object with given inputs
  const { firstName, employeeID, ...rest } = searchEmployeeList(
    empDltInput.val()
  );

  // find the right object in the array
  const indexWeWant = employeeList.findIndex(
    (obj) => obj.firstName === firstName
  );

  // remove that obj from the array
  employeeList.splice(indexWeWant, 1);

  // empty existing employee table
  $('.employee-info').empty();
  // render table with new list
  employeeList.forEach((emplObj) => {
    renderData(emplObj);
  });
} // end deleteEmployee

function searchEmployeeList(emply) {
  // console.log(emply, empID);
  const [iFoundYou] = employeeList.filter((emp) => {
    return emp.firstName === emply;
  });
  return iFoundYou;
} // end searchEmployeeList

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

  // ----clear the input fields
  $('#First-Name-Input').val('');
  $('#Last-Name-Input').val('');
  $('#ID-Input').val('');
  $('#job-title-input').val('');
  $('#annual-salary-input').val('');

  // cal the monthly cost
  calMonthCost(employee.annualSalary);

  // put data on table
  renderData(employee);
} // end submitForm

function calMonthCost(annualSalary) {
  // get monthly cost hence 12
  monthlyCost += annualSalary / 12;

  // check if over 20000 a month
  if (monthlyCost > 20000) {
    $('#monthly-cost-output').css('background-color', 'red');
  }
} // end calMonthCost

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

  $('#monthly-cost-output').empty().append(`$${monthlyCost}`);
} // end renderData
