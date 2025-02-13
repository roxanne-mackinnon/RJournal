import './css/Calendar.css';
import {datesToDisplay, MONTHS} from './utils/dateutils';
import {useState, useEffect, useContext} from 'react';
import {DateFilteringContext, DateFilteringContextParams} from './Contexts';


//  Calendar component for displaying ranges of dates, old-school calendar style.
//  'onRangeSelected': callback function of two parameters, start date and end date (exclusive)
//    these dates represent the dates which the parent should display, representing either that the
//    month has changed or the user has click-and-dragged over a set of continuous days
export default function Calendar() {


    const dateFilterParams = useContext<DateFilteringContextParams|null>(DateFilteringContext);
    if (dateFilterParams===null) throw new Error("DateFilteringContextParams cannot be null.");

    const [startDate, endDate, setDateRange] = dateFilterParams;

    const [date, setDate] = useState<Date>(new Date());

    const days = datesToDisplay(date);

    useEffect(() => {
        // not sure how to handle daylight savings...
        // Should do between 12:00AM on first of month until just before 12:00AM of start of next month.
        const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastOfMonth = new Date(date.getFullYear(), date.getMonth()+1, 1, 0, 0, -1);
        setDateRange([firstOfMonth, lastOfMonth]);

        // can change this code later to account for different types of selecting ranges e.g. selecting multiple months or click-n-dragging over a range of dates
        // eslint-disable-next-line
    }, [date]);
    
    const decrementMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() - 1));
    }

    const incrementMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() + 1));
    }

    return (
        <div className={`calendar`} onClick={e => e.stopPropagation()}>
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
