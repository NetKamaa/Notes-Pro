import { formatDate, getVisibleNotes } from "./utils.js";

export function render(elements, state) {
  elements.notesList.innerHTML = "";

  if (!elements.sort.innerHTML) {
    elements.sort.innerHTML = `
  <option value="updated-desc">Newest first</option>
  <option value="updated-asc">Oldest first</option>`;
  }

  elements.sort.value = state.sort;

  const visibleNotes = getVisibleNotes(state);

  if (state.notes.length === 0) {
    elements.notesList.innerHTML = '<p class="empty-state">No notes yet</p>';
    return;
  }

  if (visibleNotes.length === 0) {
    elements.notesList.innerHTML =
      '<p class="empty-state">No results found</p>';
    return;
  }

  if (state.error) {
    elements.error.textContent = state.error;
    elements.error.classList.add("visible");
  } else {
    elements.error.textContent = "";
    elements.error.classList.remove("visible");
  }

  visibleNotes.forEach((note) => {
    if (note.id === state.editingId) {
      const html = `
      <div class="note-card" data-id=${note.id}>
      <input class="edit-title" value="${note.title}" />

        <textarea class="edit-text">${note.text}</textarea>
        
        <div class="note-actions">
         <button class="btn-save">Save</button>
         <button class="btn-cancel">Cancel</button>
        </div>
      </div>
    `;

      elements.notesList.insertAdjacentHTML("beforeend", html);
    } else {
      const html = `
      <div class="note-card" data-id=${note.id}>
        <h2>${note.title}</h2>
        <p>${note.text}</p>
        <p class="created-at">Created at: ${formatDate(note.createdAt)}</p>${note.createdAt !== note.updatedAt ? `<p class="updated-at">Updated at: ${formatDate(note.updatedAt)}</p>` : ""}
        <div class="note-actions">
         <button class="btn-edit">Edit</button>
         <button class="btn-delete">Delete</button>
        </div>
      </div>
    `;

      elements.notesList.insertAdjacentHTML("beforeend", html);
    }
  });
}
