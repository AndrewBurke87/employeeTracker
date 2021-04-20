USE employees_DB;

-- Department Seeds --

INSERT INTO department(id, name)
Values (1, "Operations");

INSERT INTO department(id, name)
Values (2, "Sales");

INSERT INTO department(id, name)
Values (3, "Human Resources");

INSERT INTO department(id, name)
Values (4, "IT");

-- Roles Seeds --

INSERT INTO role (id, title, salary, department_id)
Values (1, "COO", 250000, 1);

INSERT INTO role (id, title, salary, department_id)
Values (2, "Store Manager", 75000, 2);

INSERT INTO role (id, title, salary, department_id)
Values (3, "HR Manager", 80000, 3);

INSERT INTO role (id, title, salary, department_id)
Values (4, "IT Manager", 150000, 4);

INSERT INTO role (id, title, salary, department_id)
Values (5, "Operations Manager", 65000, 1);

INSERT INTO role (id, title, salary, department_id)
Values (6, "Assistant Store Manger", 40000, 2);

INSERT INTO role (id, title, salary, department_id)
Values (7, "HR Representative", 50000, 3);

INSERT INTO role (id, title, salary, department_id)
Values (8, "HR Representative", 500000, 3);

INSERT INTO role (id, title, salary, department_id)
Values (9, "Sales Representive", 30000, 2);

INSERT INTO role (id, title, salary, department_id)
Values (10, "Senior Software Developer", 110000, 4);

INSERT INTO role (id, title, salary, department_id)
Values (11, "Junior Software Developer", 70000, 4);

-- Employee Seed --

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
Values (1, "Tyler", "Moore", 5, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
Values (2, "Wade", "Smith", 10, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
Values (3, "Monica", "Davies", 8, null );

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
Values (4, "Andrew", "Burke", 4, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
Values (5, "Sarah", "Farr", 1, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
Values (6, "Heather", "Brown", 11, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
Values (7, "Logan", "White", 2, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
Values (8, "Traci", "Anderson", 7, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
Values (9, "Riley", "James", 3, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
Values (10, "Janice", "Williams", 6, 6);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
Values (11, "David", "Carter", 9, null);