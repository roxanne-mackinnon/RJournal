import './NoteContainer.css';
import {isSameDay} from './dateutils';
import {useContext} from 'react';
import {NoteContext} from './NoteController';

// Group the array of notes by dates (without modifying the original array)
// Return a result of the form [{creationDate: <date>, notes:[...]}, ...]
function groupNotesByDate(notes) {
    if (notes === null) return null;
    if (notes.length == 0) return [];
    let sortedNotes = notes.toSorted();

    let lastDate = sortedNotes[0].creationDate;
    let result = [{'creationDate': lastDate, 'notes': []}];
    let currentIndex = 0;

    for (let note of sortedNotes) {
        // while we're still on the same day, keep adding notes to the same group
        if (isSameDay(note.creationDate, lastDate)) {
            result[currentIndex].notes.push(note);
        }
        // otherwise, if its not still the same day, append the last group to the list and make a new one
        // containing the current note
        else {
            lastDate = note.creationDate;
            currentIndex++;
            result.push({'creationDate': lastDate, 'notes': [note]});
        }
    }

    return result;
}

// Given a list of notes, display them grouped by date, only showing the notes
// within the specified (inclusive) range
export default function NoteListView({notes, onNoteSelected}) {
    // should sort notes by date and display each note in the 'day' section that it appears in 
    // lets just do a quick and dirty algorithm


    const truncateText = (text, nChars) => {
        if (text.length <= nChars) {return text;}
        return `${text.substring(0,nChars-3)}...`;
    };

    const groupedNotes = groupNotesByDate(notes);

    return (
        <div className="note-container">
            {groupedNotes?.map(group => 
            <>
                <h2>{group.creationDate.toDateString()}</h2>
                <div className="date-group">
                    {group.notes.map(note => 
                        <div className="note" onClick={() => onNoteSelected(note)}>
                            <h3>{note.title}</h3>
                            <p>{truncateText(note.content, 100)}</p>
                        </div>
                    )}
                </div>
            </>
            )}
        </div>
    );
}