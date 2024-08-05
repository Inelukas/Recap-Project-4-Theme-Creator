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
  return (
    <>
      <ColorForm handleSubmit={handleSubmit} />
      <h1>Theme Creator</h1>

      {colors.map((color) => {
        return <Color key={color.id} color={color} />;
      })}
    </>
  );
}

export default App;
