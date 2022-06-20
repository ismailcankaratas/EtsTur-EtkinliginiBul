import React, { useState } from 'react'
import './header.css'
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { MdDateRange } from 'react-icons/md';
import { GrLocation } from 'react-icons/gr';
import { BiCategory } from 'react-icons/bi';
import { AiOutlineSearch } from 'react-icons/ai';

import { format } from "date-fns";
import { DateRange } from "react-date-range";
import useFetch from '../../hooks/useFetch';

export default function Header() {
    const categories = useFetch("/data/db.json", "categories");
    const localtions = useFetch("/data/db.json", "localtions");

    const [openDate, setOpenDate] = useState(false);
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    return (
        <div className='headerContainer'>
            <div className='headerTitle'>
                <h2>
                    Konser. Tiyatro. Stand Up.
                    <br />
                    Bilet Satın Al
                </h2>
            </div>

            <div className="headerSearchContainer">
                <div className='headerSearch'>
                    <div className="headerSearchItem">
                        <BiCategory className='icon' />
                        <select>
                            <option>Kategori seçiniz</option>
                            {
                                categories.data.map(category => (
                                    <option value={category.id} key={category.id}>{category.name}</option>
                                ))
                            }
                        </select>
                        {/* <input
                        type="text"
                        placeholder="Where are you going?"
                        className="headerSearchInput"
                        onChange={(e) => setDestination(e.target.value)}
                    /> */}
                    </div>
                    <div className="headerSearchItem">
                        <MdDateRange className='icon' />
                        <span
                            onClick={() => setOpenDate(!openDate)}
                            className="headerSearchText"
                        >{`${format(date[0].startDate, "MM/dd/yyyy")} - ${format(
                            date[0].endDate,
                            "MM/dd/yyyy"
                        )}`}</span>
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
                        <GrLocation className='icon' />
                        <select>
                            <option>Konum</option>
                            {
                                localtions.data.map(localtion => (
                                    <option value={localtion.id} key={localtion.id}>
                                        {localtion.name}
                                    </option>
                                ))
                            }
                        </select>
                        {/* <input
                        type="text"
                        placeholder="Where are you going?"
                        className="headerSearchInput"
                        onChange={(e) => setDestination(e.target.value)}
                    /> */}
                    </div>

                    <div className="headerSearchItem" id='headerBtn'>
                        <button className="headerBtn">
                            Ara
                        </button>
                    </div>
                </div>

                <div className='headerSearchMobile'>
                    <AiOutlineSearch />
                    Ara
                </div>

            </div>
        </div>
    )
}
