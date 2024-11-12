import React from 'react';

const SortSelector = ({ sortOption, onSortChange }) => {
  return (
    <select
      className="flex items-center justify-between gap-2 rounded-xl border-2 border-brown p-4 bg-transparent text-brown"
      onChange={onSortChange}
      value={sortOption}
    >
      <option value="">Ordenar por</option>
      <option value="price-asc">Menor Preço</option>
      <option value="price-desc">Maior Preço</option>
    </select>
  );
};

export default SortSelector;