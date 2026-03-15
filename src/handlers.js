function handleAddNote(e) {
  e.preventDefault();

  const title = elements.titleInput.value;
  const text = elements.textInput.value;

  const note = addNote({ title: title, text: text });

  if (note) {
    render();
    elements.form.reset();
  }
}
