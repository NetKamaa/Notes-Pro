export const state = {
  notes: [],
  error: "",
  editingId: null,
  sort: "updated-desc",
  filter: "all",
  query: "",
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
