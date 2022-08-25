const inquirer = require("inquirer");
const db = require("./db/connection");
require("console.table");
// const apiRoutes = require("./routes/apiRoutes");

function showOptions() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "Add A Department",
          "Add A Role",
          "Add An Employee",
          "Update An Employee",
          "View All Employees",
          "Remove Employee",
          "Quit",
        ],
      },
    ])
    .then(({ choice }) => {
      switch (choice) {
        case "View All Departments":
          showDepartments();
          break;
        case "View All Roles":
          showRoles();
          break;
        case "View All Employees":
          showEmployees();
          break;
        case "Add An Employee":
          addEmployee();
          break;
        case "Remove Employee":
          deleteEmployee();
          break;
        default:
          process.exit();
      }
    });
}

function addDepartment() {
  let question = "What department would you like to add?";

  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: question,
    })
    .then((data) => {
      addDepartment.inser;
    });
}

// Query database

function showDepartments() {
  console.log("show departments");
  db.query("SELECT * FROM departments", function (err, results) {
    if (err) throw err;
    console.log("\n");
    console.table(results);
  });
  showOptions();
}

function showRoles() {
  console.log("show roles");
  db.query("SELECT * FROM roles", function (err, results) {
    if (err) throw err;
    console.log("\n");
    console.table(results);
  });
  showOptions();
}
function showEmployees() {
  console.log("show employees");
  db.query("SELECT * FROM employees", function (err, results) {
    if (err) throw err;
    console.log("\n");
    console.table(results);
  });
  showOptions();
}

// function addEmployee() {
//   db.query("SELECT * FROM employees", function (err, results) {
//     const choices = results.map(({ id, first_name, last_name }) => {
//       return {
//         name: `${first_name} ${last_name}`,
//         value: id,
//       };
//     });

//     inquirer
//       .prompt([
//         {
//           type: "list",
//           name: "employeeId",
//           message: "Which employee would you like to remove?",
//           choices: choices,
//         },
//       ])
//       .then(({ employeeId }) => {
//         db.query(
//           `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,
//           employeeId,
//           (err, result) => {
//             if (err) {
//               console.log(err);
//             }
//             console.log(result);
//             showOptions();
//           }
//         );
//       });
//   });
// }

function deleteEmployee() {
  db.query("SELECT * FROM employees", function (err, results) {
    const choices = results.map(({ id, first_name, last_name }) => {
      return {
        name: `${first_name} ${last_name}`,
        value: id,
      };
    });

    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee would you like to remove?",
          choices: choices,
        },
      ])
      .then(({ employeeId }) => {
        db.query(
          `DELETE FROM employees WHERE id = ?`,
          employeeId,
          (err, result) => {
            if (err) {
              console.log(err);
            }
            console.log(result);
            showOptions();
          }
        );
      });
  });
}

showOptions();
