export const state = {
  notes: [],
  error: "",
  editingId: null,
};

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

  return true;
}

export function deleteNote(id) {
  state.notes = state.notes.filter((item) => item.id !== id);
}

export function startEdit(id) {
  state.editingId = id;
}

export function cancelEdit() {
  state.editingId = null;
}

export function saveEdit(id, { title, text }) {
  const note = state.notes.find((note) => note.id === id);

  note.title = title;
  note.text = text;
  note.updatedAt = Date.now();

  state.editingId = null;
}
