
export default function NoteEditor({note, setNote, onSubmit}) {
    return (<div>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
        <button onClick={onSubmit}>Cancel</button>
    </div>);
}