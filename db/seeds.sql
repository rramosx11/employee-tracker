INSERT INTO departments (dept_name)
VALUES
('Executive'),
('Human Resources'),
('Finance and Accounting'),
('IT');

INSERT INTO roles (title, salary, department_id)
VALUES 
('CEO', 400000, 1),
('HR Manager', 78000, 2),
('Employee Benefits', 47000, 2),
('Training & Recruiting', 60000, 2),
('CFO', 200000, 3),
('Junior Accountant', 40000, 3),
('Senior Accountant', 100000, 3),
('Software Engineer', 85000, 4),
('Help Desk Support', 60000, 4),
('IT Director', 180000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Florentino', 'Perez', 1, NULL),
('Scott', 'McAnally', 10, NULL),
('Rodolfo', 'Ramos', 8, 2),
('Maria', 'Grano-Llanes', 5, NULL),
('Cristiano', 'Ronaldo', 6, 4),
('Neymar', 'Da Silva', 7, 4),
('Javier', 'Ramos', 4, 1),
('Maria', 'Ramos', 8, 1),
('Esmeralda', 'Flores', 2, NULL);