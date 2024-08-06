import { colorThemeArray } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import { ColorForm } from "./Components/ColorForm/ColorForm";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";
import { ThemeForm } from "./Components/ThemeForm/ThemeForm";

function App() {
  const [colorThemes, setColorThemes] = useLocalStorageState("colorThemes", {
    defaultValue: colorThemeArray,
  });

  const [currentTheme, setCurrentTheme] = useLocalStorageState("currentTheme", {
    defaultValue: "Default Theme",
  });

  const [colors, setColors] = useLocalStorageState("colors", {
    defaultValue: colorThemeArray[0].colors,
  });

  async function handleContrast(color) {
    async function postFetch() {
      const response = await fetch(
        "https://www.aremycolorsaccessible.com/api/are-they",
        {
          method: "POST",
          body: JSON.stringify({ colors: [color.hex, color.contrast] }),
        }
      ).then((response) => response.json());
      return response.overall;
    }

    if (color.hex !== "" && color.contrast !== "") {
      const contrastRating = await postFetch();
      return contrastRating;
    }
  }

  function addNewColor(newColor) {
    const updatedColor = { ...newColor, id: uid() };

    setColors((prevColors) => {
      return [updatedColor, ...prevColors];
    });

    setColorThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.name === currentTheme
          ? { ...theme, colors: [updatedColor, ...colors] }
          : theme
      )
    );
  }

  function handleDelete(id) {
    setColors(
      colors.filter((color) => {
        return color.id !== id;
      })
    );
  }

  function handleUpdate(updatedColor) {
    const newColors = colors.map((color) =>
      color.id === updatedColor.id ? updatedColor : color
    );

    setColors(newColors);

    setColorThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.name === currentTheme ? { ...theme, colors: newColors } : theme
      )
    );
  }

  function handleThemeChange(newTheme) {
    setCurrentTheme(newTheme);
    const themeColors = colorThemes.find(
      (colorTheme) => colorTheme.name === newTheme
    ).colors;
    setColors(themeColors);
  }

  function handleNewTheme(newThemeName) {
    const newTheme = { id: uid(), name: newThemeName, colors: [] };
    setColorThemes((prevThemes) => {
      return [...prevThemes, newTheme];
    });
    setCurrentTheme(newThemeName);
    setColors([]);
  }

  function handleEditTheme(editedName) {
    setColorThemes((prevThemes) => {
      return prevThemes.map((theme) => {
        if (theme.name === currentTheme) {
          return { ...theme, name: editedName };
        }
        return theme;
      });
    });
    setCurrentTheme(editedName);
  }

  function handleDeleteTheme() {
    setColorThemes((prevThemes) => {
      return prevThemes.filter((theme) => {
        return theme.name !== currentTheme;
      });
    });
    setCurrentTheme("Default Theme");
    const themeColors = colorThemes.find(
      (colorTheme) => colorTheme.name === "Default Theme"
    ).colors;
    setColors(themeColors);
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ThemeForm
        onThemeChange={handleThemeChange}
        currentTheme={currentTheme}
        onNewTheme={handleNewTheme}
        themes={colorThemes}
        onEditTheme={handleEditTheme}
        onDeleteTheme={handleDeleteTheme}
      />
      <ColorForm handleSubmit={addNewColor} buttonName="ADD COLOR" />

      {colors.length > 0 ? (
        colors.map((color) => {
          return (
            <Color
              key={color.id}
              id={color.id}
              color={color}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              onContrast={handleContrast}
            />
          );
        })
      ) : (
        <p>No colors.. start by adding one!</p>
      )}
    </>
  );
}

export default App;
