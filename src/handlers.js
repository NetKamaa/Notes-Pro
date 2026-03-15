import { elements } from "./elements.js";
import { render } from "./render.js";
import { addNote, deleteNote, state } from "./state.js";

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
  }

  if (e.target.classList.contains("btn-edit")) {
  }

  render(elements, state);
}
