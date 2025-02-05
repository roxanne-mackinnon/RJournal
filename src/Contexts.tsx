import {createContext} from 'react';

export type DateFilteringContextParams =
    [Date|null,
     Date|null,
    ([start, end] : [Date|null,Date|null]) => void];

export type SearchFilteringContextParams =
    [string,
    (s: string) => void];

export const DateFilteringContext = createContext<DateFilteringContextParams|null>(null);
export const SearchFilteringContext = createContext<SearchFilteringContextParams|null>(null);