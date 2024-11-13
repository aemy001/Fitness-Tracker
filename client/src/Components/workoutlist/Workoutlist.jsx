import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaCalendarAlt } from 'react-icons/fa'
function HotelList() {
    const [selectedDate, setDate] = useState(null)
    function CustomInput({ value, onClick }) {
        return (
            <div className="input-group">

                <input type='text' className='form-control' value={value} onClick={onClick} />
                <div className='input-group-append'>
                    <span className='input-group-text'>
                        <FaCalendarAlt />
                    </span>
                </div>
            </div>
        )
    }
    return (
        <div>
            <div className="container">

                <div className="card mb-4 ">
                    <div className=" justify-content-evenly d-flex ">
                        <div ><h4>Today Workouts</h4></div>
                        <div > <i class="fa-solid fa-filter"></i></div>
                    </div>

                    <div>
                        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle DATE" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown">SEPTEMBER, 2024</a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="">FEB</a></li>
                                    <li><a className="dropdown-item" href="">JUN</a></li>
                                    <li><a className="dropdown-item" href="">APRIL</a></li>
                                </ul>
                            </li>
                        </ul></div>


                    <div className="card-body">
                        <div className="row date justify-content-center text-center ">
                            <div className="col-md-12">
                                <p>Select Date</p>
                                <DatePicker selected={selectedDate} onChange={date => setDate(date)} customInput={<CustomInput />} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default HotelList