import { elements } from "./elements.js";
import { render } from "./render.js";
import {
  addNote,
  cancelEdit,
  deleteNote,
  saveEdit,
  startEdit,
  state,
} from "./state.js";

export function handleAddNote(e) {
  e.preventDefault();

  const title = elements.titleInput.value;
  const text = elements.textInput.value;

  const note = addNote({ title: title, text: text });

  if (note) {
    render(elements, state);
    elements.form.reset();
  }
}

export function handleNoteActions(e) {
  const card = e.target.closest(".note-card");

  if (!card) return;

  const id = card.dataset.id;
  if (e.target.classList.contains("btn-delete")) {
    deleteNote(id);
    render(elements, state);
  }

  if (e.target.classList.contains("btn-edit")) {
    startEdit(id);
    render(elements, state);
  }

  if (e.target.classList.contains("btn-cancel")) {
    cancelEdit();
    render(elements, state);
  }

  if (e.target.classList.contains("btn-save")) {
    const title = card.querySelector(".edit-title").value;
    const text = card.querySelector(".edit-text").value;

    if (!title || !text) return;

    const id = card.dataset.id;

    saveEdit(id, { title, text });

    render(elements, state);
  }
}
