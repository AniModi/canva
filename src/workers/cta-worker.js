const ctaWorker = () => {
  var canvas = null;
  var context = null;
  function wrapCTA(text, x, y, fontSize, textColor, backgroundColor, maxWidth) {
    const padding = 20;
    let maxW = 0;
    const words = text.split(" ");
    let line = "";
    let height = fontSize + padding * 2;
    context.font = `${fontSize}px Arial`;

    for (let i = 0; i < words.length; i++) {
      let curLength = line.length;
      if (curLength !== 0 && curLength + words[i].length + 1 > maxWidth) {
        line = words[i];
        height += fontSize * 1.2;
      } else {
        line += (curLength === 0 ? "" : " ") + words[i];
      }
      maxW = Math.max(maxW, context.measureText(line).width);
    }

    const width = maxW + padding * 2;

    context.fillStyle = backgroundColor;

    context.beginPath();
    context.roundRect(x, y, width, height, 10);
    context.fill();
    context.fillStyle = textColor;
    context.textAlign = "center";

    line = "";
    y += (fontSize + 2 * padding) / 2;
    for (let i = 0; i < words.length; i++) {
      let curLength = line.length;
      if (curLength !== 0 && curLength + words[i].length + 1 > maxWidth) {
        context.fillText(line, x + width / 2, y + fontSize / 3);
        line = words[i];
        y += fontSize * 1.2;
      } else {
        line += (curLength === 0 ? "" : " ") + words[i];
      }
    }
    context.fillText(line, x + width / 2, y + fontSize / 3);
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

    if (!data.text) {
      return;
    }
    wrapCTA(
      data.text,
      data.x,
      data.y,
      data.fontSize,
      data.textColor,
      data.backgroundColor,
      data.maxWidth
    );
  };
};

export default ctaWorker;
