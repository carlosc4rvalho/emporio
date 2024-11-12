import React from 'react';
import pesquisa from 'assets/icons/pesquisa.svg';

const SearchBar = ({ onSearchChange }) => {
  return (
    <div className="flex justify-end">
      <label
        htmlFor='search'
        className='flex items-center justify-between gap-2 rounded-xl border-2 border-brown p-4'
      >
        <input
          id='search'
          name='search'
          type='text'
          placeholder='O que você procura?'
          className='bg-transparent w-full outline-none'
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <img src={pesquisa} alt='Ícone de pesquisa' className='h-6 w-6' />
      </label>
    </div>
  );
};

export default SearchBar;