import React from "react";
import "./ActionBar.css";
import useCanvas from "../hooks/useCanvas";

export default function ActionBar() {
  const { setBackgroundColor, setImage, setCaption } = useCanvas();

  function handleImageUpload(event) {
    const imageFile = event.target.files[0];

    if (imageFile) {
      if (imageFile.type.startsWith("image/")) {
        const imageUrl = URL.createObjectURL(imageFile);
        setImage(imageUrl);
      } else {
        alert("Please select a valid image file");
        event.target.value = null;
      }
    }
  }

  function handleBackgroundColor(event) {
    setBackgroundColor(event.target.value);
  }

  function handleCaption(event) {
    setCaption(event.target.value);
  }

  return (
    <div className="action_bar_container">
      <input
        type="file"
        name="image"
        onChange={handleImageUpload}
        className="action_bar_container__input"
        accept="image/*"
      />
      <input
        type="color"
        className="action_bar_container__input"
        onChange={handleBackgroundColor}
        defaultValue="#0369A1"
      ></input>
      <input type="text" className="action_bar_container__input" onChange={handleCaption} defaultValue={""}></input>
    </div>
  );
}
