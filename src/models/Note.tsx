export interface Note {
    id: number|null;
    title: string;
    content: string;
    creationDate: Date;
}

export class Note {
    constructor(id: number|null, title: string, content: string, creationDate: Date) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.creationDate = creationDate;
    }
}

export function EmptyNote() {
    return new Note(null, "", "", new Date());
}