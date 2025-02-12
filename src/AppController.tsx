// need to have an AppController component that decides which views to put.

// for example, lets say i click on a note, i then want to display the note on the right and give the option to edit or delete it.
// it will control the state

import {useState, useEffect} from 'react';
import {useNoteRequest} from './hooks/Hooks';
import {DateFilteringContext, NoteEditingContext, SearchFilteringContext} from './Contexts';
import NoteContainer from './NoteContainer';
import LoginPage from './LoginPage';
import NoteEditor from './NoteEditor';
import {Note, EmptyNote} from './models/Note';
import AppLayout from './AppLayout';
import NavBar from './NavBar';
import {SideBar, SideBarItem} from './SideBar';
import Scroll from './assets/Scroll.svg';
import './css/AppController.css';

// use a NoteController method for filtering notes, which cancels a request
// if the query parameters (in the dependency array) are changed before the request returns
// 'callback' should be a callback of the form (signal) => NoteController.findByFilter(filterParams, {signal: signal})
// if any dependencies are null, no query is executed.
function useCancellableRequest(callback: (s: AbortSignal) => Promise<Note[]>, dependencies: any[],
                                setLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                setNotes : React.Dispatch<React.SetStateAction<Note[]>>,
                                setError : React.Dispatch<React.SetStateAction<Error|null>>) {
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

    const noteController = useNoteRequest();

    const isEditing = activeNote!==null ? true : false;

    useEffect(() => {
        if (error === null) return;
        console.log(error);
        setTimeout(() => setError(null), 5000);
    }, [error]);

    useCancellableRequest(signal => 
        noteController.findByContentTitleContaining(searchTerm, {signal: signal})
    , [searchTerm], setLoading, setFilteredNotes, setError);

    useCancellableRequest(signal => 
        noteController.findBetweenDates(rangeStart, rangeEnd, {signal: signal})
    , [rangeStart, rangeEnd], setLoading, setFilteredNotes, setError);

    const onNoteEditSubmit = (note : Note) : void => {
        setLoading(true);

        let method : (param: Note) => Promise<Note>;
        // if note ID does not exist, we need to POST, otherwise PUT
        if (note.id === null) {
            // "THIS" IS THE SOURCE OF THE PROBLEM. 'THIS' REFERS TO SOMETHING OTHER THAN THE INSTANCE OF NOTECONTROLLER
            method = (note) => noteController.postNote(note);
        }
        else {
            method = (note) => noteController.putNote(note);
        }

        method(note)
            .then(note => {
                // need to refresh list of notes, not sure how to do this yet
                // or, possibly we should just return to the current search filter.
                // either way, we should establish a 'baseline' or 'default' note display and
                // how to return to that
                setActiveNote(null);
            })
            .catch(err => {
                setError(err);
            })
            .finally(() => setLoading(false));
    }

    const logo = <img src={Scroll} alt={"RJournal Scroll Icon"}/>;
    const navbar = <NavBar />;
    const sidebar = <SideBar />
    const main = <NoteContainer notes={filteredNotes} onNoteSelected={note => setActiveNote(note)}
                               onCreateNote={() => setActiveNote(EmptyNote())} loading={loading}/>

    return (
    <SearchFilteringContext.Provider value={[searchTerm, setSearchTerm]}>
        <DateFilteringContext.Provider value={[rangeStart, rangeEnd, setDateRange]}>
            <NoteEditingContext.Provider value={[activeNote, setActiveNote, onNoteEditSubmit]}>
                {authenticated
                    ? <AppLayout logo={logo} navbar={navbar} sidebar={sidebar} main={main} />
                    : <LoginPage setAuthenticated={setAuthenticated} />}
                {error && <p id="error-toast">{error.name}: {error.message}</p>}
                {isEditing && <NoteEditor note={activeNote} setNote={setActiveNote} onSubmit={onNoteEditSubmit} onCancel={() => setActiveNote(null)} />}
            </NoteEditingContext.Provider>  
        </DateFilteringContext.Provider>
    </SearchFilteringContext.Provider>);

}