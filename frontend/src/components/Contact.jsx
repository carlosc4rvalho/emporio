import React from 'react'
import whatsapp from 'assets/icons/whatsapp.svg'

function Contact() {
  return (
    <section id='contact-section' className='flex w-full flex-col items-center justify-center bg-sand'>
      <div className='flex w-11/12 flex-col items-center justify-center gap-4 py-8 md:w-9/12 md:flex-row'>
        <div className='flex flex-col items-center justify-center gap-2 text-center'>
          <img src={whatsapp} alt='Whatsapp' className='h-16 w-16 md:h-20 md:w-20' />

          <figcaption className='text-2xl font-semibold md:text-5xl font-juana'>Atendimento Personalizado</figcaption>

          <p className='text-lg md:text-2xl'>Garanta um atendimento humanizado e personalizado dedicado a você!</p>

          <button className='rounded-full border-2 border-brown p-4 px-8 text-lg font-medium uppercase text-brown transition-all duration-500 hover:opacity-75 mt-4'>
            <a
              href='https://api.whatsapp.com/send?phone=5543999638690&text=Ol%C3%A1%2C%20vim%20pelo%20site.'
              target='_blank'
            >
              Fale com nosso time
            </a>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Contact
