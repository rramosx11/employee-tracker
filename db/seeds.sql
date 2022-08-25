INSERT INTO departments (dept_name)
VALUES
('Human Resources'),
('Finance and Accounting'),
('IT');

INSERT INTO roles (title, salary, department_id)
VALUES 
('Recruiter', 45000, 1),
('Employee Benefits', 47000, 1),
('Training', 55000, 1),
('CFO', 200000, 2),
('Junior Accountant', 40000, 2),
('Senior Accountant', 100000, 2),
('Software Engineer', 85000, 3),
('Help Desk Support', 60000, 3),
('IT Director', 180000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Scott', 'McAnally', 9, NULL),
('Rodolfo', 'Ramos', 7, 1);