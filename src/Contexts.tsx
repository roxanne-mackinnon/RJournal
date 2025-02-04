import {createContext} from 'react';

export type DateFilteringContextParams =
    [Date,
    (date: Date) => void,
    (start: Date, end: Date) => void];

export type SearchFilteringContextParams =
    [string,
    (s: string) => void];

export const DateFilteringContext = createContext<DateFilteringContextParams|null>(null);
export const SearchFilteringContext = createContext<SearchFilteringContextParams|null>(null);