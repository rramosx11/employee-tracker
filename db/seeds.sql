INSERT INTO departments (dept_name)
VALUES
('Human Resources'),
('Finance and Accounting'),
('IT');

INSERT INTO roles (title, salary, department_id)
VALUES 
('HR Manager', 78000, 1),
('Employee Benefits', 47000, 1),
('Training & Recruiting', 60000, 1),
('CFO', 200000, 2),
('Junior Accountant', 40000, 2),
('Senior Accountant', 100000, 2),
('Software Engineer', 85000, 3),
('Help Desk Support', 60000, 3),
('IT Director', 180000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Scott', 'McAnally', 9, NULL),
('Rodolfo', 'Ramos', 7, 1),
('Maria', 'Grano-Llanes', 4, NULL),
('Cristiano', 'Ronaldo', 5, 3),
('Neymar', 'Da Silva', 6, 3),
('Javier', 'Ramos', 3, 1),
('Maria', 'Ramos', 7, 1),
('Esmeralda', 'Flores', 1, NULL);