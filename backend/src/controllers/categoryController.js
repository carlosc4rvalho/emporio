const { isValidNumber, isValidString } = require('../utils/validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Função para criar uma categoria
async function createCategory(req, res) {
  try {
    const { name } = req.body;

    if (!isValidString(name)) {
      return res.status(400).json({ error: 'Nome é obrigatório e não pode estar vazio.' });
    }

    // Verificar se já existe uma categoria com esse nome
    const existingCategory = await prisma.categories.findFirst({
      where: { name }
    });
    if (existingCategory) {
      return res.status(400).json({ error: 'Já existe uma categoria com esse nome.' });
    }

    const category = await prisma.categories.create({
      data: { name }
    });
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}

// Função para obter todas as categorias
async function getCategories(req, res) {
  try {
    const categories = await prisma.categories.findMany();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}

// Função para obter uma categoria pelo ID
async function getCategoryById(req, res) {
  try {
    const { id } = req.params;

    const numericId = parseInt(id, 10);

    if (!isValidNumber(numericId)) {
      return res.status(400).json({ error: 'ID da categoria inválido.' });
    }

    const category = await prisma.categories.findUnique({
      where: { id: numericId }
    });
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: 'Categoria não encontrada.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}

async function updateCategory(req, res) {
  try {
    const { id, name } = req.body;

    const numericId = parseInt(id, 10);

    if (!isValidNumber(numericId)) {
      return res.status(400).json({ error: 'ID da categoria inválido.' });
    }

    if (name && !isValidString(name)) {
      return res.status(400).json({ error: 'Nome não pode estar vazio.' });
    }

    const existingCategory = await prisma.categories.findUnique({
      where: { id: numericId }
    });
    if (!existingCategory) {
      return res.status(404).json({ message: 'Categoria não encontrada.' });
    }

    if (name) {
      const nameExists = await prisma.categories.findFirst({
        where: { name, NOT: { id: numericId } }
      });
      if (nameExists) {
        return res.status(400).json({ error: 'Já existe uma categoria com esse nome.' });
      }
    }

    const updatedCategory = await prisma.categories.update({
      where: { id: numericId },
      data: { name }
    });
    res.status(200).json(updatedCategory);
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Categoria não encontrada.' });
    } else {
      console.error('Erro ao atualizar categoria:', error.message);
      if (error.code) {
        console.error('Código do erro:', error.code);
      }
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
}

// Função para excluir uma categoria
async function deleteCategory(req, res) {
  try {
    const { id } = req.params;

    const numericId = parseInt(id, 10);

    if (!isValidNumber(numericId)) {
      return res.status(400).json({ error: 'ID da categoria inválido.' });
    }

    const category = await prisma.categories.findUnique({
      where: { id: numericId }
    });
    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada.' });
    }

    await prisma.categories.delete({
      where: { id: numericId }
    });
    res.status(204).end();
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Categoria não encontrada.' });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
}

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};