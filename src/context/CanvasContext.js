import { createContext, useState } from "react";

const CanvasContext = createContext({
  backgroundColor: "#0369A1",
  image: null,
  setImage: () => {},
  setBackgroundColor: () => {},
  caption: "",
  setCaption: () => {},
  cta: "",
  setCta: () => {},
  template: null,
  setTemplate: () => {},
});

export function CanvasContextProvider(props) {
  const [image, setImage] = useState(null);

  const [backgroundColor, setBackgroundColor] = useState("#0369A1");

  const [caption, setCaption] = useState(null);

  const [cta, setCta] = useState(null);

  const [template, setTemplate] = useState(null);

  const context = {
    image,
    setImage,
    backgroundColor,
    setBackgroundColor,
    caption,
    setCaption,
    cta,
    setCta,
    template,
    setTemplate,
  };

  return (
    <CanvasContext.Provider value={context}>
      {props.children}
    </CanvasContext.Provider>
  );
}

export default CanvasContext;