import { useState } from "react";

export function ThemeForm({
  onThemeChange,
  currentTheme,
  onNewTheme,
  themes,
  onEditTheme,
  onDeleteTheme,
}) {
  const [addTheme, setAddTheme] = useState(false);
  const [editTheme, setEditTheme] = useState(false);
  const [deleteTheme, setDeleteTheme] = useState(false);

  function handleTheme(event) {
    onThemeChange(event.target.value);
  }

  function toggleNewTheme() {
    setAddTheme(!addTheme);
  }

  function toggleEditTheme() {
    setEditTheme(!editTheme);
  }

  function toggleDeleteTheme() {
    setDeleteTheme(!deleteTheme);
  }

  function handleNewTheme(event) {
    event.preventDefault();
    const newThemeName = event.target.themeName.value;
    onNewTheme(newThemeName);
    toggleNewTheme();
  }

  function handleEditTheme(event) {
    event.preventDefault();
    const editedThemeName = event.target.themeName.value;
    onEditTheme(editedThemeName);
    toggleEditTheme();
  }

  function handleDelete(event) {
    event.preventDefault();
    onDeleteTheme();
    toggleDeleteTheme();
  }

  return (
    <div>
      {addTheme && (
        <form onSubmit={handleNewTheme}>
          <input name="themeName" required />
          <button type="submit">CREATE THEME</button>
          <button type="button" onClick={toggleNewTheme}>
            CANCEL
          </button>
        </form>
      )}

      {editTheme && (
        <form onSubmit={handleEditTheme}>
          <label htmlFor="themeName">Theme Name:</label>
          <div>
            <input name="themeName" placeholder={currentTheme} required />
            <button type="submit">UPDATE</button>
            <button type="button" onClick={toggleEditTheme}>
              CANCEL
            </button>
          </div>
        </form>
      )}

      {deleteTheme && (
        <div>
          <button type="button" onClick={handleDelete}>
            YES DELETE
          </button>
          <button type="button" onClick={toggleDeleteTheme}>
            CANCEL
          </button>
        </div>
      )}

      {!addTheme && !editTheme && !deleteTheme && (
        <div>
          <select onChange={handleTheme} value={currentTheme}>
            {themes.map((theme, index) => {
              return (
                <option key={index} value={theme.name}>
                  {theme.name}
                </option>
              );
            })}
          </select>
          <button onClick={toggleNewTheme}>ADD</button>
          <button
            onClick={toggleEditTheme}
            disabled={currentTheme === "Default Theme" && true}
          >
            EDIT
          </button>
          <button
            onClick={toggleDeleteTheme}
            disabled={currentTheme === "Default Theme" && true}
          >
            DELETE
          </button>
        </div>
      )}
    </div>
  );
}
