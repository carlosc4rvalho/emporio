const { PrismaClient } = require('@prisma/client');
const { isValidNumber, isValidString } = require('../utils/validator');
const prisma = new PrismaClient();

// Função para criar uma subcategoria
async function createSubcategory(req, res) {
  try {
    const { name, category_id, subcategory_group_id } = req.body;

    if (!isValidString(name)) {
      return res.status(400).json({ error: 'Nome é obrigatório e não pode estar vazio.' });
    }

    const numericCategoryId = parseInt(category_id, 10);
    const numericSubcategoryGroupId = parseInt(subcategory_group_id, 10);

    if (!isValidNumber(numericCategoryId)) {
      return res.status(400).json({ error: 'ID da categoria inválido.' });
    }

    if (!isValidNumber(numericSubcategoryGroupId)) {
      return res.status(400).json({ error: 'ID do grupo de subcategoria inválido.' });
    }

    const category = await prisma.categories.findUnique({
      where: { id: numericCategoryId }
    });
    if (!category) {
      return res.status(404).json({ error: 'Categoria não encontrada.' });
    }

    const subcategoryGroup = await prisma.subcategory_groups.findUnique({
      where: { id: numericSubcategoryGroupId }
    });
    if (!subcategoryGroup) {
      return res.status(404).json({ error: 'Grupo de subcategoria não encontrado.' });
    }

    const existingSubcategory = await prisma.subcategories.findFirst({
      where: {
        category_id: numericCategoryId,
        group_type_id: numericSubcategoryGroupId,
        name
      }
    });
    if (existingSubcategory) {
      return res.status(400).json({ error: 'Já existe uma subcategoria com esse nome.' });
    }

    const subcategory = await prisma.subcategories.create({
      data: { 
        name, 
        category_id: numericCategoryId, 
        group_type_id: numericSubcategoryGroupId 
      }
    });
    res.status(201).json(subcategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Função para obter todas as subcategorias
async function getSubcategories(req, res) {
  try {
    const subcategories = await prisma.subcategories.findMany({
      include: {
        categories: true,
        subcategory_groups: true
      }
    });
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Função para obter uma subcategoria por ID
async function getSubcategoryById(req, res) {
  try {
    const { id } = req.params;

    const numericId = parseInt(id, 10);

    if (!isValidNumber(numericId)) {
      return res.status(400).json({ error: 'ID da subcategoria inválido.' });
    }

    const subcategory = await prisma.subcategories.findUnique({
      where: { id: numericId },
      include: {
        categories: true,
        subcategory_groups: true
      }
    });

    if (subcategory) {
      res.status(200).json(subcategory);
    } else {
      res.status(404).json({ message: 'Subcategoria não encontrada.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

// Função para atualizar uma subcategoria
async function updateSubcategory(req, res) {
  try {
    const { id, name, category_id, subcategory_group_id } = req.body;

    const numericId = parseInt(id, 10);
    const numericCategoryId = parseInt(category_id, 10);
    const numericSubcategoryGroupId = parseInt(subcategory_group_id, 10);

    if (!isValidNumber(numericId)) {
      return res.status(400).json({ error: 'ID da subcategoria inválido.' });
    }

    if (name && !isValidString(name)) {
      return res.status(400).json({ error: 'Nome não pode estar vazio.' });
    }

    const existingSubcategory = await prisma.subcategories.findUnique({
      where: { id: numericId }
    });
    if (!existingSubcategory) {
      return res.status(404).json({ message: 'Subcategoria não encontrada.' });
    }

    // Verifica se já existe uma subcategoria com o mesmo nome em uma categoria e grupo de subcategoria específicos
    const duplicateSubcategory = await prisma.subcategories.findFirst({
      where: {
        id: {
          not: numericId  // Exclui a subcategoria atual da verificação
        },
        category_id: numericCategoryId || existingSubcategory.category_id,
        group_type_id: numericSubcategoryGroupId || existingSubcategory.group_type_id,
        name
      }
    });

    if (duplicateSubcategory) {
      return res.status(400).json({ error: 'Já existe uma subcategoria com esse nome.' });
    }

    const updatedSubcategory = await prisma.subcategories.update({
      where: { id: numericId },
      data: { 
        name: name || existingSubcategory.name,
        category_id: numericCategoryId || existingSubcategory.category_id, 
        group_type_id: numericSubcategoryGroupId || existingSubcategory.group_type_id 
      }
    });
    res.status(200).json(updatedSubcategory);
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Subcategoria não encontrada.' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
}

// Função para deletar uma subcategoria
async function deleteSubcategory(req, res) {
  try {
    const { id } = req.params;

    const numericId = parseInt(id, 10);

    if (!isValidNumber(numericId)) {
      return res.status(400).json({ error: 'ID da subcategoria inválido.' });
    }

    const existingSubcategory = await prisma.subcategories.findUnique({
      where: { id: numericId }
    });
    if (!existingSubcategory) {
      return res.status(404).json({ message: 'Subcategoria não encontrada.' });
    }

    await prisma.subcategories.delete({
      where: { id: numericId }
    });

    res.status(204).end();
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Subcategoria não encontrada.' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = {
  createSubcategory,
  getSubcategories,
  getSubcategoryById,
  updateSubcategory,
  deleteSubcategory
};