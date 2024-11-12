const express = require('express');
const router = express.Router();

const {
  createSubcategoryGroup,
  getSubcategoryGroups,
  getSubcategoryGroupById,
  updateSubcategoryGroup,
  deleteSubcategoryGroup
} = require('../controllers/subcategoryGroupController');

// Rotas para Tipos de Subcategorias
router.post('/', createSubcategoryGroup);
router.get('/', getSubcategoryGroups);
router.get('/:id', getSubcategoryGroupById);
router.put('/', updateSubcategoryGroup);
router.delete('/:id', deleteSubcategoryGroup);

module.exports = router;