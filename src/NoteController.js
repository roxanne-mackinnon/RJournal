import {isSameDay} from './utils/dateutils';
import {Note} from './models/Note';

const notedata = [
    new Note(0, "Gift Ideas", "KitchenAid stand mixer, Needoh Nice Cube, The Essential DTWOF, 'Under the Lemon Tree' by Replica, and a copy of Stardew Valley",
        new Date(2024, 11, 10, 13, 43)),
    new Note(1, "Title", "Content",
        new Date(2024, 11, 10)),
    new Note(2, "11/15 diary", "I was so sleepy today... I stayed up all night watching that new show by the creators of Lost. Totally worth it!",
        new Date(2024, 11, 15, 20, 27)),
    new Note(3, "The Holidays", "Can't wait to hang out with my family this holiday! Ian better like that new Patagonia sweater, I spent almost 200 bucks on it...",
        new Date(2024, 11, 20, 12, 40)),
    new Note(4, "Christmas Day!", "Its finally here! Ian loved the sweater, my mom liked her oven mitts, and I think Amanda loved her stand mixer! I'm so glad",
        new Date(2024, 11, 25, 9, 30)),
    new Note(5, "October Doldrums", "Work was tough today, and the weather outside is so cold. I hope it stops being so windy soon.",
        new Date(2024, 9, 9, 16, 45)),
    new Note(6, "Happy Halloween!", "Dressed up as Luigi againt this year. I know its not super original but... those overalls were so expensive! Plus I hand-sew my own Luigi cap.",
        new Date(2024, 9, 31, 8, 13)),
    new Note(7, "Move-in day", "Moved apartments today. My roommate barely helped so unfortunatly a lot of stuff had to go in the garbage. It took around 15 hours from start to finish... whew!",
        new Date(2024, 5, 30, 12, 40)),
    new Note(8, "Apartment Hunting", "Amanda and I toured a new apartment today, compared to what we pay now it would be a huge step up! In-unit washer-dryer, filtered water from the fridge, and counter space to cook? Count me in!",
        new Date(2024, 5, 3, 15, 21)),
    new Note(9, "Welcome to my Journal!", "Developing a new journal application. Entries may or may not be correlated to the real life experiences of the app developer.",
        new Date(2024, 5, 1, 12)),
    new Note(10,"Happy new Year!!!", "Lots of new goals for this year. I want to get a job as a software engineer, build a top-of-the-line pc, and read 3 textbooks!",
        new Date(2025, 0, 1, 0, 15))
];
// singleton class for fetching notes
export class NoteController {
    

    static notes = notedata;
    static idCounter = 0;

    static async findById(id) {
        for (let note of this.notes) {
            if (note.id === id) {
                return note;
            }
        }
        throw new Error(`Note with ID ${id} does not exist.`);
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

    static async findByContentTitleContaining(substring) {
        return this.notes.filter(note => 
            note.title.includes(substring) || note.content.includes(substring)
        );
    }

    static async postNote(newNote) {
        // set ID and creation date for note
        newNote.id = this.idCounter;  
        newNote.creationDate = new Date();

        this.idCounter = this.idCounter + 1;
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