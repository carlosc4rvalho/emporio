const { isValidString, isValidEmail, isValidPassword, isValidNumber } = require('../utils/validator');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

async function signUser(req, res) {
  try {
    const { store_id, name, email, password } = req.body;

    if (!isValidString(name) || !isValidEmail(email) || !isValidPassword(password)) {
      return res.status(400).json({ error: 'Nome, email ou senha inválidos.' });
    }

    const numericStoreId = parseInt(store_id, 10);
    if (!isValidNumber(numericStoreId)) {
      return res.status(400).json({ error: 'store_id inválido.' });
    }

    const existingUser = await prisma.users.findUnique({
      where: { email }
    });
    if (existingUser) {
      return res.status(400).json({ error: 'Email já está em uso.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
      data: {
        store_id: numericStoreId,
        name,
        email,
        password_hash: hashedPassword
      }
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!isValidEmail(email) || !isValidPassword(password)) {
      return res.status(400).json({ error: 'Email ou senha inválidos.' });
    }

    const user = await prisma.users.findUnique({
      where: { email }
    });
    if (!user) {
      return res.status(401).json({ error: 'Email ou senha inválidos.' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Email ou senha inválidos.' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}

async function getUser(req, res) {
  try {
    const { id } = req.params;

    const numericId = parseInt(id, 10);

    if (!isValidNumber(numericId)) {
      return res.status(400).json({ error: 'ID do usuário inválido.' });
    }

    const user = await prisma.users.findUnique({
      where: { id: numericId }
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}

async function updateUser(req, res) {
  try {
    const { id, name, email, password } = req.body;

    const numericId = parseInt(id, 10);

    if (!isValidNumber(numericId)) {
      return res.status(400).json({ error: 'ID do usuário inválido.' });
    }

    const user = await prisma.users.findUnique({
      where: { id: numericId }
    });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const updateData = {};
    if (name) {
      if (!isValidString(name)) {
        return res.status(400).json({ error: 'Nome inválido.' });
      }
      updateData.name = name;
    }
    if (email) {
      if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Email inválido.' });
      }
      updateData.email = email;
    }
    if (password) {
      if (!isValidPassword(password)) {
        return res.status(400).json({ error: 'Senha inválida.' });
      }
      updateData.password_hash = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.users.update({
      where: { id: numericId },
      data: updateData
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    const numericId = parseInt(id, 10);

    if (!isValidNumber(numericId)) {
      return res.status(400).json({ error: 'ID do usuário inválido.' });
    }

    const user = await prisma.users.findUnique({
      where: { id: numericId }
    });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    await prisma.users.delete({
      where: { id: numericId }
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}

module.exports = {
  signUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser
};