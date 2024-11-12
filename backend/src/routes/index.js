const express = require('express');
const router = express.Router();

// Importar as rotas de recursos
const categoryRoutes = require('./categoryRoutes');
const subcategoryRoutes = require('./subcategoryRoutes');
const subcategoryGroupRoutes = require('./subcategoryGroupRoutes');
const productRoutes = require('./productRoutes');

// Configure as rotas
router.use('/categories', categoryRoutes);
router.use('/subcategories', subcategoryRoutes);
router.use('/subcategory-groups', subcategoryGroupRoutes);
router.use('/products', productRoutes);

module.exports = router;