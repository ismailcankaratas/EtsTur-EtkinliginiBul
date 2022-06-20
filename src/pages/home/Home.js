import React from 'react'
import './home.css'
import Navbar from './../../components/navbar/Navbar';
import Header from './../../components/header/Header';
import PopulerEvents from '../../components/populerEvents/PopulerEvents';
import Footer from '../../components/footer/Footer';

export default function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <div className='content'>
        <div className='categories'>
          <a href='/konser' className='category' id='konser'>
            KONSER
          </a>
          <a href='stand-up' className='category' id='standUp'>
            STAND UP
          </a>
          <a href='tiyatro' className='category' id='tiyatro'>
            TİYATRO
          </a>
        </div>
        <PopulerEvents />
      </div>
      <Footer />
    </div>
  )
}



