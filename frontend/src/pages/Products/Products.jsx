import React, { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';
import { getAllProducts } from 'services/productService';
import { getAllCategories } from 'services/categoryService';
import { getAllSubcategories } from 'services/subcategoryService';
import Contact from 'components/Contact';
import Footer from 'components/Footer';
import Header from 'components/Header';
import SearchBar from './components/SearchBar';
import FilterSidebar from './components/FilterSidebar';
import SortSelector from './components/SortSelector';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [subcategoriesByGroup, setSubcategoriesByGroup] = useState({});
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Empório Maziero - Produtos';

    const fetchData = async () => {
      try {
        const [productsData, categoriesData, subcategoriesData] = await Promise.all([
          getAllProducts(),
          getAllCategories(),
          getAllSubcategories()
        ]);

        setProducts(productsData);
        setCategories(categoriesData);
        setSubcategories(subcategoriesData);

        const subcategoriesGroupMap = {};
        subcategoriesData.forEach(subcategory => {
          const groupName = subcategory.subcategory_groups.name;
          if (!subcategoriesGroupMap[groupName]) {
            subcategoriesGroupMap[groupName] = [];
          }
          subcategoriesGroupMap[groupName].push(subcategory);
        });
        setSubcategoriesByGroup(subcategoriesGroupMap);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = subcategories.filter(
      (sub) => !selectedCategories.length || selectedCategories.includes(sub.category.id.toString())
    );

    const filteredSubcategoriesGroupMap = {};
    filtered.forEach(subcategory => {
      const groupName = subcategory.subcategory_groups.name;
      if (!filteredSubcategoriesGroupMap[groupName]) {
        filteredSubcategoriesGroupMap[groupName] = [];
      }
      filteredSubcategoriesGroupMap[groupName].push(subcategory);
    });

    setFilteredSubcategories(filteredSubcategoriesGroupMap);
  }, [selectedCategories, subcategories]);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((id) => id !== value) : [...prev, value]
    );
  };

  const handleSubcategoryChange = (event) => {
    const value = event.target.value;
    setSelectedSubcategories((prev) =>
      prev.includes(value) ? prev.filter((id) => id !== value) : [...prev, value]
    );
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      !selectedCategories.length || product.product_subcategories.some(
        (sub) => selectedCategories.includes(sub.subcategories.category.id.toString())
      );
    const subcategoryMatch =
      selectedSubcategories.length === 0 || product.product_subcategories.some(
        (sub) => selectedSubcategories.includes(sub.subcategories.id.toString())
      );
    const searchMatch =
      !searchQuery || product.name.toLowerCase().includes(searchQuery);
    return categoryMatch && subcategoryMatch && searchMatch;
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOption === 'price-asc') {
      return a.price - b.price;
    } else if (sortOption === 'price-desc') {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <main className="flex flex-col justify-center items-center w-full bg-[#FFFFFF]">
      <Header />
      <div className="flex my-24 w-11/12 md:w-9/12">
        {/* {sortedProducts.length > 0 && (
          <FilterSidebar
            categories={categories}
            subcategories={filteredSubcategories}
            selectedCategories={selectedCategories}
            selectedSubcategories={selectedSubcategories}
            onCategoryChange={handleCategoryChange}
            onSubcategoryChange={handleSubcategoryChange}
          />
        )} */}
        <div className="flex-grow p-4 w-full">
          <div className="flex justify-end gap-2 items-center mb-4">
            <SearchBar onSearchChange={handleSearchChange} />
            <SortSelector
              sortOption={sortOption}
              onSortChange={handleSortChange}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {sortedProducts.length > 0 ? (
              sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className='w-full'>Nenhum produto encontrado</p>
            )}
          </div>
        </div>
      </div>
      <Contact />
      <Footer />
    </main>
  );
};

export default Products;