import './css/NoteEditor.css';
import { Note } from './models/Note';

interface NoteEditorProps {
    note: Note;
    setNote: (n: Note) => void;
    onSubmit: (n:Note) => void;
    onCancel: () => void;
}
export default function NoteEditor({note, setNote, onSubmit, onCancel} : NoteEditorProps) {
    // should i just edit the note directly using setNote or use 'note' as a starter? i think the latter because what if we decide to cancel.
    // this should work for both new notes and editing old notes...
    
    return (
    <div className="note-editor">
        <input className="NE-title" id="noteTitle" type="text" value={note.title} onChange={e => setNote({...note, 'title': e.target.value})}></input>
        <textarea className="NE-content"id="noteContent" value={note.content} onChange={e => setNote({...note, 'content': e.target.value})}></textarea>
        <button onClick={() => onSubmit(note)}>Submit</button>
        <button onClick={() => onCancel()}>Cancel</button>
    </div>);
}