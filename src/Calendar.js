import './Calendar.css';
import {datesToDisplay, daysInMonth, MONTHS} from './dateutils';
import {useState, useEffect} from 'react';

//  Calendar component for displaying ranges of dates, old-school calendar style.
//  'onRangeSelected': callback function of two parameters, start date and end date (exclusive)
//    these dates represent the dates which the parent should display, representing either that the
//    month has changed or the user has click-and-dragged over a set of continuous days
export default function Calendar({date, setDate, onRangeSelected}) {

    const days = datesToDisplay(date);

    useEffect(() => {
        // not sure how to handle daylight savings...
        // Should do between 12:00AM on first of month until just before 12:00AM of start of next month.
        const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastOfMonth = new Date(date.getFullYear(), date.getMonth()+1, 1, 0, 0, -1);
        onRangeSelected(firstOfMonth, lastOfMonth);

        // can change this code later to account for different types of selecting ranges e.g. selecting multiple months or click-n-dragging over a range of dates
    }, [date]);
    
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
