// pages/index.js
import Head from 'next/head';
import Clock from './components/Clock';

export default function Home() {
    return (
        <div>
            <Head>
                <title>Analog Clock</title>
            </Head>
            <main>
                <h1 className='text-3xl font-bold m-4 text-center'>Analog Clock</h1>
                <div className='w-full my-10 justify-center items-center flex'> <Clock /></div>
               
            </main>
        </div>
    );
}
