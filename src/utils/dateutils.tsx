export const MONTHS=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export function isSameDay(d1: Date, d2: Date) {
    return (d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate())
}

export function dateOfPrecedingSunday(date: Date) {
    let copyDate = new Date(date);
    copyDate.setDate(1);
    copyDate.setDate(1 - copyDate.getDay());
    return copyDate.getDate();
}

export function dateOfLastSaturday(date: Date) {
    let copyDate = new Date(date);
    copyDate.setMonth(copyDate.getMonth() + 1);
    copyDate.setDate(0);
    copyDate.setDate(copyDate.getDate() + 6 - copyDate.getDay());
    return copyDate.getDate();
}

export function daysInMonth(date: Date) {
    let copyDate = new Date(date.getFullYear(), date.getMonth() + 1);
    copyDate.setDate(0);
    return copyDate.getDate();
}

export function daysInLastMonth(date: Date) {
    let copyDate = new Date(date);
    copyDate.setDate(0);
    return copyDate.getDate();    
}

// date is between start and end, inclusive
// ASSUMES start < end
export function dateIsBetween(date: Date, start: Date, end: Date) {
    return date >= start && date <= end;
}

export function datesToDisplay(date: Date) {
    let result = [];
    let precedingSunday = dateOfPrecedingSunday(date);
    let lastSaturday = dateOfLastSaturday(date);
    let lastMonthDays = daysInMonth(new Date(date.getFullYear(), date.getMonth() - 1));
    let currMonthDays = daysInMonth(date);

    // if the preceding sunday is the first of the month, we should skip adding days from last month
    if (precedingSunday !== 1) {
        for (let i = precedingSunday; i <= lastMonthDays; i++) {
            result.push(i);
        }
    }

    // add days from this month
    for (let i = 1; i <= currMonthDays; i++) {
        result.push(i);
    }

    // add days until last satuday, if last saturday falls in next month
    if (lastSaturday !== currMonthDays) {
        for (let i = 1; i <= lastSaturday; i++) {
            result.push(i);
        }
    }
    return result;
}