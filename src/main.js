import { elements } from "./elements.js";
import { handleAddNote, handleNoteActions } from "./handlers.js";
import { render } from "./render.js";
import { state } from "./state.js";

function init() {
  elements.form.addEventListener("submit", handleAddNote);
  elements.notesList.addEventListener("click", handleNoteActions);
  render(elements, state);
}

init();
