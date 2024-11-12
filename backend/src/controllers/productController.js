const { PrismaClient } = require('@prisma/client');
const { isValidNumber, isValidString, isValidDecimal } = require('../utils/validator');
const { uploadImages, deleteImages } = require('../utils/image');
const prisma = new PrismaClient();

// Função para criar um produto
async function createProduct(req, res) {
  try {
    const { name, description, price, promotional_price, quantity, subcategory_ids, is_active } = req.body;
    const imageFiles = req.files;

    if (!isValidString(name)) {
      return res.status(400).json({ error: 'Nome é obrigatório e não pode estar vazio.' });
    }

    if (!isValidDecimal(price)) {
      return res.status(400).json({ error: 'Preço é obrigatório e deve ser um valor válido.' });
    }

    if (!isValidDecimal(promotional_price)) {
      return res.status(400).json({ error: 'Preço promocional deve ser um valor válido.' });
    }

    const numericQuantity = quantity ? parseInt(quantity, 10) : null;
    if (quantity && !isValidNumber(numericQuantity)) {
      return res.status(400).json({ error: 'Quantidade deve ser um número válido.' });
    }

    const numericPrice = parseFloat(price);
    const numericPromotionalPrice = promotional_price ? parseFloat(promotional_price) : null;

    // Converte subcategory_ids para um array se for uma string separada por vírgulas
    let numericSubcategoryIds = [];
    if (subcategory_ids) {
      if (typeof subcategory_ids === 'string') {
        numericSubcategoryIds = subcategory_ids.split(',').map(id => parseInt(id, 10));
      } else if (Array.isArray(subcategory_ids)) {
        numericSubcategoryIds = subcategory_ids.map(id => parseInt(id, 10));
      } else {
        return res.status(400).json({ error: 'subcategory_ids deve ser uma string separada por vírgulas ou um array.' });
      }

      const existingSubcategories = await prisma.subcategories.findMany({
        where: { id: { in: numericSubcategoryIds } }
      });

      if (existingSubcategories.length !== numericSubcategoryIds.length) {
        return res.status(400).json({ error: 'Uma ou mais subcategorias associadas não existem.' });
      }
    }

    // Faz o upload das imagens e obtém os nomes das imagens
    let uploadedImageNames = [];
    if (imageFiles && imageFiles.length > 0) {
      uploadedImageNames = await uploadImages(imageFiles);
    }

    // Cria o produto
    const product = await prisma.products.create({
      data: {
        name,
        description,
        price: numericPrice,
        promotional_price: numericPromotionalPrice,
        quantity: numericQuantity,
        is_active: is_active !== undefined ? is_active : true,
        product_images: {
          create: uploadedImageNames.map(imageName => ({
            image_url: imageName
          }))
        },
        product_subcategories: {
          create: numericSubcategoryIds.map(id => ({
            subcategory_id: id
          }))
        }
      }
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Função para obter todos os produtos
async function getProducts(req, res) {
  try {
    const products = await prisma.products.findMany({
      where: { deleted_at: null },
      include: {
        product_images: true,
        product_subcategories: {
          include: {
            subcategories: {
              include: {
                categories: true,
                subcategory_groups: true
              }
            }
          }
        }
      }
    });

    const formattedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      promotional_price: product.promotional_price ? product.promotional_price.toString() : null,
      quantity: product.quantity,
      is_active: product.is_active,
      deleted_at: product.deleted_at,
      product_images: product.product_images,
      product_subcategories: product.product_subcategories.map(ps => ({
        product_id: ps.product_id,
        subcategory_id: ps.subcategory_id,
        subcategories: {
          id: ps.subcategories.id,
          name: ps.subcategories.name,
          category: {
            id: ps.subcategories.categories.id,
            name: ps.subcategories.categories.name
          },
          subcategory_group: {
            id: ps.subcategories.subcategory_groups.id,
            name: ps.subcategories.subcategory_groups.name
          }
        }
      }))
    }));

    res.status(200).json(formattedProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Função para obter um produto por ID
async function getProductById(req, res) {
  try {
    const { id } = req.params;

    const numericId = parseInt(id, 10);
    if (!isValidNumber(numericId)) {
      return res.status(400).json({ error: 'ID do produto inválido.' });
    }

    const product = await prisma.products.findUnique({
      where: { id: numericId, deleted_at: null },
      include: {
        product_images: true,
        product_subcategories: {
          include: {
            subcategories: {
              include: {
                categories: true,
                subcategory_groups: true
              }
            }
          }
        }
      }
    });

    if (product) {
      const formattedProduct = {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        promotional_price: product.promotional_price ? product.promotional_price.toString() : null,
        quantity: product.quantity,
        is_active: product.is_active,
        deleted_at: product.deleted_at,
        product_images: product.product_images,
        product_subcategories: product.product_subcategories.map(ps => ({
          product_id: ps.product_id,
          subcategory_id: ps.subcategory_id,
          subcategories: {
            id: ps.subcategories.id,
            name: ps.subcategories.name,
            category: {
              id: ps.subcategories.categories.id,
              name: ps.subcategories.categories.name
            },
            subcategory_group: {
              id: ps.subcategories.subcategory_groups.id,
              name: ps.subcategories.subcategory_groups.name
            }
          }
        }))
      };

      res.status(200).json(formattedProduct);
    } else {
      res.status(404).json({ message: 'Produto não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Função para atualizar um produto
async function updateProduct(req, res) {
  try {
    const { id, name, description, price, promotional_price, quantity, subcategory_ids, is_active } = req.body;
    const imageFiles = req.files;

    const numericId = parseInt(id, 10);
    if (!isValidNumber(numericId)) {
      return res.status(400).json({ error: 'ID do produto inválido.' });
    }

    if (name && !isValidString(name)) {
      return res.status(400).json({ error: 'Nome não pode estar vazio.' });
    }

    if (price && !isValidDecimal(price)) {
      return res.status(400).json({ error: 'Preço deve ser um valor válido.' });
    }

    if (promotional_price && !isValidDecimal(promotional_price)) {
      return res.status(400).json({ error: 'Preço promocional deve ser um valor válido.' });
    }

    const numericPrice = price ? parseFloat(price) : undefined;
    const numericPromotionalPrice = promotional_price ? parseFloat(promotional_price) : undefined;
    const numericQuantity = quantity ? parseInt(quantity, 10) : undefined;

    // Converte subcategory_ids para um array se for uma string separada por vírgulas
    let numericSubcategoryIds = [];
    if (subcategory_ids) {
      if (typeof subcategory_ids === 'string') {
        numericSubcategoryIds = subcategory_ids.split(',').map(id => parseInt(id, 10));
      } else if (Array.isArray(subcategory_ids)) {
        numericSubcategoryIds = subcategory_ids.map(id => parseInt(id, 10));
      } else {
        return res.status(400).json({ error: 'subcategory_ids deve ser uma string separada por vírgulas ou um array.' });
      }

      const existingSubcategories = await prisma.subcategories.findMany({
        where: { id: { in: numericSubcategoryIds } }
      });

      if (existingSubcategories.length !== numericSubcategoryIds.length) {
        return res.status(400).json({ error: 'Uma ou mais subcategorias associadas não existem.' });
      }
    }

    // Faz o upload das novas imagens e obtém os nomes das imagens
    let uploadedImageNames = [];
    if (imageFiles && imageFiles.length > 0) {
      uploadedImageNames = await uploadImages(imageFiles);
    }

    // Obtém o produto atual para verificar imagens existentes
    const existingProduct = await prisma.products.findUnique({
      where: { id: numericId },
      include: { product_images: true }
    });

    if (!existingProduct) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }

    // Identifica imagens a serem removidas
    const currentImageNames = existingProduct.product_images.map(img => img.image_url);
    const imagesToRemove = currentImageNames.filter(imgName => !uploadedImageNames.includes(imgName));

    // Atualiza o produto
    const updatedProduct = await prisma.products.update({
      where: { id: numericId },
      data: {
        name,
        description,
        price: numericPrice,
        promotional_price: numericPromotionalPrice,
        quantity: numericQuantity,
        is_active: is_active !== undefined ? is_active : undefined,
        product_images: {
          deleteMany: {
            image_url: { in: imagesToRemove }
          },
          create: uploadedImageNames.map(imageName => ({
            image_url: imageName
          }))
        },
        product_subcategories: {
          deleteMany: {},
          create: numericSubcategoryIds.map(id => ({
            subcategory_id: id
          }))
        }
      }
    });

    // Remove as imagens que não são mais associadas
    await deleteImages(imagesToRemove);

    res.status(200).json(updatedProduct);
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Produto não encontrado.' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
}

// Função para deletar um produto
async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    const numericId = parseInt(id, 10);
    if (!isValidNumber(numericId)) {
      return res.status(400).json({ error: 'ID do produto inválido.' });
    }

    // Obtém o produto atual para verificar imagens existentes
    const existingProduct = await prisma.products.findUnique({
      where: { id: numericId },
      include: { product_images: true }
    });

    if (!existingProduct) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }

    // Identifica imagens a serem removidas
    const currentImageNames = existingProduct.product_images.map(img => img.image_url);

    // Remove o produto e suas associações de subcategorias
    await prisma.products.delete({
      where: { id: numericId }
    });

    // Marca o produto como deletado
    // const deletedProduct = await prisma.products.update({
    //   where: { id: numericId },
    //   data: {
    //     deleted_at: new Date()
    //   }
    // });

    // Remove as imagens associadas ao produto
    await deleteImages(currentImageNames);

    res.status(200).json({ message: 'Produto deletado com sucesso.' });
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Produto não encontrado.' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};