import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import loading from 'assets/images/loading.svg';
import API_BASE_URL from 'config/apiConfig';

const API_URL = `${API_BASE_URL}/uploads/`;

const ProductCard = ({ product }) => {
  const { name, price, promotional_price, product_images } = product;
  const imageUrl = product_images.length > 0 ? product_images[0].image_url : 'default-image.jpg';

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Tempo de 3 segundos

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    navigate(`/produto/${product.id}`, { state: { product } });
  };

  // Função para formatar valores em reais
  const formatCurrency = (value) => {
    // Garantir que o valor seja um número
    const numberValue = parseFloat(value);
    if (isNaN(numberValue)) return 'R$ 0,00';

    // Ajustar o valor se necessário (dividir por 100 se for em centavos)
    const adjustedValue = numberValue / 100;

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(adjustedValue);
  };

  return (
    <div
      className="flex flex-col justify-center items-center text-center bg-brown shadow-md overflow-hidden w-full cursor-pointer"
      onClick={handleClick}
    >
      {/* Skeleton para imagem */}
      <picture className="w-full">
        {isLoading ? (
          <img
            className="w-full h-full object-cover bg-white aspect-square transition-opacity duration-1000 opacity-100"
            src={loading}
            alt={name}
          />
        ) : (
          <img
            className="w-full h-full object-cover bg-white aspect-square transition-opacity duration-1000 opacity-100"
            src={`${API_URL}${imageUrl}`}  // Usando a URL da API
            alt={name}
          />
        )}
      </picture>

      {/* Skeleton para informações do produto */}
      <div className="p-4 w-full text-white">
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-6 bg-gray-300 mb-2 w-2/3"></div> {/* Skeleton do título */}
            <div className="h-4 bg-gray-300 mb-1 w-1/2"></div> {/* Skeleton do preço */}
          </div>
        ) : (
          <div className="flex flex-col gap-1 mb-2">
            {/* {promotional_price && (
              <span className="text-slate-400 text-md font-semibold line-through">
                {formatCurrency(promotional_price)}
              </span>
            )} */}
            <h2 className="text-xl">{name}</h2>
            <span className="text-2xl font-semibold">{formatCurrency(promotional_price)}</span>
          </div>
        )}
      </div>

      {/* Skeleton para o botão */}
      {isLoading ? (
        <div className="w-full h-12 bg-gray-300 animate-pulse"></div>
      ) : (
        <button className="bg-green text-white text-xl font-bold p-4 w-full hover:opacity-75 transition-opacity duration-500">
          Compre Já!
        </button>
      )}
    </div>
  );
};

export default ProductCard;