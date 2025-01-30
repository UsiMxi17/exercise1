import mysql from 'mysql2/promise';
import { config } from 'dotenv';

config();

// Database connection pool
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

// Function to get all employees
async function getAllEmployees() {
    const [rows] = await pool.query('SELECT * FROM employees');
    return rows;
}

// Function to get a single employee by ID
async function getEmployeeById(employeeId) {
    const [rows] = await pool.query('SELECT * FROM employees WHERE employee_id = ?', [employeeId]);
    return rows[0]; // Return the first matching employee
}

// Function to add a new employee
async function addEmployee(firstName, lastName, email, phoneNumber, department, salary) {
    await pool.query('INSERT INTO employees (first_name, last_name, email, phone_number, department, salary) VALUES (?, ?, ?, ?, ?, ?)', 
    [firstName, lastName, email, phoneNumber, department, salary]);
    return getAllEmployees(); // Return all employees to see the new addition
}

// Function to remove an employee by ID
async function removeEmployee(employeeId) {
    await pool.query('DELETE FROM employees WHERE employee_id = ?', [employeeId]);
    return getAllEmployees(); // Return all employees to confirm removal
}

// Function to update an employee by ID
async function updateEmployee(employeeId, firstName, lastName, email, phoneNumber, department, salary) {
    await pool.query('UPDATE employees SET first_name = ?, last_name = ?, email = ?, phone_number = ?, department = ?, salary = ? WHERE employee_id = ?', 
    [firstName, lastName, email, phoneNumber, department, salary, employeeId]);
    
    // Await the result of getEmployeeById
    return await getEmployeeById(employeeId); // Return the updated employee
}

// Example usage
(async () => {
    console.log('All Employees:', await getAllEmployees());
    console.log('Adding Employee:', await addEmployee('Alice', 'Brown', 'alice.brown@example.com', '555-6789', 'Finance', 90000));
    console.log('Employee with ID 1:', await getEmployeeById(3));
    console.log('Removing Employee with ID 1:', await removeEmployee(1));
    console.log('Updating Employee:', await updateEmployee(1, 'John', 'Doe', 'john.doe@example.com', '555-1234', 'Engineering', 96000));
})();