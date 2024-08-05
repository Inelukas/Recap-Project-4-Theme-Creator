import { useState } from "react";
import "./Color.css";
import { ColorForm } from "../ColorForm/ColorForm";

export default function Color({ color, onDelete, onUpdate }) {
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  function toggleDelete() {
    setDeleteVisible(!deleteVisible);
  }

  function toggleEdit() {
    setFormVisible(!formVisible);
  }

  function handleUpdate(updatedColor) {
    onUpdate({ ...updatedColor, id: color.id });
    toggleEdit();
  }

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrast,
      }}
    >
      <h3 className="color-card-hightlight">{color.hex}</h3>
      <h4>{color.role}</h4>
      <p>contrast: {color.contrast}</p>
      {!deleteVisible ? (
        <button onClick={toggleDelete}>DELETE</button>
      ) : (
        <div>
          <p className="color-card-hightlight">Really delete?</p>
          <button onClick={toggleDelete}>CANCEL</button>
          <button
            onClick={() => {
              onDelete(color.id);
            }}
          >
            DELETE
          </button>
        </div>
      )}
      {!formVisible ? (
        <button onClick={toggleEdit}>EDIT</button>
      ) : (
        <div>
          <ColorForm
            buttonName="UPDATE COLOR"
            handleSubmit={handleUpdate}
            initialValues={{
              role: color.role,
              hex: color.hex,
              contrast: color.contrast,
            }}
          />
          <br />
          <button onClick={toggleEdit}>CANCEL</button>
        </div>
      )}
    </div>
  );
}
