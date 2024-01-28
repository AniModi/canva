import React, { useEffect, useState } from "react";
import "./ActionBar.css";
import useCanvas from "../hooks/useCanvas";

export default function ActionBar() {
  const { setBackgroundColor, setImage, setCaption, caption, setCta, cta } =
    useCanvas();

  const [color, setColor] = useState();
  const [recentColors, setRecentColors] = useState([]);

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

  useEffect(() => {
    if (!color) return;
    const timeout = setTimeout(() => {
      setBackgroundColor(color);
      if (!recentColors.includes(color)) {
        setRecentColors([...recentColors, color].slice(-5));
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [color]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleBackgroundColor(event) {
    setColor(event.target.value);
  }

  function handleCaption(event) {
    setCaption(event.target.value);
  }

  function handleCta(event) {
    setCta(event.target.value);
  }
  return (
    <div className="action_bar_container">
      <div className="action_bar_container__header">
        <div className="action_bar_container__header__title">
          Ad customization
        </div>
        <div className="action_bar_container__header__subtitle">
          Customize your ad and get templates accordingly
        </div>
      </div>
      <div className="action_bar_container__main_content">
        <div className="action_bar_container__main_content__image">
          <input
            type="file"
            name="image"
            onChange={handleImageUpload}
            className="action_bar_container__input"
            accept="image/*"
          />
        </div>
        <div className="action_bar_container__main_content__text">
          <div className="action_bar_container__main_content__text__title">
            Edit Content
          </div>
          <div className="action_bar_container__main_content__text__content">
            <div className="input_container">
              <label className="input_container__label">
                Enter the caption
              </label>
              <input
                type="text"
                className="action_bar_container__input"
                onChange={handleCaption}
                value={caption || ""}
              ></input>
            </div>
            <div className="input_container">
              <label className="input_container__label">Enter the CTA</label>
              <input
                type="text"
                className="action_bar_container__input"
                onChange={handleCta}
                value={cta || ""}
              ></input>
            </div>
            <div className="input_container">
              <label className="input_container__label">Choose color</label>
              <div className="color_picker_colors">
                {recentColors.map((color, index) => (
                  <div
                    className="color_picker"
                    style={{ backgroundColor: color }}
                    onClick={() => setBackgroundColor(color)}
                    key={index}
                  ></div>
                ))}
                <div className="color_picker_input">
                  +
                  <input
                    type="color"
                    className="color_picker_picker_input_box"
                    onInput={handleBackgroundColor}
                    defaultValue="#0369A1"
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
