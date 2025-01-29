import './css/Calendar.css';
import {datesToDisplay, MONTHS} from './utils/dateutils';
import {useEffect, useContext} from 'react';
import {DateFilteringContext} from './Contexts';

//  Calendar component for displaying ranges of dates, old-school calendar style.
//  'onRangeSelected': callback function of two parameters, start date and end date (exclusive)
//    these dates represent the dates which the parent should display, representing either that the
//    month has changed or the user has click-and-dragged over a set of continuous days
export default function Calendar() {

    const [date, setDate, onRangeSelected] = useContext(DateFilteringContext);

    const days = datesToDisplay(date);

    useEffect(() => {
        // not sure how to handle daylight savings...
        // Should do between 12:00AM on first of month until just before 12:00AM of start of next month.
        const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastOfMonth = new Date(date.getFullYear(), date.getMonth()+1, 1, 0, 0, -1);
        onRangeSelected(firstOfMonth, lastOfMonth);

        // can change this code later to account for different types of selecting ranges e.g. selecting multiple months or click-n-dragging over a range of dates
        // eslint-disable-next-line
    }, [date]);
    
    const decrementMonth = e => {
        e.stopPropagation();
        setDate(new Date(date.getFullYear(), date.getMonth() - 1));
    }

    const incrementMonth = e => {
        e.stopPropagation();
        setDate(new Date(date.getFullYear(), date.getMonth() + 1));
    }

    return (
        <div className="calendar">
            <p>{date.getFullYear()}</p>
            <div className="month-selector">
                <span onClick={decrementMonth}>Left</span>
                <span>{MONTHS[date.getMonth()]}</span>
                <span onClick={incrementMonth}>Right</span>
            </div>
            <div className="month-days">
                {["S","M","T","W","Th","F","S"].map(day =>
                <p>{day}</p>)}
                {days.map(day => <p>{day}</p>)}
            </div>
        </div>
    );
}
