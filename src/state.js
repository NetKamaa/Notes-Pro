export const state = {
  notes: [],
  error: "",
  editingId: null,
  sort: "updated-desc",
  filter: "all",
  query: "",
};

const STATE_NOTES_KEY = "state:notes";

export function loadNotes() {
  const state_notes = localStorage.getItem(STATE_NOTES_KEY);

  if (!state_notes) return;
  try {
    const data = JSON.parse(state_notes);
    if (Array.isArray(data)) {
      state.notes = data;
    }
  } catch {
    state.notes = [];
  }
}

function saveNotes() {
  localStorage.setItem("state:notes", JSON.stringify(state.notes));
}

export function addNote({ title, text }) {
  if (!title || !text) {
    state.error = "Title and text are required";
    return;
  }

  const note = {
    id: crypto.randomUUID(),
    title: title,
    text: text,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  state.error = "";
  state.notes.unshift(note);

  saveNotes();

  return true;
}

export function deleteNote(id) {
  const exists = state.notes.some((n) => n.id === id);
  if (!exists) return;

  state.notes = state.notes.filter((item) => item.id !== id);

  if (state.editingId === id) {
    state.editingId = null;
  }

  saveNotes();
}

export function startEdit(id) {
  state.editingId = id;
}

export function cancelEdit() {
  state.editingId = null;
}

export function saveEdit(id, { title, text }) {
  const note = state.notes.find((note) => note.id === id);
  if (!note) return;

  const oldTitle = note.title.trim();
  const oldText = note.text.trim();

  const newTitle = title.trim();
  const newText = text.trim();

  if (oldTitle !== newTitle || oldText !== newText) {
    note.title = newTitle;
    note.text = newText;
    note.updatedAt = Date.now();
  }

  state.editingId = null;

  saveNotes();
}

export function setSort(value) {
  if (state.editingId) {
    cancelEdit();
  }

  state.sort = value;
  state.error = "";
}

export function resetFilter() {
  if (state.editingId) {
    cancelEdit();
  }

  state.sort = "updated-desc";
  state.filter = "all";
  state.query = "";
  state.error = "";
}

export function setQuery(value) {
  if (state.editingId) {
    cancelEdit();
  }

  state.query = value.toLowerCase();
  state.error = "";
}
