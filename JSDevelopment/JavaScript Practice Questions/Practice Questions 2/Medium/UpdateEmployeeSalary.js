/*
    3 Parameters:
        1. Array of employee objects
        2. Employee ID,
        3. New Salary Value

    Functions should update the salary of employee ID to new salary value. If ID DNE, return null.
    Return update employee object
*/

function updateEmployeeSalary(employees, employeeId, newSalary) {

    for (let i = 0; i < employees.length; i++) {
        if (employees[i].id == employeeId) {
            employees[i].salary = newSalary;
            return employees[i];
        }
    }
    return null;
}

const employees = [
{ id: 1, name: "John Doe", position: "Software Engineer", salary:
70000, department: { name: "Engineering", location: "New York" } },
{ id: 2, name: "Jane Smith", position: "Product Manager", salary:
80000, department: { name: "Product", location: "San Francisco" } }
];

var result = updateEmployeeSalary(employees, 1, 75000);
console.log(result);