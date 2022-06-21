import React, { useEffect, useState } from 'react'
import './header.css'
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { MdDateRange } from 'react-icons/md';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { BiCategory } from 'react-icons/bi';
import { AiOutlineSearch } from 'react-icons/ai';

import { format } from "date-fns";
import { DateRange } from "react-date-range";
import useFetch from '../../hooks/useFetch';
import Select from 'react-select'
import { useNavigate } from "react-router-dom";
import { errorNotification } from '../../App';
import { handleSearchUrl } from '../../helpers/functions';
import Popup from './../popup/Popup';


export default function Header() {
    const navigate = useNavigate();
    const categories = useFetch("/data/db.json", "categories");
    const localtions = useFetch("/data/db.json", "localtions");

    const [categoriesOptions, setCategoriesOptions] = useState([]);
    const [localtionsOptions, setLocaltionsOptions] = useState([]);

    const [localtionSelect, setLocaltionSelect] = useState('');
    const [categorySelect, setCategorySelect] = useState('');
    const [openDate, setOpenDate] = useState(false);
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    const [popup, setPopup] = useState(false);

    useEffect(() => {
        addOptions(categoriesOptions, categories.data, setCategoriesOptions);
        addOptions(localtionsOptions, localtions.data, setLocaltionsOptions);
    }, [localtions.data]);

    const addOptions = (options, optionsData, optionsSet) => {
        const newOptions = [...options]
        optionsData.map(option => (
            newOptions.push({ value: option.id, label: option.name })
        ))
        optionsSet(newOptions)
    }
    const handleSelectChange = (selectValue, setSelect) => {
        setSelect(selectValue);
    }
    const handleActivitySearch = (localtionSelect, categorySelect, date) => {
        if (!categorySelect) return errorNotification("Kategori seçiniz.")
        if (!localtionSelect) return errorNotification("Konum seçiniz.")
        const localtionId = localtionSelect.value;
        const categoryId = categorySelect.value;

        navigate(handleSearchUrl(localtionId, categoryId, date))
    }

    return (
        <div className='headerContainer'>
            <div className='headerTitle'>
                <h2>
                    Konser. Tiyatro. Stand Up.
                    <br />
                    Bilet Satın Al
                </h2>
                <div className='headerImg'>
                    <img src="/header.png" alt="" />
                </div>
            </div>
            <Popup popup={popup} setPopup={setPopup}>
                <div className='headerSearch'>
                    <div className="headerSearchItem">
                        <BiCategory className='icon' />
                        <Select options={categoriesOptions} placeholder="Kategori seçiniz"
                            onChange={(select) => handleSelectChange(select, setCategorySelect)} />
                    </div>
                    <div className="headerSearchItem">
                        <MdDateRange className='icon' />
                        <span
                            onClick={() => setOpenDate(!openDate)}
                            className="headerSearchText"
                        >
                            {`Tarih: ${format(date[0].startDate, "MM/dd/yyyy")} - ${format(
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
                    <div className="headerSearchItem">
                        <HiOutlineLocationMarker className='icon' />
                        <Select options={localtionsOptions} placeholder="Konum seçiniz"
                            onChange={(select) => handleSelectChange(select, setLocaltionSelect)}
                        />
                    </div>

                    <div className="headerSearchItem" id='headerBtn' onClick={() => handleActivitySearch(localtionSelect, categorySelect, date)}>
                        <button className="headerBtn">
                            Ara
                        </button>
                    </div>
                </div>
            </Popup>

            <div className="headerSearchContainer">
                <div className='headerSearch mobile'>
                    <div className="headerSearchItem">
                        <BiCategory className='icon' />
                        <Select options={categoriesOptions} placeholder="Kategori seçiniz"
                            onChange={(select) => handleSelectChange(select, setCategorySelect)} />
                    </div>
                    <div className="headerSearchItem">
                        <MdDateRange className='icon' />
                        <span
                            onClick={() => setOpenDate(!openDate)}
                            className="headerSearchText"
                        >
                            {`Tarih: ${format(date[0].startDate, "MM/dd/yyyy")} - ${format(
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
                    <div className="headerSearchItem">
                        <HiOutlineLocationMarker className='icon' />
                        <Select options={localtionsOptions} placeholder="Konum seçiniz"
                            onChange={(select) => handleSelectChange(select, setLocaltionSelect)}
                        />
                    </div>

                    <div className="headerSearchItem" id='headerBtn' onClick={() => handleActivitySearch(localtionSelect, categorySelect, date)}>
                        <button className="headerBtn">
                            Ara
                        </button>
                    </div>
                </div>

                <div className='headerSearchMobile' onClick={() => setPopup(!popup)}>
                    <AiOutlineSearch />
                    Ara
                </div>

            </div>
        </div>
    )
}
