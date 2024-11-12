import React, { useState, useEffect, useRef } from 'react';
import { getAllProducts, deleteProduct, createProduct } from 'services/productService';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ProductForm from './ProductForm';

const formatCurrency = (value) => {
  const numberValue = parseFloat(value);
  if (isNaN(numberValue)) return 'R$ 0,00';

  const adjustedValue = numberValue / 100;

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(adjustedValue);
};

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [activeProductId, setActiveProductId] = useState(null);
  const menuRefs = useRef({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error.message);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (productId, event) => {
    event.stopPropagation();
    const confirmDelete = window.confirm('Tem certeza que deseja deletar este produto?');
    if (confirmDelete) {
      try {
        await deleteProduct(productId);
        alert('Produto deletado com sucesso!');
        setProducts(products.filter((product) => product.id !== productId));
        setActiveProductId(null);
      } catch (error) {
        console.error('Erro ao deletar produto:', error.message);
      }
    }
  };

  const handleSubmitProduct = async (newProduct, imageFiles) => {
    try {
      await createProduct(newProduct, imageFiles);
      alert('Produto cadastrado com sucesso!');
      const productsData = await getAllProducts();
      setProducts(productsData);
      setShowForm(false);
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error.message);
    }
  };

  const toggleOptions = (productId) => {
    setActiveProductId((prevId) => (prevId === productId ? null : productId));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      let clickedOutside = true;
      if (activeProductId && menuRefs.current[activeProductId]) {
        if (menuRefs.current[activeProductId].contains(event.target)) {
          clickedOutside = false;
        }
      }
      if (activeProductId && event.target.closest('.delete-button')) {
        clickedOutside = false;
      }
      if (clickedOutside) {
        setActiveProductId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeProductId]);

  return (
    <section className='bg-white min-h-svh p-4 pb-20'>
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className='bg-blue-500 text-white p-4 rounded-full text-lg font-medium fixed bottom-24 md:bottom-4 right-4 z-50'
          aria-label='Cadastrar novo produto'
        >
          + Novo Produto
        </button>
      )}

      {showForm ? (
        <ProductForm
          onSubmit={handleSubmitProduct}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <>
          <header className='flex items-center gap-1 mb-2'>
            <h1 className='text-2xl font-semibold'>Produtos</h1>
            <span className='text-xl font-medium'>({products.length} produtos)</span>
          </header>
          {products.length > 0 ? (
            <ul className='flex flex-col gap-2 overflow-x-auto w-full'>
              {products.map((product) => (
                <li key={product.id} className='flex flex-col gap-2 pt-2 pb-4 px-4 bg-sand rounded-lg text-xs'>
                  <div className='flex justify-between items-center'>
                    <div className='text-base font-medium'>{product.name}</div>
                    <div className='relative'>
                      <IconButton
                        onClick={() => toggleOptions(product.id)}
                        ref={(el) => (menuRefs.current[product.id] = el)}
                        aria-label='Mais opções'
                      >
                        <MoreVertIcon />
                      </IconButton>
                      {activeProductId === product.id && (
                        <div className='absolute right-0 mt-2 w-24 rounded-lg shadow-lg'>
                          <button
                            onClick={(event) => handleDelete(product.id, event)}
                            className='text-center p-2 bg-red-600 text-white font-medium text-base w-full rounded-lg delete-button'
                            aria-label='Deletar produto'
                          >
                            Deletar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='truncate' title={product.description}>
                    {product.description}
                  </div>
                  <div className='font-medium'>{formatCurrency(product.promotional_price)}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p className='text-gray-500 text-center mt-8'>Nenhum produto cadastrado.</p>
          )}
        </>
      )}
    </section>
  );
};

export default ProductSection;