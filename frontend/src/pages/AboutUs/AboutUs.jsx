import React, { useEffect } from 'react';

// global components
import Header from 'components/Header'
import Footer from 'components/Footer'
import Contact from 'components/Contact'
import WhatsApp from 'components/WhatsApp';

// assets
import about from 'assets/images/about-teste.png';

function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Empório Maziero - Quem Somos';
  }, []);

  return (
    <section className='flex flex-col min-h-svh w-full items-center justify-center bg-white text-black'>
      <Header />
      <div className='my-8 flex w-11/12 flex-col items-center justify-center gap-4 md:w-9/12 mt-28'>
        <div className='flex w-full flex-col items-center justify-between gap-16 md:flex-row'>
          <aside className='flex flex-1 flex-col gap-4'>
            <header className='mb-4 text-4xl font-bold font-juana md:text-5xl'>Quem Somos?</header>
            <p className='text-justify text-lg md:text-xl'>
              O <strong>Empório Maziero</strong> surgiu há 4 anos, no início da pandemia, quando percebemos que o consumo
              familiar de vinhos havia aumentado. Não apenas por apreciarmos bons vinhos, mas porque entendemos que a
              experiência de beber uma taça de vinho em meio às incertezas do covid nos trazia alegria e harmonia entre
              nossa família.
            </p>
            <p className='text-justify text-lg md:text-xl'>
              Hoje, com 4 anos de mercado, nosso intuito é claro: levar emoção ao apreciar um bom vinho, reunindo aqueles
              que você mais ama. Entendemos que a experiência vai desde o nosso primeiro contato, e por isso, entregamos
              aos nossos clientes todo o nosso conhecimento e atenção, visando sempre um bom atendimento e um laço de
              parceria. Além disso, nos dedicamos a ensinar a arte da harmonização por meio de cursos, ajudando nossos
              clientes a descobrir o prazer de combinar vinhos com momentos especiais.
            </p>
          </aside>
          <img src={about} loading='lazy' alt='Imagem ilustrativa sobre quem somos' />
        </div>
        <div className='flex flex-col gap-8'>
          <article className='flex flex-col gap-2'>
            <header className='text-2xl font-bold md:text-3xl font-juana'>Nossa Missão</header>
            <p className='w-full text-justify text-lg md:text-xl'>
              Oferecer aos nossos clientes uma experiência única no mundo dos vinhos, entregando produtos de qualidade,
              com atendimento especializado, ensinando sobre harmonização e sempre criando um laço de confiança e parceria.
              Queremos que cada taça seja uma oportunidade de reunir amigos e familiares em um ambiente aconchegante e especial.
            </p>
          </article>
          <article className='flex flex-col gap-2'>
            <header className='text-2xl font-bold md:text-3xl font-juana'>Nossa Visão</header>
            <p className='w-full text-justify text-lg md:text-xl'>
              Transformar o Empório Maziero em um local de referência não só para encontrar vinhos e cervejas de qualidade,
              mas também um espaço acolhedor para encontros, jantares, comemorações e reuniões restritas. Nosso objetivo é
              proporcionar uma experiência completa, desde a escolha da bebida até os momentos especiais que ela pode criar.
            </p>
          </article>
          <article className='flex flex-col gap-2'>
            <header className='text-2xl font-bold md:text-3xl font-juana'>Nossos Valores</header>
            <p className='w-full text-justify text-lg md:text-xl'>
              Paixão pelo vinho, atendimento de excelência, confiança, respeito e compromisso com a qualidade.
            </p>
          </article>
        </div>
      </div>
      <Contact />
      <Footer />
      <WhatsApp />
    </section>
  );
}

export default AboutUs;