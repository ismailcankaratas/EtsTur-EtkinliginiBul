import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import './activitiesSlider.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdDateRange } from 'react-icons/md';
import useFetch from '../../hooks/useFetch';
import { Link } from 'react-router-dom';
import { dateToString } from '../../helpers/functions';

export default function ActivitiesSlider({ activities, title, similarActivities }) {
    const categories = useFetch("/data/db.json", "categories")
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: activities.data.length < 4 ? 2 : 4,
        slidesToScroll: 2,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    useEffect(() => {
        if (similarActivities) {
            activities.data = activities.data.filter(x => x.categoryId == similarActivities)
        }
    }, [activities]);
    return (
        <div className='eventSlider'>
            <h2>{title}</h2>
            <Slider {...settings}>
                {
                    activities.data.map(event => (
                        <div className='event' key={event.id}>
                            {
                                categories.data.map(category => {
                                    if (category.id == event.categoryId) {
                                        return (
                                            <div key={category.id} className='eventCategory' style={{ backgroundColor: category.color }}>{category.name}</div>
                                        )
                                    }
                                })
                            }
                            <img src={event.images[0]} alt="" />
                            <div className='eventDetail'>
                                <div className='eventInfo'>
                                    <div className='eventName'>{(event.name.length > 30) ? event.name.substring(0, 28) + "..." : event.name}</div>
                                    <div className='eventDate'>
                                        <MdDateRange className='icon' />
                                        {dateToString(event.date)}
                                        &nbsp;
                                        {event.hours}
                                    </div>
                                </div>
                                <div className='eventAction'>
                                    <Link to={`/etkinlik/${event.id}`}>İncele</Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </Slider>
        </div>
    )
}
