import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import { ColorForm } from "./Components/ColorForm/ColorForm";
import { useState } from "react";
import { uid } from "uid";

function App() {
  const [colors, setColors] = useState(initialColors);
  function handleSubmit(newColor) {
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
  return (
    <>
      <ColorForm handleSubmit={handleSubmit} />
      <h1>Theme Creator</h1>

      {colors.length > 0 ? (
        colors.map((color) => {
          return (
            <Color
              key={color.id}
              id={color.id}
              color={color}
              onDelete={handleDelete}
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
