$(document).ready(andGo);

let employeeList = [];
let monthlyCost = 0;

function andGo() {
  $('#submit-button-input').on('click', submitForm);
  $(document).on('click', '.delete-btn', deleteEmployee);
}

function deleteEmployee() {
  console.log(this.id);
  const { firstName, employeeID, ...rest } = searchEmployeeList(this.id);

  console.log(firstName, employeeID);

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
  $('#monthly-cost-output').empty().append(`$${monthlyCost}`);
}

// function deleteEmployee() {
//   // get the inputs
//   const empDltInput = $('#employee-delete-input');
//   const empIDDltInput = $('#employeeID-delete-input');

//   // find the right object with given inputs
//   const { firstName, employeeID, ...rest } = searchEmployeeList(
//     empDltInput.val()
//   );

//   console.log(firstName);
//   // find the right object in the array
//   const indexWeWant = employeeList.findIndex(
//     (obj) => obj.firstName === firstName && obj.employeeID === employeeID
//   );

//   // remove that obj from the array
//   employeeList.splice(indexWeWant, 1);

//   // empty existing employee table
//   $('.employee-info').empty();
//   // render table with new list
//   employeeList.forEach((emplObj) => {
//     renderData(emplObj);
//   });
// } // end deleteEmployee

function searchEmployeeList(emplyID) {
  const [iFoundYou] = employeeList.filter((emp) => {
    return emp.employeeID === emplyID;
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
  const annualTotal = annualSalaryList.reduce((acc, salary) => acc + salary);

  monthlyCost = Number((annualTotal / 12).toFixed(2));

  // check if over 20000 a month
  if (monthlyCost > 20000) {
    $('#monthly-cost-output').css('background-color', 'red');
  }
} // end calMonthCost

function renderData(employeeObj) {
  $('.employee-info').append(`
    <tr class="this-employee table-row">
    <td>${employeeObj.firstName}</td>
    <td>${employeeObj.lastName}</td>
    <td>${employeeObj.employeeID}</td>
    <td>${employeeObj.jobTitle}</td>
    <td>${employeeObj.annualSalary}</td>
    <td><button id="${employeeObj.employeeID}"  class="delete-btn" >Delete Employee</button></td>

    </tr>
  `);

  $('#monthly-cost-output').empty().append(`$${monthlyCost}`);
} // end renderData
