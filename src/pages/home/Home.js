import React from 'react'
import './home.css'
import Header from '../../components/header/Header';
import ActivitiesSlider from '../../components/activitiesSlider/ActivitiesSlider';
import useFetch from '../../hooks/useFetch';
import { Link } from 'react-router-dom';

export default function Home() {
  const activities = useFetch("/data/db.json", "activities")

  return (
    <>
      <Header />
      <div className='content'>
        <div className='categories'>
          <Link to={process.env.PUBLIC_URL + '/search?localtionId=&categoryId=DRxvz293sl&startDate=&endDate='} className='category' id='konser'>
            KONSER
          </Link>
          <Link to={process.env.PUBLIC_URL + '/search?localtionId=&categoryId=Ulu2KgoWfw&startDate=&endDate='} className='category' id='standUp'>
            STAND UP
          </Link>
          <Link to={process.env.PUBLIC_URL + '/search?localtionId=&categoryId=b5Pdw5_W2r&startDate=&endDate='} className='category' id='tiyatro'>
            TİYATRO
          </Link>
        </div>
        <ActivitiesSlider activities={activities} title="En Popüler Etkinlikler" />
      </div>
    </>
  )
}



