export function render(elements, state) {
  elements.notesList.innerHTML = "";

  elements.error.textContent = state.error;

  state.notes.forEach((note) => {
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
  });
}
