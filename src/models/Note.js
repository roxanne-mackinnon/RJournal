export function Note(id, title, content, creationDate) {
    return {'id': id, 'title': title, 'content': content, 'creationDate': creationDate};
}

export function EmptyNote() {
    return new Note(null, "", "", new Date());
}