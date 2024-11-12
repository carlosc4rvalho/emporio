import React from 'react'
import { Link } from 'react-router-dom'

import instagram from 'assets/icons/instagram.svg'
import facebook from 'assets/icons/facebook.svg'
import whatsapp from 'assets/icons/whatsapp.svg'

function Footer() {
  return (
    <footer className='flex w-full items-center justify-center bg-white'>
      <div className='flex w-full flex-col gap-12 items-center justify-center pt-8 text-lg text-brown'>
        <div className='grid w-11/12 grid-cols-1 justify-center gap-8 md:w-10/12 md:grid-cols-4'>
          {/* Nossa empresa */}
          <div className='flex flex-col gap-4'>
            <header className='text-xl font-medium uppercase md:text-2xl'>Nossa empresa</header>
            <ul className='flex flex-col gap-2'>
              <li>
                <Link to='/quem-somos' className='hover:text-sand'>
                  Quem Somos
                </Link>
              </li>
            </ul>
          </div>

          {/* Atendimento */}
          <div className='flex flex-col gap-4'>
            <header className='text-xl font-medium uppercase md:text-2xl'>Atendimento</header>
            <ul className='flex flex-col gap-2'>
              <li>
                <a href='https://api.whatsapp.com/send?phone=5543999638690&text=Ol%C3%A1%2C%20vim%20pelo%20site.' target='_blank' className='hover:text-sand'>
                  (43) 99963-8690
                </a>
              </li>
              <li>
                <a href='#' target='_blank' className='hover:text-sand'>
                  atendimento@mazieroemporio.com.br
                </a>
              </li>
              <li>
                <a href='https://maps.app.goo.gl/WoCdrWYaj5UQ7jVu5' target='_blank' className='hover:text-sand'>
                  Av. Tancredo Neves, 1830 - Centro, Ivaiporã - PR, 86870-000
                </a>
              </li>
              <li>Segunda a Sexta das 09 as 18 horas</li>
              <li>Sábados das 09 as 12 horas</li>
            </ul>
          </div>

          {/* Nossas políticas */}
          <div className='flex flex-col gap-4'>
            <header className='text-xl font-medium uppercase md:text-2xl'>Nossas políticas</header>
            <ul className='flex flex-col gap-2'>
              <li>
                <Link to='/' className='hover:text-sand'>
                  Política de entrega
                </Link>
              </li>
              <li>
                <Link to='/' className='hover:text-sand'>
                  Dúvidas de privacidade
                </Link>
              </li>
              <li>
                <Link to='/' className='hover:text-sand'>
                  Dúvidas de Troca e Devoluções
                </Link>
              </li>
            </ul>
          </div>

          {/* Nos Siga em Nossas Redes */}
          <div className='flex flex-col gap-4'>
            <header className='text-xl font-medium uppercase md:text-2xl'>Siga o Empório Maziero</header>
            <ul className='flex items-center gap-2'>
              <li>
                <a href='https://www.instagram.com/emporiomaziero/' target='_blank'>
                  <img src={instagram} alt='Instagram' className='hover:opacity-75 h-14 w-16' />
                </a>
              </li>
              <li>
                <a href='https://www.instagram.com/emporiomaziero/' target='_blank'>
                  <img src={facebook} alt='Facebook' className='hover:opacity-75 h-14 w-16' />
                </a>
              </li>
              <li>
                <a href='https://api.whatsapp.com/send?phone=5543999638690&text=Ol%C3%A1%2C%20vim%20pelo%20site.' target='_blank'>
                  <img src={whatsapp} alt='WhatsApp' className='hover:opacity-75 h-14 w-16' />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='flex w-full flex-col text-center gap-2 p-4 bg-brown text-white uppercase text-xs md:flex-row justify-center md:items-center'>
          <a href='#'>
            &copy;Empório Maziero Copyright 2024 - Todos os Direitos Reservados.
          </a>
          <a href='https://dorac.com.br' target='_blank'>
            Desenvolvido por <span className='underline'>Agência Dorac</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer