import {createContext} from 'react';
import {Note} from './models/Note';

export type DateFilteringContextParams =
    [Date|null,
     Date|null,
     React.Dispatch<React.SetStateAction<[Date|null,Date|null]>>];

export type SearchFilteringContextParams =
    [string,
     React.Dispatch<React.SetStateAction<string>>];

export type NoteEditingContextParams = 
    [Note|null,
     React.Dispatch<React.SetStateAction<Note|null>>,
     (n: Note) => void];

export const DateFilteringContext = createContext<DateFilteringContextParams|null>(null);
export const SearchFilteringContext = createContext<SearchFilteringContextParams|null>(null);
export const NoteEditingContext = createContext<NoteEditingContextParams|null>(null);