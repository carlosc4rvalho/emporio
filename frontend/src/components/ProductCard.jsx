import React from 'react';

const ProductCard = () => {
  const product = {
    name: 'Produto Exemplo',
    price: 99.99
  };

  const handleDelete = () => {
    console.log('Produto deletado');
  };

  const handleArchive = () => {
    console.log('Produto arquivado');
  };

  return (
    <div className='overflow-x-auto w-full'>
      <div className='flex p-2 justify-between min-w-[400px]'>
        <div className='flex flex-col justify-between'>
          <div className='flex justify-between mb-2'>
            <span className='text-lg font-medium'>{product.name}</span>
            <span className='text-white'>{product.price.toFixed(2)}</span>
          </div>
          <div className='flex gap-2'>
            <button
              onClick={handleDelete}
              className='bg-red-500 text-white py-1 px-2 hover:bg-red-700'
            >
              Apagar
            </button>
            <button
              onClick={handleArchive}
              className='bg-yellow-500 text-white py-1 px-2 hover:bg-yellow-700'
            >
              Arquivar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;