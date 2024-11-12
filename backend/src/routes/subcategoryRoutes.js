const express = require('express');
const router = express.Router();

const {
  createSubcategory,
  getSubcategories,
  getSubcategoryById,
  updateSubcategory,
  deleteSubcategory
} = require('../controllers/subcategoryController');

// Rotas para Subcategorias
router.post('/', createSubcategory);
router.get('/', getSubcategories);
router.get('/:id', getSubcategoryById);
router.put('/', updateSubcategory);
router.delete('/:id', deleteSubcategory);

module.exports = router;