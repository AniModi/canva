const captionWorker = () => {
  var canvas = null;
  var context = null;
  function wrapCaption(text, x, y, maxWidth, fontSize, alignment, textColor) {
    let line = "";
    let lineHeight = fontSize * 1.2;
    context.textAlign = alignment;
    context.fillStyle = textColor;
    context.font = `${fontSize}px Arial`;
    
    const words = text.split(" ");
    x = calculatePosition(alignment, x, words, maxWidth);
    for (let i = 0; i < words.length; i++) {
      let curLength = line.length;
      if (curLength !== 0 && curLength + words[i].length + 1 > maxWidth) {
        context.fillText(line, x, y);
        line = words[i];
        y += lineHeight;
      } else {
        line += (curLength === 0 ? "" : " ") + words[i];
      }
    }
    context.fillText(line, x, y);
  }

  function calculatePosition(alignment, x, words, maxWidth) {
    let maxW = 0;
    let line = "";

    for (let i = 0; i < words.length; i++) {
      let curLength = line.length;
      if (curLength + words[i].length + 1 > maxWidth) {
        line = words[i];
      } else {
        line += (curLength === 0 ? "" : " ") + words[i];
      }
      maxW = Math.max(maxW, context.measureText(line).width);
    }

    if (alignment === "center") {
      return x + maxW / 2;
    }
    if (alignment === "right") {
      return x + maxW;
    }
    return x;
  }

  onmessage = (e) => {
    if (e.data.canvas) {
      canvas = e.data.canvas;
      context = canvas.getContext("2d");
      return;
    }

    if (!canvas) {
      return;
    }

    const { data } = e;

    context.clearRect(0, 0, canvas.width, canvas.height);

    wrapCaption(
      data.text,
      data.x,
      data.y,
      data.maxWidth,
      data.fontSize,
      data.alignment,
      data.textColor
    );
  };
};

export default captionWorker;
