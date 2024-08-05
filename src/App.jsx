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
