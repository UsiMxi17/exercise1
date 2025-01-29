import mysql from 'mysql2/promise';
import { config } from 'dotenv';

config();

// Create a connection pool to the database
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

// Function to get all users
async function getAllUsers() {
    try {
        const [results] = await pool.query('SELECT * FROM users');
        console.log('Users:', results);
    } catch (err) {
        console.error('Error fetching users:', err);
    }
}

// Function to get all products
async function getAllProducts() {
    try {
        const [results] = await pool.query('SELECT * FROM products');
        console.log('Products:', results);
    } catch (err) {
        console.error('Error fetching products:', err);
    }
}

// Function to delete a product
async function deleteProduct(productCode) {
    try {
        const [results] = await pool.query('DELETE FROM products WHERE product_code = ?', [productCode]);
        console.log(`Deleted product: ${productCode}`);
    } catch (err) {
        console.error(`Error deleting product ${productCode}:`, err);
    }
}

// Function to insert a new product or update if it exists
async function insertOrUpdateProduct(productName, productPrice, productCode, productQuantity) {
    try {
        // Check if the product already exists
        const [existingProduct] = await pool.query('SELECT * FROM products WHERE product_code = ?', [productCode]);

        if (existingProduct.length > 0) {
            // If it exists, update the product
            await pool.query('UPDATE products SET product_name = ?, product_price = ?, product_quantity = ? WHERE product_code = ?', [productName, productPrice, productQuantity, productCode]);
            console.log(`Updated product: ${productName} with code ${productCode}`);
        } else {
            // If it doesn't exist, insert the new product
            await pool.query('INSERT INTO products (product_name, product_price, product_code, product_quantity) VALUES (?, ?, ?, ?)', [productName, productPrice, productCode, productQuantity]);
            console.log(`Inserted product: ${productName} at $${productPrice}`);
        }
    } catch (err) {
        console.error(`Error inserting/updating product ${productName}:`, err);
    }
}

// Function to update a product
async function updateProduct(productCode, newProductName, newProductPrice) {
    try {
        const [results] = await pool.query('UPDATE products SET product_name = ?, product_price = ? WHERE product_code = ?', [newProductName, newProductPrice, productCode]);
        console.log(`Updated product code ${productCode}: ${newProductName} at $${newProductPrice}`);
    } catch (err) {
        console.error(`Error updating product code ${productCode}:`, err);
    }
}

// Example usage
(async () => {
    await getAllUsers();
    await getAllProducts();
    await deleteProduct('baro1');
    await insertOrUpdateProduct('Grapes', 12.99, 'grps1', 8);
    await updateProduct('handy1', 'Handy Andy Updated', 20.00);

    // Function to get a specific user by ID
    const getUserById = async (userId) => {
        try {
            const [data] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
            return data;
        } catch (err) {
            console.error('Error fetching user:', err);
        }
    };

    console.log(await getUserById(1));
})();
