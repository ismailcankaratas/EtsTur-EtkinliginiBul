import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './activity.css'
import useFetch from './../../hooks/useFetch';
import { BsWhatsapp, BsTwitter } from 'react-icons/bs';
import { dateToString } from './../../helpers/functions';
import ActivitiesSlider from '../../components/activitiesSlider/ActivitiesSlider';
import Popup from './../../components/popup/Popup';
import Select from 'react-select'

export default function Activity() {
    const params = useParams();
    const activities = useFetch("/data/db.json", "activities")
    const categories = useFetch("/data/db.json", "categories")
    const localtions = useFetch("/data/db.json", "localtions")
    const activity = activities.data.find(x => x.id == params.id);

    const [popup, setPopup] = useState(false);
    const [ticketPricesOptions, setTicketPricesOptions] = useState([]);
    const [selectTicket, setselectTicket] = useState({});

    function shareMessage(activity, categories) {
        var message = "";
        categories.data.forEach(category => {
            if (category.id == activity.categoryId)
                message = `${activity.name}'in ${category.name}'ı var. Link: ${window.document.URL}`;
        });
        return message;
    }
    function googleMap(localtions, activity) {
        let placeName = "";
        if (localtions.loading == false) {
            localtions.data.forEach(localtion => {
                if (localtion.id == activity.localtionsId) {
                    localtion.places.forEach(place => {
                        if (place.id == activity.placeId) {
                            placeName = place.name;
                        }
                    });
                }
            });
            return placeName;
        }
    }

    useEffect(() => {
        if (activity) {
            addOptions(activity.ticketPrices, setTicketPricesOptions);
        }
    }, [activity]);
    const addOptions = (optionsData, optionsSet) => {
        const newOptions = [];
        optionsData.map(option => (
            newOptions.push({ value: option, label: `${option.name} ${option.price} TL` })
        ))
        optionsSet(newOptions)
    }

    return (
        <>
            <Popup popup={popup} setPopup={setPopup}>
                <div className='buyTicketContainer'>
                    <h1>Bilet Seçimi</h1>
                    <Select options={ticketPricesOptions} placeholder="Lütfen blok seçiniz"
                        onChange={(e) => setselectTicket(e)}
                    />
                    <button disabled={selectTicket.value ? false : true}>
                        Ödeme yap
                        {selectTicket.value && ` (${selectTicket.value.price} TL)`}
                    </button>
                </div>
            </Popup>
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
                                            <Link to={"/search?localtionId=" + activity.localtionsId + "&categoryId=&startDate=&endDate="} className='location'>
                                                {
                                                    localtions.data.map(localtion => (
                                                        localtion.places.map(place => (
                                                            place.id == activity.placeId &&
                                                            <div key={place.id}>{place.name}</div>
                                                        ))
                                                    ))

                                                }
                                            </Link>
                                            : "Loading"
                                    }

                                    <a href={`https://www.google.com/maps/search/${googleMap(localtions, activity)}`} target="_blank">Google Map</a>
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
                                    <div className='share'>
                                        <a id='whatsapp' href={"https://wa.me/?text=" + shareMessage(activity, categories)} target="_blank">
                                            <BsWhatsapp className='icon' />
                                            <span className='shareText'>Paylaş</span>
                                        </a>
                                        <a id='twitter' href={"https://twitter.com/intent/tweet?hashtags=etkinliginiBul&text=" + shareMessage(activity, categories)} target="_blank">
                                            <BsTwitter className='icon' />
                                            <span className='shareText'>Paylaş</span>
                                        </a>
                                        {/* {"https://wa.me/?text=" + whatsappMessage} */}
                                    </div>
                                </div>
                            </div>
                            <button className='buyTicket' onClick={() => setPopup(!popup)}>Biletini Al</button>
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
            <div style={{ margin: "1rem" }}>
                {
                    activities.loading == false ?
                        <ActivitiesSlider activities={activities} title="Benzer Etkinlikler" filter={x => x.categoryId == activity.categoryId} />
                        : ""
                }
            </div>
        </>
    )
}
