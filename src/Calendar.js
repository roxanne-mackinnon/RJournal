import './Calendar.css';
import {datesToDisplay, MONTHS} from './dateutils';
import {useState} from 'react';

export default function Calendar() {
    const [date,setDate] = useState(new Date());
    const days = datesToDisplay(date);
    console.log(days);
    return (
        <div className="calendar">
            <p>{date.getFullYear()}</p>
            <div className="month-selector">
                <span onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1))}>Left</span>
                <span>{MONTHS[date.getMonth()]}</span>
                <span onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1))}>Right</span>
            </div>
            <div className="month-days">
                {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(day =>
                <p>{day}</p>)}
                {days.map(day => <p>{day}</p>)}
            </div>
        </div>
    );
}
