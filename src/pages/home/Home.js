import React from 'react'
import './home.css'
import PopulerActivity from '../../components/populerActivity/PopulerActivity';
import Header from '../../components/header/Header';

export default function Home() {
  return (
    <>
      <Header />
      <div className='content'>
        <div className='categories'>
          <a href='/konser' className='category' id='konser'>
            KONSER
          </a>
          <a href='/stand-up' className='category' id='standUp'>
            STAND UP
          </a>
          <a href='/tiyatro' className='category' id='tiyatro'>
            TİYATRO
          </a>
        </div>
        <PopulerActivity />
      </div>
    </>
  )
}



