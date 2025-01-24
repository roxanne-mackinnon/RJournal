import {notes} from './notedata';
import {isSameDay} from './dateutils';

// singleton class for fetching notes
export class NoteController {
    
    static notes = notes;
    static noteIdCounter = 0;

    static async findById(id) {
        for (let note of this.notes) {
            if (note.id === id) {
                return note;
            }
        }
        return null;
    }

    static async findBetweenDates(startDate, endDate) {
        let result = [];
        for (let note of this.notes) {
            if (note.creationDate >= startDate && note.creationDate <= endDate) {
                result.push(note);
            }
        }
        return result;
    }

    static async findAll() {
        return this.notes;
    }

    static async findByDate(date) {
        let result = [];
        for (let note of this.notes) {
            if (isSameDay(note.creationDate, date)) {
                result.push(note);
            }
        }
        return result;
    }

    static async postNote(newNote) {
        newNote.id = this.noteIdCounter;
        this.noteIdCounter++;
        this.notes.push(newNote);
        return newNote;
    }

    static async putNote(note) {
        for (let i = 0; i < this.notes.length; i++) {
            if (note.id === this.notes[i].id) {
                this.notes[i].title = note.title;
                this.notes[i].content = note.content;                
                return this.notes[i];
            }
        }
        throw new Error(`Note with id ${note.id} does not exist, must use PUT with existing note id.`);
    }

    static async deleteById(noteId) {
        for (let i = 0; i < this.notes.length; i++) {
            if (this.notes[i].id === noteId) {
                // remove this index from array
                this.notes.splice(i, 1);
            }
        }
        throw new Error(`Note with id ${noteId} does not exist, cannot DELETE.`);
    }
}