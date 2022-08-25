const inquirer = require("inquirer");
const db = require("./db/connection");
require("console.table");
// const apiRoutes = require("./routes/apiRoutes");

// Global Variables
// let employee = new Employee(DB);
// let role = new Role(DB);

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
        case "Add A Department":
          addDepartment();
          break;
        case "Add A Role":
          addRole();
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

// Query database

function showDepartments() {
  console.log("show departments");
  db.query(
    "SELECT departments.id, departments.dept_name " + "FROM departments ",
    function (err, results) {
      if (err) throw err;
      console.log("\n");
      console.table(results);
    }
  );
  showOptions();
}

function showRoles() {
  console.log("show roles");
  db.query(
    "SELECT roles.id, roles.title, roles.salary, departments.dept_name " +
      "FROM roles " +
      "LEFT JOIN departments ON roles.department_id = departments.id",
    function (err, results) {
      if (err) throw err;
      console.log("\n");
      console.table(results);
    }
  );
  showOptions();
}
function showEmployees() {
  console.log("show employees");
  db.query(
    "SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.dept_name, roles.salary, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name " +
      "FROM employees " +
      "LEFT JOIN roles ON employees.role_id = roles.id " +
      "LEFT JOIN departments ON roles.department_id = departments.id " +
      "LEFT JOIN employees manager ON employees.manager_id = manager.id ",
    function (err, results) {
      if (err) throw err;
      console.log("\n");
      console.table(results);
    }
  );
  showOptions();
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
      db.query(
        "INSERT INTO departments (dept_name) VALUES (?)",
        [data.department],
        function (err, res) {
          if (err) console.log(err);
          showOptions();
        }
      );
    });
}

function addRole() {
  let departments =
    //   // first get the list of departments
    db.query("SELECT * FROM departments", function (err, res) {
      if (err) console.log(err);
      for (let i = 0; i < res.length; i++) {
        if (res[i].name) {
          departments.push(res[i].name);
        }
      }

      // get the role details
      let questions = [
        "What is the name of the role?",
        "What is the salary of the role?",
        "Which department does the role belong to?",
      ];
      inquirer
        .prompt([
          {
            name: "title",
            type: "input",
            message: questions[0],
          },
          {
            name: "salary",
            type: "number",
            message: questions[1],
          },
          {
            name: "department",
            type: "list",
            message: questions[2],
            choices: departments,
          },
        ])
        .then((data) => {
          // get the department to tie to
          let departmentId = null;
          for (let i = 0; i < res.length; i++) {
            if (res[i].name === data.department) {
              departmentId = res[i].id;
              break;
            }
            db.query(
              "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
              [data.departments],
              function (err, res) {
                if (err) console.log(err);
                showOptions();
              }
            );
          }
        });
    });
}

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
