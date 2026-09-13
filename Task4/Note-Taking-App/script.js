const noteForm = document.getElementById("noteForm");
const noteTitle = document.getElementById("noteTitle");
const noteContent = document.getElementById("noteContent");
const notesContainer = document.getElementById("notesContainer");
const noteCount = document.getElementById("noteCount");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

displayNotes();

noteForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = noteTitle.value.trim();
    const content = noteContent.value.trim();

    if (title === "" || content === "") {
        return;
    }

    const newNote = {
        id: Date.now(),
        title: title,
        content: content
    };

    notes.push(newNote);

    saveNotes();
    displayNotes();

    noteForm.reset();
});


function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}


function displayNotes() {
    notesContainer.innerHTML = "";

    updateNoteCount();

    if (notes.length === 0) {
        notesContainer.innerHTML = `
            <p class="empty-message">
                No notes yet. Create your first note!
            </p>
        `;
        return;
    }

    notes.forEach(function (note) {
        const noteCard = document.createElement("div");
        noteCard.className = "note-card";

        noteCard.innerHTML = `
            <h3>${escapeHTML(note.title)}</h3>
            <p>${escapeHTML(note.content)}</p>

            <div class="note-actions">
                <button class="edit-btn" onclick="editNote(${note.id})">
                    Edit
                </button>

                <button class="delete-btn" onclick="deleteNote(${note.id})">
                    Delete
                </button>
            </div>
        `;

        notesContainer.appendChild(noteCard);
    });
}


function editNote(id) {
    const note = notes.find(function (item) {
        return item.id === id;
    });

    if (!note) {
        return;
    }

    const updatedTitle = prompt("Edit note title:", note.title);

    if (updatedTitle === null) {
        return;
    }

    const updatedContent = prompt("Edit note content:", note.content);

    if (updatedContent === null) {
        return;
    }

    const title = updatedTitle.trim();
    const content = updatedContent.trim();

    if (title === "" || content === "") {
        alert("Title and content cannot be empty.");
        return;
    }

    note.title = title;
    note.content = content;

    saveNotes();
    displayNotes();
}


function deleteNote(id) {
    const confirmDelete = confirm("Are you sure you want to delete this note?");

    if (!confirmDelete) {
        return;
    }

    notes = notes.filter(function (note) {
        return note.id !== id;
    });

    saveNotes();
    displayNotes();
}


function updateNoteCount() {
    const count = notes.length;

    noteCount.textContent =
        count === 1 ? "1 Note" : `${count} Notes`;
}


function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}