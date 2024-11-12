import React, { useState } from 'react';

const FilterSidebar = ({
  categories = [],
  subcategories = {},
  selectedCategories = [],
  selectedSubcategories = [],
  onCategoryChange,
  onSubcategoryChange
}) => {
  // Estado para controlar a visibilidade das categorias/subcategorias no mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [openSubcategoryGroups, setOpenSubcategoryGroups] = useState({});

  // Alterna a visibilidade do menu no mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Alterna a visibilidade das categorias
  const toggleCategoryVisibility = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  // Alterna a visibilidade dos grupos de subcategorias
  const toggleSubcategoryGroupVisibility = (groupName) => {
    setOpenSubcategoryGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  return (
    <>
      {/* Sidebar de Filtros */}
      <aside className={`p-4 hidden md:block w-2/5`}>
        {/* Categorias */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold mb-2">Categorias</h3>
            <button onClick={toggleCategoryVisibility} className="text-xl">
              {isCategoryOpen ? '-' : '+'}
            </button>
          </div>
          <hr className="border-gray-500 mb-2" />
          {isCategoryOpen && (
            <div>
              {categories.map((category) => (
                <div key={category.id} className="mb-2">
                  <input
                    type="checkbox"
                    id={`category-${category.id}`}
                    value={category.id}
                    onChange={onCategoryChange}
                    checked={selectedCategories.includes(category.id.toString())}
                    className="cursor-pointer"
                  />
                  <label htmlFor={`category-${category.id}`} className="ml-2 text-lg">
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Subcategorias */}
        <div>
          {Object.entries(subcategories).map(([groupName, subs]) => (
            <div key={groupName} className="mb-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-xl mb-2">{groupName}</h3>
                <button
                  onClick={() => toggleSubcategoryGroupVisibility(groupName)}
                  className="text-xl"
                >
                  {openSubcategoryGroups[groupName] ? '-' : '+'}
                </button>
              </div>
              <hr className="border-gray-500 mb-2" />
              {openSubcategoryGroups[groupName] && (
                <div>
                  {subs.map((sub) => (
                    <div key={sub.id} className="mb-2">
                      <input
                        type="checkbox"
                        id={`subcategory-${sub.id}`}
                        value={sub.id}
                        onChange={onSubcategoryChange}
                        checked={selectedSubcategories.includes(sub.id.toString())}
                        className="cursor-pointer"
                      />
                      <label htmlFor={`subcategory-${sub.id}`} className="ml-2 text-lg">
                        {sub.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;