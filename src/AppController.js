// need to have an AppController component that decides which views to put.

// for example, lets say i click on a note, i then want to display the note on the right and give the option to edit or delete it.
// it will control the state

import {useState, useEffect, useCallback} from 'react';
import {DateFilteringContext, SearchFilteringContext} from './Contexts';
import NoteListView from './NoteListView';
import {NoteController} from './NoteController';
import LoginPage from './LoginPage';
import {EmptyNote} from './models/Note';
import AppLayout from './AppLayout';
import Scroll from './assets/Scroll.svg';
import NavBar from './NavBar';
import SideBar from './SideBar';
import './css/AppController.css';

// container for the note list, calendar, and note editor
export function AppController() {

    // Notes that the notelistview should display, to be filtered (either by date or some other means like text search)
    const [filteredNotes, setFilteredNotes] = useState([]);    
    // The note that has been clicked for editing/viewing, or null.
    const [activeNote, setActiveNote] = useState(null);
    // If user is authenticated or not
    const [authenticated, setAuthenticated] = useState(false);
    // Current error. After being set to an error state, useEffect will automatically clear it
    // after a short timeout
    const [error, setError] = useState(null);

    /* States for filtering */
    // Current date that should be used as the basis for the calendar
    const [date, setDate] = useState(new Date());
    // Search term to filter notes by
    const [searchTerm, setSearchTerm] = useState("");

    const [isCreating, setIsCreating] = useState(false);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (error === null) return;

        setTimeout(() => setError(null), 5000);
    }, [error]);

    useEffect(() => {
        // If searchTerm changes, we want to 'cancel' the current request and just execute the next request instead.
        const controller = new AbortController();
        // Put a loading spinner while we're fetching
        setLoading(true);
        // Fetch the notes, display any error, and abort request if signalled to   
        NoteController.findByContentTitleContaining(searchTerm, {'signal': controller.signal})
            .then(notes => {
                setFilteredNotes(notes);
                setLoading(false);
                // clear any date filter
                setDate(new Date());
            })
            .catch (err => {
                // don't show an error if the request was aborted
                if (err.name === "AbortError") return;
                setError(err);
                console.error(err);
        });

        return () => controller.abort();
    }, [searchTerm]);


    const onCalendarRangeSelected = useCallback((start, end) => {
        const findBetweenDates = async () => {await NoteController.findBetweenDates(start, end)
                                                .then(notes => setFilteredNotes(notes))}
        setLoading(true);
        findBetweenDates().then(() => setLoading(false));
    }, []);

    const onNoteEditSubmit = (note) => {
        // if creating a new note, we should 'post', otherwise, put.
        let newNote;
        if (isCreating) {
            newNote = NoteController.postNote(note);
        }
        else {
            newNote = NoteController.putNote(note);
        }

        const alterOrCreateNote = async () => {await newNote
                                                .then(n => setFilteredNotes([...filteredNotes, n]))
                                                .catch(err => setError(err))};
        alterOrCreateNote().then(resp => console.log(resp));
        setActiveNote(null);
        setIsCreating(false);
    }

    const onCreateNote = () => {
        // need to save some state to remember that we are 'creating' instead of 'editing'
        setIsCreating(true);
        setActiveNote(new EmptyNote());
    }

    const logo = <img src={Scroll} alt="RJournal Logo"/>
    const navbar = <NavBar />;
    const sidebar = <SideBar />
    const main = <NoteListView notes={filteredNotes} onNoteSelected={note => {setActiveNote(note); setIsCreating(false)}}
                               onCreateNote={onCreateNote} loading={loading}/>

    return (
    <SearchFilteringContext.Provider value={[searchTerm, setSearchTerm]}>
        <DateFilteringContext.Provider value={[date, setDate, onCalendarRangeSelected]}>
            {authenticated ? <AppLayout logo={logo} navbar={navbar} sidebar={sidebar} main={main} />
                           : <LoginPage setAuthenticated={setAuthenticated} />}
            {error && <p id="error-toast">{error.name}: {error.message}</p>}
        </DateFilteringContext.Provider>
    </SearchFilteringContext.Provider>);

}