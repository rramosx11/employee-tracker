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
          "Remove A Department",
          "Remove A Role",
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
        case "Update An Employee":
          updateEmployee();
          break;
        case "Remove A Department":
          deleteDepartment();
          break;
        case "Remove A Role":
          deleteRole();
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
      showOptions();
    }
  );
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
      showOptions();
    }
  );
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
      showOptions();
    }
  );
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
  db.query("SELECT * FROM departments", function (err, results) {
    const aDepartments = results.map(({ id, dept_name }) => {
      return {
        name: `${dept_name}`,
        value: id,
      };
    });

    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What is the name of the role?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary of the role?",
        },
        {
          name: "department",
          type: "list",
          message: "Which department does the role belong to?",
          choices: aDepartments,
        },
      ])
      .then((data) => {
        console.log(data);
        db.query(
          "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
          [data.title, data.salary, data.department],
          function (err, res) {
            if (err) console.log(err);
            showOptions();
          }
        );
      });
  });
}

function addEmployee() {
  db.query("SELECT * FROM roles", function (err, results) {
    const aRoles = results.map(({ id, title, salary, department_ID }) => {
      return {
        name: `${title}`,
        value: id,
      };
    });
    db.query("SELECT * FROM employees", function (err, results) {
      const aManagers = results.filter(
        ({ first_name, last_name, id, manager_id }) => {
          if (manager_id === null) {
            return {
              name: `${first_name} ${last_name}`,
              value: id,
            };
          }
        }
      );
      const managers = aManagers.map(({ id, first_name, last_name }) => {
        return {
          name: `${first_name} ${last_name}`,
          value: id,
        };
      });

      inquirer
        .prompt([
          {
            name: "first_name",
            type: "input",
            message: "What is the employee's first name?",
          },
          {
            name: "last_name",
            type: "input",
            message: "What is the employee's last name?",
          },
          {
            name: "role",
            type: "list",
            message: "What is the employee's role?",
            choices: aRoles,
          },
          {
            name: "manager",
            type: "list",
            message: "Who is the employee's manager?",
            choices: managers,
          },
        ])
        .then((data) => {
          console.log(data);
          db.query(
            "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
            [data.first_name, data.last_name, data.role, data.manager],
            function (err, res) {
              if (err) console.log(err);
              showOptions();
            }
          );
        });
    });
  });
}

function updateEmployee() {
  db.query("SELECT * FROM employees", function (err, results) {
    const aEmployees = results.map(({ id, first_name, last_name }) => {
      return {
        name: `${first_name} ${last_name}`,
        value: id,
      };
    });

    db.query("SELECT * FROM roles", function (err, results) {
      const aRoles = results.map(({ id, title, salary, department_ID }) => {
        return {
          name: `${title}`,
          value: id,
        };
      });

      inquirer
        .prompt([
          {
            name: "employee",
            type: "list",
            message: "Which employees role would you like to update?",
            choices: aEmployees,
          },
          {
            name: "role",
            type: "list",
            message: "Which role do you want to assign the selected employee?",
            choices: aRoles,
          },
        ])
        .then((data) => {
          console.log(data);
          db.query(
            "UPDATE employees SET role_id = ? WHERE id = ?",
            [data.role, data.employee],
            function (err, res) {
              if (err) console.log(err);
              showOptions();
            }
          );
        });
    });
  });
}

function deleteDepartment() {
  db.query("SELECT * FROM departments", function (err, results) {
    const choices = results.map(({ id, dept_name }) => {
      return {
        name: `${dept_name}`,
        value: id,
      };
    });

    inquirer
      .prompt([
        {
          type: "list",
          name: "department",
          message: "Which department would you like to remove?",
          choices: choices,
        },
      ])
      .then(({ department }) => {
        db.query(
          `DELETE FROM departments WHERE id = ?`,
          department,
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
function deleteRole() {
  db.query("SELECT * FROM roles", function (err, results) {
    const choices = results.map(({ id, title, salary, department_ID }) => {
      return {
        name: `${title}`,
        value: id,
      };
    });

    inquirer
      .prompt([
        {
          type: "list",
          name: "role",
          message: "Which role would you like to remove?",
          choices: choices,
        },
      ])
      .then(({ role }) => {
        db.query(`DELETE FROM roles WHERE id = ?`, role, (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log(result);
          showOptions();
        });
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
