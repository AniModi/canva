import { useContext } from "react";
import CanvasContext from "../context/CanvasContext";

export default function useCanvas() {
  const context = useContext(CanvasContext);

  return context;
}
