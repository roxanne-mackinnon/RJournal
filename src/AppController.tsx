// need to have an AppController component that decides which views to put.

// for example, lets say i click on a note, i then want to display the note on the right and give the option to edit or delete it.
// it will control the state

import {useState, useEffect, useCallback} from 'react';
import {DateFilteringContext, SearchFilteringContext} from './Contexts';
import NoteListView from './NoteListView';
import {NoteController} from './NoteController';
import LoginPage from './LoginPage';
import {Note, EmptyNote} from './models/Note';
import AppLayout from './AppLayout';
import NavBar from './NavBar';
import SideBar from './SideBar';
import Scroll from './assets/Scroll.svg';
import './css/AppController.css';

// use a NoteController method for filtering notes, which cancels a request
// if the query parameters (in the dependency array) are changed before the request returns
// 'callback' should be a callback of the form (signal) => NoteController.findByFilter(filterParams, {signal: signal})
// if any dependencies are null, no query is executed.
function useCancellableFilter(callback: (s: AbortSignal) => Promise<Note[]>, dependencies: any[],
                                setLoading: (a: boolean) => void, setNotes : (a: Note[]) => void, setError : (a: Error) => void) {
    useEffect(() => {
        if (dependencies.includes(null)) return;
        const controller = new AbortController();

        setLoading(true);
        
        // call method through currying
        callback(controller.signal)
            .then(notes => {
                setLoading(false);
                setNotes(notes);
            })
            .catch(err => {
                if (err.name === "AbortError") return;
                setError(err);
                console.error(err);
            });

        return () => controller.abort();
    }, dependencies);
}

// container for the note list, calendar, and note editor
export function AppController() {

    // Notes that the notelistview should display, to be filtered (either by date or some other means like text search)
    const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);    
    // The note that has been clicked for editing/viewing, or null.
    const [activeNote, setActiveNote] = useState<Note|null>(null);
    // If user is authenticated or not
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    // Current error. After being set to an error state, useEffect will automatically clear it
    // after a short timeout
    const [error, setError] = useState<Error|null>(null);

    /* States for filtering */
    // Current date that should be used as the basis for the calendar
    const [[rangeStart, rangeEnd], setDateRange] = useState<[Date|null, Date|null]>([null, null]);
    // Search term to filter notes by
    const [searchTerm, setSearchTerm] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);

    const isCreating = activeNote && activeNote.id !== null;

    useEffect(() => {
        if (error === null) return;

        setTimeout(() => setError(null), 5000);
    }, [error]);

    useCancellableFilter(signal => 
        NoteController.findByContentTitleContaining(searchTerm, {signal: signal})
    , [searchTerm], setLoading, setFilteredNotes, setError);

    useCancellableFilter(signal => 
        NoteController.findBetweenDates(rangeStart, rangeEnd, {signal: signal})
    , [rangeStart, rangeEnd], setLoading, setFilteredNotes, setError);

    const logo = <img src={Scroll} alt={"RJournal Scroll Icon"}/>;
    const navbar = <NavBar />;
    const sidebar = <SideBar />
    const main = <NoteListView notes={filteredNotes} onNoteSelected={note => setActiveNote(note)}
                               onCreateNote={() => setActiveNote(EmptyNote())} loading={loading}/>

    return (
    <SearchFilteringContext.Provider value={[searchTerm, setSearchTerm]}>
        <DateFilteringContext.Provider value={[rangeStart, rangeEnd, setDateRange]}>
            {authenticated ? <AppLayout logo={logo} navbar={navbar} sidebar={sidebar} main={main} />
                           : <LoginPage setAuthenticated={setAuthenticated} />}
            {error && <p id="error-toast">{error.name}: {error.message}</p>}
        </DateFilteringContext.Provider>
    </SearchFilteringContext.Provider>);

}