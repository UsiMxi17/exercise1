import express from 'express';

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3000; // Default port to listen on

// Middleware to parse JSON bodies
app.use(express.json());

// GET route for products
app.get('/products', (req, res) => {
    res.json({
        message: 'This is the GET product path',
    });
});

// GET route for users
app.get('/users', (req, res) => {
    res.json({
        message: 'This is the GET user path',
    });
});

// POST route for products
app.post('/products', (req, res) => {
    res.json({
        message: 'This is the POST path for products and something was added',
    });
});

// POST route for users
app.post('/users', (req, res) => {
    res.json({
        message: 'This is the POST path for users and something was added',
    });
});

// PUT route for products
app.put('/products/:id', (req, res) => {
    res.json({
        message: `This is the PUT path for products with ID ${req.params.id} and something was updated`,
    });
});

// PUT route for users
app.put('/users/:id', (req, res) => {
    res.json({
        message: `This is the PUT path for users with ID ${req.params.id} and something was updated`,
    });
});

// PATCH route for products
app.patch('/products/:id', (req, res) => {
    res.json({
        message: `This is the PATCH path for products with ID ${req.params.id} and something was partially updated`,
    });
});

// PATCH route for users
app.patch('/users/:id', (req, res) => {
    res.json({
        message: `This is the PATCH path for users with ID ${req.params.id} and something was partially updated`,
    });
});

// DELETE route for products
app.delete('/products/:id', (req, res) => {
    res.json({
        message: `This is the DELETE path for products with ID ${req.params.id} and something was deleted`,
    });
});

// DELETE route for users
app.delete('/users/:id', (req, res) => {
    res.json({
        message: `This is the DELETE path for users with ID ${req.params.id} and something was deleted`,
    });
});

// Start the server
app.listen(3000, () => {
    console.log(`Server is running at http://localhost:3000`);
});
