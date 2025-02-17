import './css/NoteContainer.css';
import {isSameDay} from './utils/dateutils';
import Loading from './assets/Loading';
import {Note} from './models/Note';
import { MouseEventHandler } from 'react';

function truncateText(text: string, nchars: number) : string {
    if (text.length <= nchars) {return text;}
    return `${text.substring(0,nchars-3)}...`;
}

interface DateGroup  {
    creationDate: Date;
    notes: Note[];
};

// Group the array of notes by dates (without modifying the original array)
// Return a result of the form [{creationDate: <date>, notes:[...]}, ...]
function groupNotesByDate(notes: Note[]) {
    if (notes.length === 0) return [];
    let sortedNotes = notes.toSorted((n1, n2) => n1.creationDate.getTime() - n2.creationDate.getTime());

    let lastDate = sortedNotes[0].creationDate;
    let result : DateGroup[] = [{'creationDate': lastDate, 'notes': []}];
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

interface NoteViewProps {note: Note; onClick: MouseEventHandler<HTMLElement>;};

function NoteView({note, onClick} : NoteViewProps) {
    return (
        <div className="note" onClick={onClick}>
            <h3>{note.title}</h3>
            <p>{truncateText(note.content, 100)}</p>
        </div>);
}

interface NoteDateViewProps {dateString: string; children: React.JSX.Element[];};
function NoteDateView({dateString, children} : NoteDateViewProps) {
    return (
    <div id={dateString}>
        <h2>{dateString}</h2>
        <div className="date-group">
            {children}
        </div>
    </div>);
}


interface NoteListViewProps {
    notes: Note[];
    onNoteSelected: (n: Note) => any;
    onCreateNote: () => any;
    loading: boolean;
}
// Given a list of notes, display them grouped by date, only showing the notes
// within the specified (inclusive) range
export default function NoteListView({notes, onNoteSelected, onCreateNote, loading} : NoteListViewProps) {
    // should sort notes by date and display each note in the 'day' section that it appears in 
    // lets just do a quick and dirty algorithm

    if (loading) {
        return (
        <div className="note-container">
            <Loading />
        </div>);
    }

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
            <button id="create-note-btn" onClick={onCreateNote}>Create Note</button>
        </div>
    );
}