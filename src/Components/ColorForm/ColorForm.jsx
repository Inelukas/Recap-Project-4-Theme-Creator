import { useState } from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 200px;

  fieldset {
    border: none;
    display: flex;
    flex-direction: column;
  }

  .input-group {
    display: flex;
  }

  button {
    font-size: 14px;
    margin-left: 12px;
    align-self: flex-start;
  }
`;

export function ColorForm({
  handleSubmit,
  buttonName,
  initialValues = {
    role: "",
    hex: "",
    contrast: "",
  },
}) {
  const [$inputColor, setInputColor] = useState(initialValues);

  function handleInput(event) {
    const { name, value, type } = event.target;
    if (type === "color") {
      setInputColor((prevValue) => ({
        ...prevValue,
        [name.replace("Color", "")]: value,
      }));
    } else {
      setInputColor((prevValue) => ({ ...prevValue, [name]: value }));
    }
  }

  function onSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = {
      role: form.role.value,
      hex: form.hex.value,
      contrast: form.contrast.value,
    };
    handleSubmit(formData);
  }

  return (
    <StyledForm $inputColor={$inputColor} onSubmit={onSubmit}>
      <fieldset>
        <label htmlFor="role">Role</label>
        <input
          onChange={handleInput}
          name="role"
          id="role"
          placeholder="some color"
          value={$inputColor.role}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="hex">Hex</label>
        <div className="input-group">
          <input
            onChange={handleInput}
            name="hex"
            id="hex"
            placeholder="#123456"
            value={$inputColor.hex}
          />
          <input
            type="color"
            onChange={handleInput}
            name="hexColor"
            value={$inputColor.hex}
          />
        </div>
      </fieldset>
      <fieldset>
        <label htmlFor="contrast">Contrast Text</label>
        <div className="input-group">
          <input
            onChange={handleInput}
            name="contrast"
            id="contrast"
            placeholder="#ffffff"
            value={$inputColor.contrast}
          />
          <input
            type="color"
            onChange={handleInput}
            name="contrastColor"
            value={$inputColor.contrast}
          />
        </div>
      </fieldset>
      <button type="submit">{buttonName}</button>
    </StyledForm>
  );
}
