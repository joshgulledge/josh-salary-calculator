$(document).ready(andGo);

let employeeList = [];
let monthlyCost = 0;

function andGo() {
  $('#submit-button-input').on('click', submitForm);
  $(document).on('click', '.delete-btn', deleteEmployee);
}

function deleteEmployee(e) {
  console.log(e);
  console.log(this);
  console.log($(this).parent('.this-employee'));
  console.log(this.id);
  console.log('delete button');
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
  monthlyCost += Number((annualSalary / 12).toFixed(2));
  console.log(monthlyCost);

  // check if over 20000 a month
  if (monthlyCost > 20000) {
    $('#monthly-cost-output').css('background-color', 'red');
  }
} // end calMonthCost

function renderData(employeeObj) {
  $('.employee-info').append(`
    <tr class="this-employee">
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
