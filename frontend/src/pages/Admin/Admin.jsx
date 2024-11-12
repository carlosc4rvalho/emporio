import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import HomeSection from './components/HomeSection';
import ProductSection from './components/ProductSection';
import CategorySection from './components/CategorySection';
import SubcategoryGroupSection from './components/SubcategoryGroupSection';
import SubcategorySection from './components/SubcategorySection';

const Admin = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    document.title = 'Empório Maziero - Gerenciador da Loja';
    window.scrollTo(0, 0);
  }, []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'add-product':
        return <ProductSection />;
      case 'add-category':
        return <CategorySection />;
      case 'add-subcategory-group':
        return <SubcategoryGroupSection />;
      case 'add-subcategory':
        return <SubcategorySection />;
      case 'home':
      default:
        return <HomeSection onSectionChange={handleSectionChange} />;
    }
  };

  return (
    <main className='flex flex-col min-h-screen bg-[#c4ac75]'>
      <Header />
      {renderSection()}
      <Navbar onSelect={handleSectionChange} />
    </main>
  );
};

export default Admin;