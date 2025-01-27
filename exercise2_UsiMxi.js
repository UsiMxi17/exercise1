import express from 'express';

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3000; // Default port to listen on

// Middleware to parse JSON bodies
app.use(express.json());

// GET route for employees
app.get('/employees', (req, res) => {
    res.json({
        message: 'This is the GET path for employees',
    });
});

// GET route for managers
app.get('/managers', (req, res) => {
    res.json({
        message: 'This is the GET path for managers',
    });
});

// POST route for employees
app.post('/employees', (req, res) => {
    res.json({
        message: 'This is the POST path for employees and a new employee was added',
        employee: req.body, // Echo back the added employee data
    });
});

// POST route for managers
app.post('/managers', (req, res) => {
    res.json({
        message: 'This is the POST path for managers and a new manager was added',
        manager: req.body, // Echo back the added manager data
    });
});

// PUT route for employees
app.put('/employees/:id', (req, res) => {
    res.json({
        message: `This is the PUT path for employees with ID ${req.params.id} and the employee details were updated`,
        updatedEmployee: req.body, // Echo back the updated employee data
    });
});

// PUT route for managers
app.put('/managers/:id', (req, res) => {
    res.json({
        message: `This is the PUT path for managers with ID ${req.params.id} and the manager details were updated`,
        updatedManager: req.body, // Echo back the updated manager data
    });
});

// PATCH route for employees
app.patch('/employees/:id', (req, res) => {
    res.json({
        message: `This is the PATCH path for employees with ID ${req.params.id} and some employee details were partially updated`,
        updatedFields: req.body, // Echo back the updated fields
    });
});

// PATCH route for managers
app.patch('/managers/:id', (req, res) => {
    res.json({
        message: `This is the PATCH path for managers with ID ${req.params.id} and some manager details were partially updated`,
        updatedFields: req.body, // Echo back the updated fields
    });
});

// DELETE route for employees
app.delete('/employees/:id', (req, res) => {
    res.json({
        message: `This is the DELETE path for employees with ID ${req.params.id} and the employee was deleted`,
    });
});

// DELETE route for managers
app.delete('/managers/:id', (req, res) => {
    res.json({
        message: `This is the DELETE path for managers with ID ${req.params.id} and the manager was deleted`,
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
