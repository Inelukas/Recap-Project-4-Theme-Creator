import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import { ColorForm } from "./Components/ColorForm/ColorForm";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";

function App() {
  const [colors, setColors] = useLocalStorageState("colors", {
    defaultValue: initialColors,
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
    setColors((prevColors) => {
      return [{ ...newColor, id: uid() }, ...prevColors];
    });
  }

  function handleDelete(id) {
    setColors(
      colors.filter((color) => {
        return color.id !== id;
      })
    );
  }

  function handleUpdate(updatedColor) {
    setColors((prevColors) => {
      return prevColors.map((color) =>
        color.id === updatedColor.id ? updatedColor : color
      );
    });
  }

  return (
    <>
      <ColorForm handleSubmit={addNewColor} buttonName="ADD COLOR" />
      <h1>Theme Creator</h1>

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
