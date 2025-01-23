import {useState} from 'react';
import './css/NoteEditor.css';

export default function NoteEditor({note, onSubmit, onCancel}) {
    // should i just edit the note directly using setNote or use 'note' as a starter? i think the latter because what if we decide to cancel.
    // this should work for both new notes and editing old notes...


    // noteContent is named badly. it just refers to the state of the note as it is being edited, both the title and the content.
    let [noteContent, setNoteContent] = useState({...note});

    return (
    <div className="note-editor">
        <input className="NE-title" id="noteTitle" type="text" value={noteContent.title} onChange={(e) => setNoteContent({...noteContent, 'title': e.target.value})}></input>
        <textarea className="NE-content"id="noteContent" onChange={(e) => setNoteContent({...noteContent, 'content': e.target.value})}>{noteContent.content}</textarea>
        <button onClick={() => onSubmit(noteContent)}>Submit</button>
        <button onClick={() => onCancel()}>Cancel</button>
    </div>);
}