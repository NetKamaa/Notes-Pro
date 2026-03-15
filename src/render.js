export function render(elements, state) {
  elements.notesList.innerHTML = "";

  elements.error.textContent = state.error;

  state.notes.forEach((note) => {
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
