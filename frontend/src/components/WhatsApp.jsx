import React from 'react'
import whatsApp from 'assets/icons/whatsappFill.svg'

function WhatsApp() {
  const message = 'Olá, vim pelo site.'
  const phoneNumber = '5543999638690'
  const whatsAppLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`

  return (
    <a href={whatsAppLink} className='fixed bottom-4 right-4 hover:opacity-90' target='_blank'>
      <picture>
        <img src={whatsApp} alt='WhatsApp' loading='lazy' />
      </picture>
    </a>
  )
}

export default WhatsApp