import './App.css';
import {Note, notes} from './notedata'
import Calendar from './Calendar';
import NoteContainer from './NoteContainer';
import {useState} from 'react';

function App() {
  let [date, setDate] = useState(new Date());
  // start as null, <Calendar> (or whatever component that induces a method of filtering notes to display)
  // will set these on its first render
  let [rangeStart, setRangeStart] = useState(null);
  let [rangeEnd,setRangeEnd] = useState(null);

  let filteredNotes = null;
  if (rangeStart != null && rangeEnd != null) {
    filteredNotes = notes.filter(note => note.creationDate >= rangeStart && note.creationDate <= rangeEnd);
  }

  return (
    <div className="app-container">
      <NoteContainer notes={filteredNotes} />
      <Calendar onRangeSelected={(start, end) => {setRangeStart(start); setRangeEnd(end)}}/>
    </div>
  );
}

export default App;
