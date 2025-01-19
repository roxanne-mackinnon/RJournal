import {useState} from 'react';


export default function NoteEditor({note, onSubmit}) {
    // should i just edit the note directly using setNote or use 'note' as a starter? i think the latter because what if we decide to cancel.
    // this should work for both new notes and editing old notes...


    // noteContent is named badly. it just refers to the state of the note as it is being edited, both the title and the content.
    let [noteContent, setNoteContent] = useState({...note});

    return (
    <div>
        <label for="noteTitle">Title: </label>
        <input id="noteTitle" type="text" value={noteContent.title} onChange={(e) => setNoteContent({...noteContent, 'title': e.target.value})}></input>
        <br/>
        <label for="noteContent">Content: </label>
        <textarea id="noteContent" onChange={(e) => setNoteContent({...noteContent, 'content': e.target.value})}>{noteContent.content}</textarea>
        <button onClick={() => onSubmit(noteContent)}>Submit</button>
    </div>);
}