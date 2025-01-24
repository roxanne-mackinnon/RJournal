// need to have an AppController component that decides which views to put.

// for example, lets say i click on a note, i then want to display the note on the right and give the option to edit or delete it.
// it will control the state

import {useState, useEffect} from 'react';
import NoteListView from './NoteListView';
import Calendar from './Calendar';
import {LeftRightView} from './LeftRightView';
import NoteEditor from './NoteEditor';
import {NoteController} from './NoteController';
import LoginPage from './LoginPage';
import './css/AppController.css';


// container for the note list, calendar, and note editor
export function AppController() {

    // Notes that the notelistview should display, to be filtered (either by date or some other means like text search)
    const [filteredNotes, setFilteredNotes] = useState([]);    

    // The note that has been clicked for editing/viewing, or null.
    const [activeNote, setActiveNote] = useState(null);
    // Current date that should be used as the basis for the calendar
    const [date, setDate] = useState(new Date());
    // If user is authenticated or not
    const [authenticated, setAuthenticated] = useState(false);
    // Current error. After being set to an error state, useEffect will automatically clear it
    // after a short timeout
    const [error, setError] = useState(null);

    const isEditing = (activeNote !== null);

    useEffect(() => {
        if (error === null) return;

        setTimeout(() => setError(null), 5000);
    }, [error]);


    const onCalendarRangeSelected = (start, end) => {
        const findBetweenDates = async () => {await NoteController.findBetweenDates(start, end)
                                                .then(notes => setFilteredNotes(notes))
                                                .catch(err => setError(error))}
        findBetweenDates();
    }

    const onNoteEditSubmit = (note) => {
        // should wrap with a try/catch later once we have an error component
        const putNewNote = async () => {await NoteController.putNote(note)
                                                .then(newNote => setFilteredNotes(filteredNotes.map(note => {
                                                    if (note.id === newNote.id) return newNote;
                                                    return note;
                                                })))
                                                .catch((err) => setError(err))};
        putNewNote();
        setActiveNote(null);
    }

    const leftView = <NoteListView notes={filteredNotes} onNoteSelected={(note) => setActiveNote(note)}/>;
    const rightView = isEditing
                        ? <NoteEditor note={activeNote} setNote={setActiveNote} onSubmit={onNoteEditSubmit} onCancel={() => setActiveNote(null)}/>
                        : <>
                            <Calendar date={date} setDate={setDate} onRangeSelected={onCalendarRangeSelected} />
                          </>


    return (
    <>
        {authenticated ? <LeftRightView left={leftView} right={rightView} />
                       : <LoginPage setAuthenticated={setAuthenticated} />}
        {error && <p id="error-toast">{error.name}: {error.message}</p>}
    </>
    );
}