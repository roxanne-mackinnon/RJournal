// need to have an AppController component that decides which views to put.

// for example, lets say i click on a note, i then want to display the note on the right and give the option to edit or delete it.
// it will control the state

import {useState, useEffect} from 'react';
import NoteListView from './NoteListView';
import Calendar from './Calendar';
import {LeftRightView} from './LeftRightView';
import NoteEditor from './NoteEditor';
import {NoteController} from './NoteController';



// container for the note list, calendar, and note editor
export function AppController() {

    // Notes that the notelistview should display, to be filtered (either by date or some other means like text search)
    const [filteredNotes, setFilteredNotes] = useState([]);    
    // The note that has been clicked for editing/viewing, or null.
    const [activeNote, setActiveNote] = useState(null);
    const [date, setDate] = useState(new Date());

    const isEditing = (activeNote !== null);

    const onCalendarRangeSelected = (start, end) => {
        setFilteredNotes(NoteController.findBetweenDates(start, end));
    }

    const onNoteEditSubmit = (note) => {
        // should wrap with a try/catch later once we have an error component
        NoteController.putNote(note);
        setActiveNote(null);
    }

    const leftView = <NoteListView notes={filteredNotes} onNoteSelected={(note) => setActiveNote(note)}/>;
    const rightView = isEditing
                        ? <NoteEditor note={activeNote} setNote={setActiveNote} onSubmit={onNoteEditSubmit} onCancel={() => setActiveNote(null)}/>
                        : <Calendar date={date} setDate={setDate} onRangeSelected={onCalendarRangeSelected} />;


    return (
        <LeftRightView left={leftView} right={rightView} />
    );
}