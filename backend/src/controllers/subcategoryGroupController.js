const { isValidNumber, isValidString } = require('../utils/validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Função para criar um grupo de subcategorias
async function createSubcategoryGroup(req, res) {
  try {
    const { name } = req.body;

    if (!isValidString(name)) {
      return res.status(400).json({ error: 'Nome é obrigatório e não pode estar vazio.' });
    }

    // Verificar se já existe um grupo de subcategorias com esse nome
    const existingGroup = await prisma.subcategory_groups.findFirst({
      where: { name }
    });
    if (existingGroup) {
      return res.status(400).json({ error: 'Já existe um grupo de subcategorias com esse nome.' });
    }

    const subcategoryGroup = await prisma.subcategory_groups.create({
      data: { name }
    });
    res.status(201).json(subcategoryGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

// Função para obter todos os grupos de subcategorias
async function getSubcategoryGroups(req, res) {
  try {
    const subcategoryGroups = await prisma.subcategory_groups.findMany();
    res.status(200).json(subcategoryGroups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

// Função para obter um grupo de subcategorias pelo ID
async function getSubcategoryGroupById(req, res) {
  try {
    const { id } = req.params;

    const numericId = parseInt(id, 10);

    if (!isValidNumber(numericId)) {
      return res.status(400).json({ error: 'ID do grupo de subcategoria inválido.' });
    }

    const subcategoryGroup = await prisma.subcategory_groups.findUnique({
      where: { id: numericId }
    });
    if (subcategoryGroup) {
      res.status(200).json(subcategoryGroup);
    } else {
      res.status(404).json({ message: 'Grupo de subcategoria não encontrado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
// Função para atualizar um grupo de subcategorias
async function updateSubcategoryGroup(req, res) {
  try {
    const { id, name } = req.body;

    if (!isValidString(name)) {
      return res.status(400).json({ error: 'Nome é obrigatório e não pode estar vazio.' });
    }

    const numericId = parseInt(id, 10);

    if (!isValidNumber(numericId)) {
      return res.status(400).json({ error: 'ID do grupo de subcategoria inválido.' });
    }

    // Verificar se o grupo de subcategoria existe
    const existingGroup = await prisma.subcategory_groups.findUnique({
      where: { id: numericId }
    });
    if (!existingGroup) {
      return res.status(404).json({ error: 'Grupo de subcategoria não encontrado.' });
    }

    // Verificar se já existe um grupo de subcategoria com o mesmo nome, excluindo o atual
    if (name) {
      const nameExists = await prisma.subcategory_groups.findFirst({
        where: { name, NOT: { id: numericId } }
      });
      if (nameExists) {
        return res.status(400).json({ error: 'Já existe um grupo de subcategorias com esse nome.' });
      }
    }

    // Atualizar o grupo de subcategorias
    const subcategoryGroup = await prisma.subcategory_groups.update({
      where: { id: numericId },
      data: { name }
    });
    res.status(200).json(subcategoryGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

// Função para excluir um grupo de subcategorias
async function deleteSubcategoryGroup(req, res) {
  try {
    const { id } = req.params;

    const numericId = parseInt(id, 10);

    if (!isValidNumber(numericId)) {
      return res.status(400).json({ error: 'ID do grupo de subcategoria inválido.' });
    }

    const existingGroup = await prisma.subcategory_groups.findUnique({
      where: { id: numericId }
    });
    if (!existingGroup) {
      return res.status(404).json({ error: 'Grupo de subcategoria não encontrado.' });
    }

    await prisma.subcategory_groups.delete({
      where: { id: numericId }
    });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createSubcategoryGroup,
  getSubcategoryGroups,
  getSubcategoryGroupById,
  updateSubcategoryGroup,
  deleteSubcategoryGroup
};