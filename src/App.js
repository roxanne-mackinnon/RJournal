import './App.css';
import {Note, notes} from './notedata'
import Calendar from './Calendar';
import NoteContainer from './NoteContainer';
import {useState} from 'react';

function App() {
  let [date, setDate] = useState(new Date());
  return (
    <div className="app-container">
      <NoteContainer notes={notes} />
      <Calendar onMonthChanged={(newDate) => console.log(newDate)}/>
    </div>
  );
}

export default App;
