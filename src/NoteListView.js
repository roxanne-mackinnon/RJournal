import './css/NoteContainer.css';
import {isSameDay} from './utils/dateutils';
import {EmptyNote} from './models/Note';

function truncateText(text, nchars) {
    if (text.length <= nchars) {return text;}
    return `${text.substring(0,nchars-3)}...`;
}

// Group the array of notes by dates (without modifying the original array)
// Return a result of the form [{creationDate: <date>, notes:[...]}, ...]
function groupNotesByDate(notes) {
    if (notes.length === 0) return [];
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

function NoteView({note, ...props}) {
    return (
        <div className="note" {...props}>
            <h3>{note.title}</h3>
            <p>{truncateText(note.content, 100)}</p>
        </div>);
}


function NoteDateView({dateString, ...props}) {
    return (
    <div id={props.id}>
        <h2>{dateString}</h2>
        <div className="date-group">
            {props.children}
        </div>
    </div>);
}

// Given a list of notes, display them grouped by date, only showing the notes
// within the specified (inclusive) range
export default function NoteListView({notes, onNoteSelected, onCreateNote}) {
    // should sort notes by date and display each note in the 'day' section that it appears in 
    // lets just do a quick and dirty algorithm

    const groupedNotes = groupNotesByDate(notes);

    return (
        <div className="note-container">
            <div className="note-list-view">
                {groupedNotes?.map(group =>
                    <NoteDateView dateString={group.creationDate.toDateString()}>
                        {group.notes.map(note =>
                            <NoteView note={note} onClick={() => onNoteSelected(note)} />
                        )}
                    </NoteDateView>
                )}
            </div>
            <button id="create-note-btn" onClick={() => onCreateNote()}>Click Me!</button>
        </div>
    );
}