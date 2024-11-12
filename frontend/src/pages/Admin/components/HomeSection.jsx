import React from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CategoryIcon from '@mui/icons-material/Category';
import LabelIcon from '@mui/icons-material/Label';
import GroupIcon from '@mui/icons-material/Group';
import UserGreeting from './UserGreeting';

const Card = ({ title, description, onClick, icon }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col justify-center items-center gap-2 min-h-24 bg-white shadow-md rounded-[25px] p-4 cursor-pointer hover:bg-gray-100 transition-colors duration-300 w-full"
      aria-label={title}
    >
      <div className="text-3xl text-[#184d40]">
        {icon}
      </div>
      <div className="text-lg uppercase font-semibold text-gray-800">
        {title}
      </div>
      <div className="text-sm text-gray-600 mt-1 text-center">
        {description}
      </div>
    </button>
  );
};

const HomeSection = ({ onSectionChange }) => {
  return (
    <section>
      <div className='flex flex-col p-4 rounded-b-[25px] bg-white'>
        <UserGreeting />
      </div>
      <div className='flex flex-col flex-1 p-6'>
        <div className='grid grid-cols-1 gap-4 mb-20'>
          <Card
            title="Adicionar Produto"
            description="Preencha sua loja com produtos novos."
            onClick={() => onSectionChange('add-product')}
            icon={<AddBoxIcon />}
          />
          <Card
            title="Adicionar Categoria"
            description="Organize sua loja com categorias."
            onClick={() => onSectionChange('add-category')}
            icon={<CategoryIcon />}
          />
          <Card
            title="Adicionar Grupo de Subcategoria"
            description="Crie grupos para uma melhor organização das suas subcategorias."
            onClick={() => onSectionChange('add-subcategory-group')}
            icon={<GroupIcon />}
          />
          <Card
            title="Adicionar Subcategoria"
            description="Crie subcategorias para uma melhor organização."
            onClick={() => onSectionChange('add-subcategory')}
            icon={<LabelIcon />}
          />
        </div>
      </div>
    </section>
  );
};

export default HomeSection;