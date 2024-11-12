import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from 'assets/icons/logo.svg';
import pesquisa from 'assets/icons/pesquisa.svg';
import menu from 'assets/icons/menu.svg';
import Navigation from './Navigation';

function Header() {
  const [showNavigation, setShowNavigation] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Log para debug
      console.log('Scroll Y:', currentScrollY);

      if (Math.abs(currentScrollY - lastScrollY) > 200) {
        setIsHeaderVisible(currentScrollY < lastScrollY);
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleClick = () => {
    console.log('Menu clicked');
    setShowNavigation(!showNavigation);
  };

  return (
    <>
      <header
        className={`fixed bg-filter top-0 z-30 flex w-full flex-col items-center justify-center gap-4 bg-white shadow-xl p-4 transition-all duration-300 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
          }`}
      >
        <nav className='flex w-11/12 items-center justify-between gap-8 text-xl text-brown'>
          <a href='https://mazieroemporio.com.br'>
            <img src={logo} alt='Empório Maziero' className='w-40' />
          </a>

          <ul className='hidden items-center justify-center gap-8 md:flex'>
            <li className='uppercase text-lg transition-colors duration-500 hover:text-sand'>
              <Link to='/produtos'>Tintos</Link>
            </li>
            <li className='uppercase text-lg transition-colors duration-500 hover:text-sand'>
              <Link to='/produtos'>Brancos</Link>
            </li>
            <li className='uppercase text-lg transition-colors duration-500 hover:text-sand'>
              <Link to='/produtos'>Rosés</Link>
            </li>
            <li className='uppercase text-lg transition-colors duration-500 hover:text-sand'>
              <Link to='/produtos'>Espumantes</Link>
            </li>
            <li className='uppercase text-lg transition-colors duration-500 hover:text-sand'>
              <Link to='/produtos'>Kits</Link>
            </li>
            <li className='uppercase text-lg transition-colors duration-500 hover:text-sand'>
              <Link to='/produtos'>Sale</Link>
            </li>
            <li className='uppercase text-lg transition-colors duration-500 hover:text-sand'>
              <Link to='/quem-somos'>Quem Somos</Link>
            </li>
          </ul>
          <div className='flex md:hidden'>
            <img src={menu} alt='' className='h-7 w-7 cursor-pointer' onClick={handleClick} />
          </div>
        </nav>
      </header>

      <Navigation isOpen={showNavigation} onClose={() => setShowNavigation(false)} />
    </>
  );
}

export default Header;