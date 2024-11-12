import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Navigation({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleClose = () => {
    onClose()
  }

  const handleLinkClick = () => {
    handleClose()
  }

  const overlayClass = isOpen ? 'opacity-80' : 'opacity-0 pointer-events-none'
  const translateClass = isOpen ? 'translate-x-0' : 'translate-x-full'

  return (
    <section id='nav' className='transition-all'>
      <div
        className={`fixed inset-0 z-30 bg-black ${overlayClass} backdrop-blur-xl backdrop-filter duration-500 ease-in-out`}
        onClick={handleClose}
      />
      <nav
        className={`fixed inset-y-0 right-0 z-40 flex w-10/12 flex-col justify-center gap-8 bg-brown text-white font-semibold bg-opacity-75 p-8 shadow-lg backdrop-blur-2xl duration-1000 ease-in-out md:w-1/3 ${translateClass}`}
      >
        <ul className='flex flex-col gap-6'>
          <li className='text-3xl transition-colors duration-500 hover:text-sand'>
            <Link to='/produtos'>Tintos</Link>
          </li>
          <li className='text-3xl transition-colors duration-500 hover:text-sand'>
            <Link to='/produtos'>Brancos</Link>
          </li>
          <li className='text-3xl transition-colors duration-500 hover:text-sand'>
            <Link to='/produtos'>Rosés</Link>
          </li>
          <li className='text-3xl transition-colors duration-500 hover:text-sand'>
            <Link to='/produtos'>Espumantes</Link>
          </li>
          <li className='text-3xl transition-colors duration-500 hover:text-sand'>
            <Link to='/produtos'>Kits</Link>
          </li>
          <li className='text-3xl transition-colors duration-500 hover:text-sand'>
            <Link to='/produtos'>Sale</Link>
          </li>
          <li className='text-3xl transition-colors duration-500 hover:text-sand'>
            <Link to='/quem-somos'>Quem Somos</Link>
          </li>
        </ul>
      </nav>
    </section>
  )
}

export default Navigation