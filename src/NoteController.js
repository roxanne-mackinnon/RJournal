import {notes} from './notedata';
import {isSameDay} from './dateutils';

// singleton class for fetching notes
export class NoteController {
    
    static notes = notes;
    static noteIdCounter = 0;

    static findById(id) {
        for (let note of this.notes) {
            if (note.id === id) {
                return note;
            }
        }
        return null;
    }

    static findBetweenDates(startDate, endDate) {
        let result = [];
        for (let note of this.notes) {
            if (note.creationDate >= startDate && note.creationDate <= endDate) {
                result.push(note);
            }
        }
        return result;
    }

    static findAll() {
        return this.notes;
    }

    static findByDate(date) {
        let result = [];
        for (let note of this.notes) {
            if (isSameDay(note.creationDate, date)) {
                result.push(note);
            }
        }
        return result;
    }

    static postNote(newNote) {
        newNote.id = this.noteIdCounter;
        this.noteIdCounter++;
        this.notes.push(newNote);
        return newNote;
    }

    static putNote(note) {
        for (let i = 0; i < this.notes.length; i++) {
            if (note.id === this.notes[i].id) {
                this.notes[i].title = note.title;
                this.notes[i].content = note.content;                
                return this.notes[i];
            }
        }
        throw new Error(`Note with id ${note.id} does not exist, must use PUT with existing note id.`);
    }

    static deleteById(noteId) {
        for (let i = 0; i < this.notes.length; i++) {
            if (this.notes[i].id === noteId) {
                // remove this index from array
                this.notes.splice(i, 1);
            }
        }
        throw new Error(`Note with id ${noteId} does not exist, cannot DELETE.`);
    }
}