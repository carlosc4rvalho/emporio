import React from 'react';
import { Link } from 'react-router-dom';
import profile from 'assets/images/profile.svg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Header() {
    return (
        <header className='flex justify-center items-center w-full p-4 bg-white'>
            <nav className='flex items-center justify-between w-full'>
                <Link to='/' className='flex items-center rounded-full p-4 bg-[#DDDDDD]'>
                    <ArrowBackIcon className='w-10 h-10 text-[#69443C]' />
                </Link>
                <img src={profile} alt="foto de perfil" className='rounded-full w-14 h-14' />
            </nav>
        </header>
    );
}

export default Header;