import {dateOfPrecedingSunday, dateOfLastSaturday, daysInLastMonth, datesToDisplay} from "./dateutils";

const dates = [new Date(2025, 0, 4), new Date(1985, 3, 15), new Date(2001, 5, 12)];

test('preceding sunday of 01/2025 is 29', () => {
    expect(dateOfPrecedingSunday(dates[0])).toBe(29);
});

test('preceding sunday of 4/1985 is 31', () => {
    expect(dateOfPrecedingSunday(dates[1])).toBe(31);
});

test('preceding sunday of 6/2001 is 27', () => {
    expect(dateOfPrecedingSunday(dates[2])).toBe(27);
});


test('last saturday of 01/2025 is 1', () => {
    expect(dateOfLastSaturday(dates[0])).toBe(1);
});

test('last saturday of 4/1985 is 4', () => {
    expect(dateOfLastSaturday(dates[1])).toBe(4);
});

test('last saturday of 6/2001 is 30', () => {
    expect(dateOfLastSaturday(dates[2])).toBe(30);
});


// jan 2025 should be 29,30,31,1,...,31,1
test('days in month of 01/2025', () => {
    let days = [29,30,31].concat(Array.from({length: 31}, (x,i) => i+1), [1]);
    expect(datesToDisplay(dates[0])).toEqual(days)
});

// jun 2025 should be 1,...,30,1,...,5
test('days in month of 06/2025', () => {
    let days = Array.from({length: 30}, (x,i) => i+1).concat([1,2,3,4,5]);
    expect(datesToDisplay(new Date(2025, 5))).toEqual(days)
});