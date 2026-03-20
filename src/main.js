import { elements } from "./elements.js";
import {
  handleAddNote,
  handleNoteActions,
  handleQueryChange,
  handleReset,
  handleSortChange,
} from "./handlers.js";
import { renderApp } from "./render.js";
import { state } from "./state.js";

function init() {
  elements.form.addEventListener("submit", handleAddNote);
  elements.notesList.addEventListener("click", handleNoteActions);

  elements.sort.addEventListener("change", handleSortChange);
  elements.queryTitle.addEventListener("input", handleQueryChange);
  elements.reset.addEventListener("click", handleReset);

  renderApp(elements, state);
}

init();
