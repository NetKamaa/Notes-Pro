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
