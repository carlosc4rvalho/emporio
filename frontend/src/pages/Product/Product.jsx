import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from 'services/productService';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Footer from 'components/Footer';
import Header from 'components/Header';
import Contact from 'components/Contact';

import API_BASE_URL from 'config/apiConfig';

const API_URL = `${API_BASE_URL}/uploads/`;

// Defina o número de telefone do WhatsApp aqui
const WHATSAPP_PHONE_NUMBER = '5543999638690';

const formatCurrency = (value) => {
  const numberValue = parseFloat(value);
  if (isNaN(numberValue)) return 'R$ 0,00';

  const adjustedValue = numberValue / 100;

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(adjustedValue);
};

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
        setIsLoading(false);
      } catch (error) {
        setError('Erro ao carregar produto');
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    document.title = product ? `Empório Maziero - ${product.name}` : 'Empório Maziero - Produto';
  }, [product]);

  if (isLoading) return <p className="text-center text-lg">Carregando...</p>;
  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;

  // Agrupando subcategorias por grupo
  const groupedSubcategories = product.product_subcategories.reduce((acc, item) => {
    const groupName = item.subcategories.subcategory_group.name;
    if (!acc[groupName]) {
      acc[groupName] = [];
    }
    acc[groupName].push(item.subcategories);
    return acc;
  }, {});

  // Configurações do carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  // URL do link do WhatsApp com a mensagem personalizada
  const whatsappMessage = `Olá, gostaria de comprar: *${product.name}* \n*Preço:* ${formatCurrency(product.promotional_price)} \n*Link:* ${window.location.href} \nObrigado!`;
  const whatsappLink = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE_NUMBER}&text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <main className="flex flex-col items-center w-full min-h-screen bg-gray-100">
      <Header />
      {product ? (
        <div className="flex flex-col items-center md:mt-28 my-16">
          <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center w-full">
            {product.product_images.map((img) => (
              <picture key={img.id} className="w-full transition-opacity duration-500">
                <img
                  src={`${API_URL}${img.image_url}`}
                  alt={product.name}
                  className="w-full h-96 object-cover"
                />
              </picture>
            ))}

            <aside className="bg-white rounded-t-xl p-4">
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="text-3xl font-semibold text-red-500 mb-2">
                  {formatCurrency(product.promotional_price)}
                </p>
                {product.promotional_price >= 25000 && (
                  <>em até 3x de {formatCurrency(product.promotional_price / 3)}</>
                )}
              </div>
              <a href={whatsappLink} className="flex items-center justify-center gap-2 bg-green text-white text-lg p-4 rounded-lg w-full hover:bg-green-600 transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                </svg>
                <span>Solicite via WhatsApp!</span>
              </a>
              <p className="mt-4">{product.description}</p>

              <div className="subcategories mt-8 flex flex-col">
                {Object.entries(groupedSubcategories).map(([groupName, subcategories]) => (
                  <div key={groupName} className="flex items-center mb-4">
                    <h2 className="text-xl font-bold mb-0 mr-4">Categoria:</h2>
                    {subcategories.map((sub) => (
                      <p key={sub.id} className="text-lg">{sub.name}</p>
                    ))}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg">Produto não encontrado.</p>
      )}
      <Contact />
      <Footer />
    </main>
  );
}

export default Product;