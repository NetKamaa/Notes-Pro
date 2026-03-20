import { elements } from "./elements.js";
import { getNoteHTML, removeNoteFromDOM, renderApp } from "./render.js";
import {
  addNote,
  cancelEdit,
  deleteNote,
  resetFilter,
  saveEdit,
  setQuery,
  setSort,
  startEdit,
  state,
} from "./state.js";

export function handleAddNote(e) {
  e.preventDefault();

  const title = elements.titleInput.value;
  const text = elements.textInput.value;

  const note = addNote({ title: title, text: text });

  if (note) {
    const newNote = state.notes[0];

    const html = getNoteHTML(newNote, false);

    if (state.notes.length === 1) {
      elements.notesList.innerHTML = "";
    }

    elements.notesList.insertAdjacentHTML("afterbegin", html);

    elements.form.reset();
  }
}

export function handleNoteActions(e) {
  const card = e.target.closest(".note-card");

  if (!card) return;

  const id = card.dataset.id;
  if (e.target.classList.contains("btn-delete")) {
    deleteNote(id);
    removeNoteFromDOM(id);

    if (state.notes.length === 0) {
      renderApp(elements, state);
    }
  }

  if (e.target.classList.contains("btn-edit")) {
    startEdit(id);
    renderApp(elements, state);
  }

  if (e.target.classList.contains("btn-cancel")) {
    cancelEdit();
    renderApp(elements, state);
  }

  if (e.target.classList.contains("btn-save")) {
    const title = card.querySelector(".edit-title").value;
    const text = card.querySelector(".edit-text").value;

    if (!title || !text) return;

    saveEdit(id, { title, text });

    const note = state.notes.find((note) => note.id === id);

    const html = getNoteHTML(note, false);

    const wrapper = document.createElement("div");
    wrapper.innerHTML = html;

    const newCard = wrapper.firstElementChild;

    card.replaceWith(newCard);
  }
}

export function handleSortChange(e) {
  const value = e.target.value;

  setSort(value);

  renderApp(elements, state);
}

export function handleQueryChange(e) {
  const value = e.target.value;

  setQuery(value);

  renderApp(elements, state);
}

export function handleReset(e) {
  e.preventDefault();

  resetFilter();

  elements.queryTitle.value = "";

  renderApp(elements, state);
}
