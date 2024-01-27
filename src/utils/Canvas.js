export default class Canvas {
  constructor(canvas, data) {
    this.canvas = canvas;
    this.data = data;
    this.context = canvas.getContext("2d");
    this.backgroundColor = "#0369A1";
  }

  init() {
    this.renderCanvas();
  }

  renderCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawImage("design_pattern", () => {
      this.drawImage("mask", () => {
        this.drawImage("stroke", () => {
          const caption = this.data.caption;
          const cta = this.data.cta;

          this.context.fillStyle = caption.text_color;
          this.context.font = `${caption.font_size}px Arial`;

          this.wrapCaption(
            caption.text,
            caption.position.x,
            caption.position.y,
            caption.max_characters_per_line,
            caption.font_size,
            caption.alignment,
            caption.text_color
          );
          this.wrapCTA(
            cta.text,
            cta.position.x,
            cta.position.y,
            cta.font_size || 30,
            cta.text_color,
            cta.background_color,
            cta.wrap_length || 20
          );
        });
      });
    });
  }

  drawImage(type, callback) {
    const image = new Image();
    image.onload = () => {
      this.context.drawImage(
        image,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      if (callback) {
        callback();
      }
    };
    image.src = this.data.urls[type];
  }

  wrapCaption(text, x, y, maxWidth, fontSize, alignment, textColor) {
    const words = text.split(" ");
    let line = "";
    let lineHeight = fontSize * 1.2;
    x = this.calculatePosition(alignment, x, words, maxWidth);
    this.context.textAlign = alignment;
    this.context.fillStyle = textColor;
    this.context.font = `${fontSize}px Arial`;

    for (let i = 0; i < words.length; i++) {
      let curLength = line.length;
      if (curLength + words[i].length + 1 > maxWidth) {
        this.context.fillText(line, x, y);
        line = words[i];
        y += lineHeight;
      } else {
        line += (curLength === 0 ? "" : " ") + words[i];
      }
    }
    this.context.fillText(line, x, y);
  }

  calculatePosition(alignment, x, words, maxWidth) {
    let maxW = 0;
    let line = "";

    for (let i = 0; i < words.length; i++) {
      let curLength = line.length;
      if (curLength + words[i].length + 1 > maxWidth) {
        line = words[i];
      } else {
        line += (curLength === 0 ? "" : " ") + words[i];
      }
      maxW = Math.max(maxW, this.context.measureText(line).width);
    }

    if (alignment === "center") {
      return x + maxW / 2;
    }
    if (alignment === "right") {
      return x + maxW;
    }
    return x;
  }

  wrapCTA(text, x, y, fontSize, textColor, backgroundColor, maxWidth) {
    const padding = 20;
    let maxW = 0;
    const words = text.split(" ");
    let line = "";
    let height = fontSize + padding * 2;
    this.context.font = `${fontSize}px Arial`;

    for (let i = 0; i < words.length; i++) {
      let curLength = line.length;
      if (curLength + words[i].length + 1 > maxWidth) {
        line = words[i];
        height += fontSize * 2.2;
      } else {
        line += (curLength === 0 ? "" : " ") + words[i];
      }
      maxW = Math.max(maxW, this.context.measureText(line).width);
    }

    const width = maxW + padding * 2;

    this.context.fillStyle = backgroundColor;

    this.context.beginPath();
    this.context.roundRect(x, y, width, height, 10);
    this.context.fill();
    this.context.fillStyle = textColor;
    this.context.textAlign = "center";

    line = "";
    y += (fontSize + 2 * padding) / 2;
    for (let i = 0; i < words.length; i++) {
      let curLength = line.length;
      if (curLength + words[i].length + 1 > maxWidth) {
        this.context.fillText(line, x + width / 2, y + fontSize / 3);
        line = words[i];
        y += fontSize * 1.2;
      } else {
        line += (curLength === 0 ? "" : " ") + words[i];
      }
    }
    this.context.fillText(line, x + width / 2, y + fontSize / 3);
  }

  drawImageMask(url) {
    const { x, y, width, height } = this.data.image_mask;
    const image = new Image();
    image.onload = () => {
      this.context.drawImage(image, x, y, width, height);
    };
    image.src = url;
  }

  changeBackgroundColor(color) {
    this.canvas.style.backgroundColor = color;
  }

  updateCaption(text) {
    // clear the caption text first
    const caption = this.data.caption;
    this.wrapCaption(
      caption.text,
      caption.position.x,
      caption.position.y,
      caption.max_characters_per_line,
      caption.font_size,
      caption.alignment,
      this.backgroundColor
    );

    // update the caption text
    this.data.caption.text = text;

    this.wrapCaption(
      caption.text,
      caption.position.x,
      caption.position.y,
      caption.max_characters_per_line,
      caption.font_size,
      caption.alignment,
      caption.text_color
    );
  }
}
