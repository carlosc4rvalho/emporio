import React,{ Link } from 'react-router-dom';
import vinho from 'assets/images/vinho.png';

function Promotions() {
    return (
        <Link to='/produtos' className='flex min-h-svh w-full items-center justify-center bg-white text-black'>
            <div className='my-8 flex w-11/12 flex-col gap-8 md:w-9/12'>
                <header className='flex flex-col gap-2 font-juana'>
                    <h2 className='text-6xl text-gray-800 font-semibold'>Promoções</h2>
                    <p className='text-xl'>aproveite, por tempo limitado.</p>
                </header>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-8 justify-center items-center'>
                    <article className='flex flex-col gap-2 bg-brown text-white rounded-3xl -m-1 text-center'>
                        <img src={vinho} alt="" />
                        <div className='flex flex-col gap-2 p-2'>
                            <p className='text-2xl'>Vinho X</p>
                            <p className='text-xl'>R$300,00</p>
                            <p>em até 3x de R$100,00</p>
                        </div>
                        <div className='text-xl font-medium bg-green p-4'>
                            Compre Já
                        </div>
                    </article>
                    <article className='flex flex-col gap-2 bg-brown text-white rounded-3xl -m-1 text-center'>
                        <img src={vinho} alt="" />
                        <div className='flex flex-col gap-2 p-2'>
                            <p className='text-2xl'>Vinho X</p>
                            <p className='text-xl'>R$300,00</p>
                            <p>em até 3x de R$100,00</p>
                        </div>
                        <div className='text-xl font-medium bg-green p-4'>
                            Compre Já
                        </div>
                    </article>
                    <article className='flex flex-col gap-2 bg-brown text-white rounded-3xl -m-1 text-center'>
                        <img src={vinho} alt="" />
                        <div className='flex flex-col gap-2 p-2'>
                            <p className='text-2xl'>Vinho X</p>
                            <p className='text-xl'>R$300,00</p>
                            <p>em até 3x de R$100,00</p>
                        </div>
                        <div className='text-xl font-medium bg-green p-4'>
                            Compre Já
                        </div>
                    </article>
                    <article className='flex flex-col gap-2 bg-brown text-white rounded-3xl -m-1 text-center'>
                        <img src={vinho} alt="" />
                        <div className='flex flex-col gap-2 p-2'>
                            <p className='text-2xl'>Vinho X</p>
                            <p className='text-xl'>R$300,00</p>
                            <p>em até 3x de R$100,00</p>
                        </div>
                        <div className='text-xl font-medium bg-green p-4'>
                            Compre Já
                        </div>
                    </article>
                </div>
            </div>
        </Link>
    );
}

export default Promotions;