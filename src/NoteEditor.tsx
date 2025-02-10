import './css/NoteEditor.css';
import { Note } from './models/Note';

interface NoteEditorProps {
    note: Note|null;
    setNote: React.Dispatch<React.SetStateAction<Note|null>>;
    onSubmit: (n:Note) => void;
    onCancel: () => void;
}
export default function NoteEditor({note, setNote, onSubmit, onCancel} : NoteEditorProps) {
    // should i just edit the note directly using setNote or use 'note' as a starter? i think the latter because what if we decide to cancel.
    // this should work for both new notes and editing old notes...
    if (note===null) return null;


    return (
    <div className="dialog-container" onClick={onCancel}>
        <div className="note-editor" onClick={e => e.stopPropagation()}>
            <input className="NE-title" id="noteTitle" type="text" value={note.title} onChange={e => setNote({...note, 'title': e.target.value})}></input>
            <textarea className="NE-content"id="noteContent" value={note.content} onChange={e => setNote({...note, 'content': e.target.value})}></textarea>
            <span>
                <button onClick={() => onSubmit(note)}>Submit</button>
                <button onClick={() => onCancel()}>Cancel</button>
            </span>
        </div>
    </div>);
}