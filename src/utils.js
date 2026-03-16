export function getVisibleNotes(state) {
  let notes = [...state.notes];

  if (state.query) {
    notes = notes.filter((note) =>
      note.title.toLowerCase().includes(state.query),
    );
  }

  if (state.sort === "updated-asc") {
    notes.sort((a, b) => a.updatedAt - b.updatedAt);
  }
  if (state.sort === "updated-desc") {
    notes.sort((a, b) => b.updatedAt - a.updatedAt);
  }

  return notes;
}
