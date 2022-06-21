import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import './search.css'
import useFetch from './../../hooks/useFetch';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import { MdDateRange } from 'react-icons/md';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { dateToString } from '../../components/populerActivity/PopulerActivity';
import { handleSearchUrl } from '../../components/header/Header';
import { useNavigate } from 'react-router-dom';

export default function Search() {
    const activities = useFetch("/data/db.json", "activities");
    const localtions = useFetch("/data/db.json", "localtions");
    const categories = useFetch("/data/db.json", "categories");
    const query = useLocation();
    const navigate = useNavigate();
    const localtionId = query.search.split("&")[0].split("=")[1];
    const categoryId = query.search.split("&")[1].split("=")[1];
    const startDate = query.search.split("&")[2].split("=")[1];
    const endDate = query.search.split("&")[3].split("=")[1];

    const [newActivities, setNewActivities] = useState([]);
    const [selectLocaltionId, setSelectLocaltionId] = useState(localtionId);
    const [selectCategoryId, setSelectCategoryId] = useState(categoryId);
    const [openDate, setOpenDate] = useState(false);
    const [date, setDate] = useState([
        {
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            key: "selection",
        },
    ]);

    useEffect(() => {
        const dataFilter = (data, setNewActivities, localtionId, categoryId, startDate, endDate) => {
            setNewActivities(data.filter(x => x.localtionsId == localtionId && x.categoryId == categoryId && x.date >= startDate && x.date <= endDate));
        }
        dataFilter(activities.data, setNewActivities, localtionId, categoryId, startDate, endDate)

    }, [query]);

    function handleFilter(selectLocaltionId, selectCategoryId, date) {
        navigate(handleSearchUrl(selectLocaltionId, selectCategoryId, date));
    }

    return (
        <div className='content'>
            <div className='activitySearchContainer'>
                <div className='activityFilters'>
                    <div className="filterResult">
                        Etkinlikleri Filtrele
                        <span className='resultTotal'>
                            {newActivities.length}
                        </span>
                    </div>
                    <div className='filterBody'>
                        <div className='filter'>
                            <div className='title'>
                                Konum
                            </div>
                            {
                                localtions.data.map(localtion => (
                                    <div className='filterItem' key={localtion.id}>
                                        <input type="checkbox" value={localtion.id} onChange={(e) => setSelectLocaltionId(e.target.value)} checked={selectLocaltionId == localtion.id ? true : false} name="localtion" id={localtion.id} />
                                        <label htmlFor={localtion.id}>{localtion.name}</label>
                                    </div>
                                ))
                            }
                        </div>

                        <div className='filter'>
                            <div className='title'>
                                Kategori
                            </div>
                            {
                                categories.data.map(category => (
                                    <div className='filterItem' key={category.id}>
                                        <input type="checkbox" value={category.id} onChange={(e) => setSelectCategoryId(e.target.value)} checked={selectCategoryId == category.id ? true : false} name="localtion" id={category.id} />
                                        <label htmlFor={category.id}>{category.name}</label>
                                    </div>
                                ))
                            }
                        </div>

                        <div className='filter'>
                            <div className='title'>
                                Tarih
                            </div>
                            <div className='filterItem'>
                                <MdDateRange className='icon' />
                                <span
                                    onClick={() => setOpenDate(!openDate)}
                                >
                                    {`${format(date[0].startDate, "MM/dd/yyyy")} - ${format(
                                        date[0].endDate,
                                        "MM/dd/yyyy"
                                    )}`}
                                </span>
                                {openDate && (
                                    <DateRange
                                        editableDateInputs={true}
                                        onChange={(item) => setDate([item.selection])}
                                        moveRangeOnFirstSelection={false}
                                        ranges={date}
                                        className="date"
                                        minDate={new Date()}
                                    />
                                )}
                            </div>
                        </div>
                        <div className='filterSubmit' onClick={() => handleFilter(selectLocaltionId, selectCategoryId, date)}>
                            Filtrele
                        </div>
                    </div>
                </div>
                {activities.loading == false ?
                    <div className='activitiesContainer'>
                        {newActivities.length > 0 ?
                            newActivities.map(activity => (
                                <Link to={`/etkinlik/${activity.id}`} className='activity' key={activity.id}>
                                    <div className='acitivtyImg'>
                                        <img src={activity.images[0]} alt="" />
                                    </div>
                                    <div className='activityInfo'>
                                        <span>
                                            {dateToString(activity.date)}
                                            &nbsp;
                                            {activity.hours}
                                        </span>
                                        <h3>{activity.name}</h3>
                                        {
                                            localtions.data.map(localtion => (
                                                (localtion.id == activity.localtionsId) &&
                                                <span key={localtion.id}>
                                                    <HiOutlineLocationMarker />
                                                    {localtion.name}
                                                </span>
                                            ))
                                        }
                                        {
                                            categories.data.map(category => (
                                                (category.id == activity.categoryId) &&
                                                <span className='category' key={category.id}>{category.name}</span>
                                            ))
                                        }
                                    </div>
                                </Link>
                            ))
                            : "Aranan kriterde etkinlik bulunamadı."
                        }
                    </div>
                    : "loading"
                }
            </div>
        </div >
    )
}
