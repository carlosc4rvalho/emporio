import React from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LabelIcon from '@mui/icons-material/Label';

const Navbar = ({ onSelect, currentPage }) => {
  const isActive = (page) => currentPage === page;

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-[#184d40] flex justify-around p-2 md:hidden">
      <button 
        onClick={() => onSelect('home')} 
        className={`flex flex-col items-center p-3 w-16 h-16 rounded-lg ${isActive('home') ? 'bg-gray-300' : ''}`}
      >
        <HomeOutlinedIcon className={`text-3xl ${isActive('home') ? 'text-blue-600' : 'text-white'}`} />
        <span className={`text-xs ${isActive('home') ? 'text-blue-600' : 'text-white'}`}>Início</span>
      </button>
      <button 
        onClick={() => onSelect('add-product')} 
        className={`flex flex-col items-center p-3 w-16 h-16 rounded-lg ${isActive('add-product') ? 'bg-gray-300' : ''}`}
      >
        <ShoppingBagIcon className={`text-3xl ${isActive('add-product') ? 'text-blue-600' : 'text-white'}`} />
        <span className={`text-xs ${isActive('add-product') ? 'text-blue-600' : 'text-white'}`}>Produtos</span>
      </button>
      <button 
        onClick={() => onSelect('add-category')} 
        className={`flex flex-col items-center p-3 w-16 h-16 rounded-lg ${isActive('add-category') ? 'bg-gray-300' : ''}`}
      >
        <ListAltIcon className={`text-3xl ${isActive('add-category') ? 'text-blue-600' : 'text-white'}`} />
        <span className={`text-xs ${isActive('add-category') ? 'text-blue-600' : 'text-white'}`}>Categorias</span>
      </button>
      <button 
        onClick={() => onSelect('add-subcategory')} 
        className={`flex flex-col items-center p-3 w-16 h-16 rounded-lg ${isActive('add-subcategory') ? 'bg-gray-300' : ''}`}
      >
        <LabelIcon className={`text-3xl ${isActive('add-subcategory') ? 'text-blue-600' : 'text-white'}`} />
        <span className={`text-xs ${isActive('add-subcategory') ? 'text-blue-600' : 'text-white'}`}>Subcategorias</span>
      </button>
    </nav>
  );
};

export default Navbar;