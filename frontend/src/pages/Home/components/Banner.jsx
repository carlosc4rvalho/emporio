import React from 'react';
import Slider from 'react-slick';
import banner1 from 'assets/images/banner1.png';
import banner2 from 'assets/images/banner2.png';
// import banner3 from 'assets/images/banner3.png';
import verificado from 'assets/icons/verificado.svg';
import envio from 'assets/icons/envio.svg';
import parcelamento from 'assets/icons/parcelamento.svg';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Banner() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000
  };

  return (
    <section className='relative flex items-end'>
      {/* Carrossel de imagens */}
      <Slider {...settings} className='w-full'>
        <img src={banner1} alt="Banner 1" className='object-cover min-h-svh max-h-svh w-full' />
        <img src={banner2} alt="Banner 2" className='object-cover min-h-svh max-h-svh w-full' />
        {/* <img src={banner3} alt="Banner 3" className='object-cover min-h-svh max-h-svh w-full' /> */}
      </Slider>

      {/* Destaques - sobre o carrossel de imagens */}
      <div className='absolute bottom-0 left-0 right-0 flex w-full items-center justify-center bg-brown p-3'>
        <ul className='grid w-full grid-cols-3 items-center justify-center gap-2'>
          <li className='flex flex-col items-center justify-center gap-2 md:flex-row'>
            <img src={parcelamento} alt='Parcelamento' className='h-8 w-8 md:h-16 md:w-16' />
            <span className='text-center text-xs text-white md:text-lg'>Parcelamento em até 3x</span>
          </li>
          <li className='flex flex-col items-center justify-center gap-2 md:flex-row'>
            <img src={envio} alt='Frete grátis' className='h-8 w-8 md:h-16 md:w-16' />
            <span className='text-center text-xs text-white md:text-lg'>Enviamos para todo o Brasil</span>
          </li>
          <li className='flex flex-col items-center justify-center gap-2 md:flex-row'>
            <img src={verificado} alt='Produtos legítimos' className='h-8 w-8 md:h-16 md:w-16' />
            <span className='text-center text-xs text-white md:text-lg'>Produtos Legítimos</span>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Banner;
