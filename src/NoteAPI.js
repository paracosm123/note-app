export default class NoteAPI {
    static getAllNotes() {
        const notes = JSON.parse(localStorage.getItem("notes") || "[]");
        return notes.sort((a, b) => {
            return new Date(a.id) > new Date(b.date) ? 1 : -1;
        })
    }

    static saveNote(noteToSave) {
        const notes = JSON.parse(localStorage.getItem("notes") || "[]");
        const noteEdit = notes.find(note => note.id === noteToSave.id);

        //Edit/Update Note
        if(noteEdit) {
            noteEdit.id = new Date().toISOString;
            noteEdit.title = noteToSave.title;
            noteEdit.body = noteToSave.body;
        }
        else {
            notes.push(noteToSave)
        }

        localStorage.setItem("notes", JSON.stringify(notes));
    }

    static deleteNote(id) {
        const notes = JSON.parse(localStorage.getItem("notes"));
        const newNotes = notes.filter(note => note.id !== id);

        localStorage.setItem("notes", JSON.stringify(newNotes));
    }
}