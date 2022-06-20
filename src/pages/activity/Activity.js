import React from 'react'
import { Link, useParams } from 'react-router-dom'
import './activity.css'
import useFetch from './../../hooks/useFetch';
export default function Activity() {
    const params = useParams();
    const activities = useFetch("/data/db.json", "activities")
    const categories = useFetch("/data/db.json", "categories")
    const localtions = useFetch("/data/db.json", "localtions")
    const activity = activities.data.find(x => x.id == params.id);

    function dateToString(date) {
        var tarih = new Date(date);
        var gunler = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
        var aylar = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
        return `${tarih.getDate()} ${aylar[tarih.getMonth()]} ${gunler[tarih.getDay()]}`
    }
    return (
        <>
            {(activities.loading == false) ?
                <div className='eventHeader'>
                    <div className='content'>
                        <div className='eventWrapper'>
                            <div className='eventSummary'>
                                <div className='poster'>
                                    <img src={activity.images[0]} alt="" />
                                </div>
                                <div className='eventDetails'>
                                    <h1>{activity.name}</h1>
                                    {
                                        (localtions.loading == false) ?
                                            localtions.data.map(localtion => (
                                                localtion.id == activity.localtionsId &&
                                                <Link to={"/sehir/" + localtion.name} className='location'>
                                                    {
                                                        localtion.places.map(place => (
                                                            place.id == activity.placeId &&
                                                            <div>{place.name}</div>
                                                        ))
                                                    }
                                                </Link>

                                            ))
                                            : "Loading"
                                    }

                                    <a href="/google" target="_blank">Google Map</a>
                                    <span className='activityDate'>
                                        {dateToString(activity.date)} {activity.hours}
                                    </span>
                                    <div className='eventCategory'>
                                        {
                                            (categories.loading == false) ?
                                                categories.data.map(category => (
                                                    category.id == activity.categoryId &&
                                                    <span key={category.id}>
                                                        {category.name}
                                                    </span>
                                                ))
                                                : "Loading"
                                        }
                                    </div>
                                </div>
                            </div>
                            <button className='buyTicket'>Biletini Al</button>
                        </div>
                    </div>
                </div>
                : "loading"
            }
            <div className='descriptionContainer'>
                <div className='activityTabs'>
                    <div className='tab'>
                        Açıklama
                        <div className='fakeBorderBottom'></div>
                    </div>
                </div>
                <div className='activityDescription'>
                    {
                        (activities.loading == false) ?
                            <>
                                <h2>{activity.name}</h2>
                                <p>
                                    {activity.description}
                                </p>
                            </>
                            : "loading"
                    }
                </div>
            </div>
        </>
    )
}
