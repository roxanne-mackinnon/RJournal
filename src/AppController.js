// need to have an AppController component that decides which views to put.

// for example, lets say i click on a note, i then want to display the note on the right and give the option to edit or delete it.
// it will control the state

import {useState, useEffect} from 'react';
import NoteListView from './NoteListView';
import Calendar from './Calendar';
import {notes} from './notedata';
import {LeftRightView} from './LeftRightView';
import NoteEditor from './NoteEditor';


// container for the note list, calendar, and note editor
export function AppController() {

    // Notes that the notelistview should display, to be filtered (either by date or some other means like text search)
    const [filteredNotes, setFilteredNotes] = useState([]);    
    // The note that has been clicked for editing/viewing, or null.
    const [activeNote, setActiveNote] = useState(null);
    const [date, setDate] = useState(new Date());

    const isEditing = (activeNote !== null);

    return (
        <LeftRightView>
            <NoteListView notes={filteredNotes} onNoteSelected={(note) => setActiveNote(note)}/>
            {isEditing ? <NoteEditor note={activeNote} setNote={setActiveNote} onSubmit={() => setActiveNote(null)} /> :
                <Calendar date={date} setDate={setDate} onRangeSelected={(startDate, endDate) => setFilteredNotes(
                                        notes.filter(note => note.creationDate >= startDate && note.creationDate <= endDate))}/>}
        </LeftRightView>
    );
}