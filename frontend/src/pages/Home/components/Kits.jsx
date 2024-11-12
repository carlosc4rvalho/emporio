import React,{ Link } from 'react-router-dom';
import produto from 'assets/images/vinho.png';

function Kits() {
    return (
        <Link to='/produtos' className='flex min-h-svh w-full items-center justify-center bg-white text-black'>
            <div className='flex flex-col md:flex-row gap-8 justify-center items-center w-9/12 md:w-10/12 my-16'>
                <article className='flex flex-col gap-2'>
                    <h2 className='text-7xl font-bold font-juana text-gray-800'>Nossos Kits</h2>
                </article>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
                    <article className='flex flex-col gap-2 bg-brown text-white rounded-2xl text-center'>
                        <img src={produto} alt="" />
                        <div className='flex flex-col gap-2 p-2'>
                            <p className='text-2xl'>Vinho X</p>
                            <p className='text-xl'>R$300,00</p>
                            <p>em até 3x de R$100,00</p>
                        </div>
                        <div className='text-xl font-medium bg-green p-2'>
                            Compre Já
                        </div>
                    </article>
                    <article className='flex flex-col gap-2 bg-brown text-white rounded-2xl text-center'>
                        <img src={produto} alt="" />
                        <div className='flex flex-col gap-2 p-2'>
                            <p className='text-2xl'>Vinho X</p>
                            <p className='text-xl'>R$300,00</p>
                            <p>em até 3x de R$100,00</p>
                        </div>
                        <div className='text-xl font-medium bg-green p-2'>
                            Compre Já
                        </div>
                    </article>
                    <article className='flex flex-col gap-2 bg-brown text-white rounded-2xl text-center'>
                        <img src={produto} alt="" />
                        <div className='flex flex-col gap-2 p-2'>
                            <p className='text-2xl'>Vinho X</p>
                            <p className='text-xl'>R$300,00</p>
                            <p>em até 3x de R$100,00</p>
                        </div>
                        <div className='text-xl font-medium bg-green p-2'>
                            Compre Já
                        </div>
                    </article>
                </div>
            </div>
        </Link>
    );
}

export default Kits;