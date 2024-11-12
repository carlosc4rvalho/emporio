import React, { useEffect } from 'react'

// global components
import Header from 'components/Header'
import Footer from 'components/Footer'
import Contact from 'components/Contact'
import WhatsApp from 'components/WhatsApp';

// local components
import Banner from './components/Banner'
import Promotions from './components/Promotions';
import Kits from './components/Kits.jsx';

function Home() {
  useEffect(() => {
    document.title = 'Empório Maziero';
  }, []);

  return (
    <main>
      <Header />
      <Banner />
      <Promotions />
      <Kits />
      <Contact />
      <Footer />
      <WhatsApp />
    </main>
  )
}

export default Home