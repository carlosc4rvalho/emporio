import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getAllCategories } from 'services/categoryService';
import { getAllSubcategories } from 'services/subcategoryService';

const ProductForm = ({ onSubmit, onCancel, initialProductData = {} }) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '0',
    promotional_price: '',
    quantity: '1',
    subcategory_ids: [],
    is_active: false,
    ...initialProductData,
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [imageError, setImageError] = useState('');
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const fetchedSubcategories = await getAllSubcategories();
        setSubcategories(fetchedSubcategories);
      } catch (error) {
        console.error('Erro ao carregar subcategorias:', error.message);
      }
    };

    fetchSubcategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleCheckboxChange = (subcategoryId) => {
    setNewProduct((prevProduct) => {
      const updatedSubcategoryIds = prevProduct.subcategory_ids.includes(subcategoryId)
        ? prevProduct.subcategory_ids.filter(id => id !== subcategoryId)
        : [...prevProduct.subcategory_ids, subcategoryId];

      return { ...prevProduct, subcategory_ids: updatedSubcategoryIds };
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validImages = [];
    setImageError('');

    const loadPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);

        img.onload = () => {
          if (img.width === img.height) {
            validImages.push({ file, id: file.name });
            resolve();
          } else {
            reject(`A imagem ${file.name} não tem proporção 1:1 (quadrada).`);
          }
          URL.revokeObjectURL(objectUrl);
        };

        img.onerror = () => {
          reject(`Erro ao carregar a imagem ${file.name}.`);
        };

        img.src = objectUrl;
      });
    });

    Promise.allSettled(loadPromises)
      .then((results) => {
        const errors = results.filter(result => result.status === 'rejected').map(result => result.reason);
        if (errors.length > 0) {
          setImageError(errors.join(' '));
        }
        setImageFiles((prevFiles) => [...prevFiles, ...validImages]);
      });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedImages = Array.from(imageFiles);
    const [movedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, movedImage);
    setImageFiles(reorderedImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newProduct, imageFiles.map(img => img.file));
  };

  return (
    <form onSubmit={handleSubmit} className='bg-white rounded-lg p-6 mb-6'>
      <h2 className='text-2xl font-bold mb-4'>Cadastrar Produto</h2>

      {/* Nome */}
      <div className='mb-4'>
        <label className='block text-gray-700 font-medium mb-2'>Nome:</label>
        <input
          type='text'
          name='name'
          value={newProduct.name}
          onChange={handleInputChange}
          className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500'
          required
        />
      </div>

      {/* Descrição */}
      <div className='mb-4'>
        <label className='block text-gray-700 font-medium mb-2'>Descrição:</label>
        <textarea
          name='description'
          value={newProduct.description}
          onChange={handleInputChange}
          className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500'
          rows='4'
          required
        />
      </div>

      {/* Preço */}
      <div className='hidden mb-4'>
        <label className='block text-gray-700 font-medium mb-2'>Preço:</label>
        <input
          type='number'
          name='price'
          value={newProduct.price}
          onChange={handleInputChange}
          className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500'
          step='0.01'
          required
        />
      </div>

      {/* Preço Promocional */}
      <div className='mb-4'>
        <label className='block text-gray-700 font-medium mb-2'>Preço:</label>
        <input
          type='number'
          name='promotional_price'
          value={newProduct.promotional_price}
          onChange={handleInputChange}
          className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500'
          step='0.01'
        />
      </div>

      {/* Subcategorias */}
      <div className='mb-4'>
        <label className='block text-gray-700 font-medium mb-2'>Subcategorias:</label>
        {subcategories.slice(0, 4).map((subcategory) => (
          <div key={subcategory.id} className='flex items-center'>
            <input
              type='checkbox'
              checked={newProduct.subcategory_ids.includes(subcategory.id)}
              onChange={() => handleCheckboxChange(subcategory.id)}
              className='mr-2'
            />
            <span>{subcategory.name}</span>
          </div>
        ))}
      </div>

      {/* Imagens */}
      <div className='mb-4'>
        <label className='block text-gray-700 font-medium mb-2'>Imagens:</label>
        <label htmlFor='file' className='flex text-gray-700 font-medium border-2 border-dashed border-green h-36 rounded-xl p-2 justify-center items-center text-center'>
          Formatos aceitos: JPG, JPEG, PNG, WEBP e HEIC. Máximo de 20MB por imagem. Formato 1x1.
        </label>
        <input
          id='file'
          type='file'
          multiple
          onChange={handleImageChange}
          className='hidden w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500'
        />
        {imageError && <p className='text-red-500'>{imageError}</p>}
      </div>

      {/* Drag-and-Drop Image List */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="images" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className='flex flex-wrap gap-4 my-4'
              style={{ minHeight: '100px' }}
            >
              {imageFiles.map((img, index) => (
                <Draggable key={img.id} draggableId={img.id} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className='w-32 h-32 relative bg-gray-100 border rounded flex items-center justify-center'
                    >
                      <img
                        src={URL.createObjectURL(img.file)}
                        alt={`Preview ${img.id}`}
                        className='w-full h-full object-cover rounded'
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Botões */}
      <div className='flex gap-2'>
        <button
          type='submit'
          className='bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300'
        >
          Cadastrar
        </button>
        <button
          type='button'
          onClick={onCancel}
          className='bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition duration-300'
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ProductForm;