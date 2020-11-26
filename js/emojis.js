// CREATE CLASS EMOJI
export class Emoji {
  constructor(emojiType, gridColumn, gridRow, point) {
    this.emojiType = emojiType;
    this.gridColumn = gridColumn;
    this.gridRow = gridRow;
    this.point = point;
    this.element = this.create();
    document.getElementById("board").appendChild(this.element);
  }

  // CREATE EMOJIS IN HTML
  create() {
    const element = document.createElement("div");
    element.className = this.emojiType + " emoji";
    return element;
  }

  // DRAW RANDOMLY THE EMOJIS ON THE GRID
  dropEmoji() {
    if (this.gridRow >= 15) {
      this.gridRow = 1;
      this.gridColumn = 1 + Math.floor(Math.random() * 15);
    } else {
      this.gridRow += 1;
    }
    this.element.style.gridColumn = this.gridColumn;
    this.element.style.gridRow = this.gridRow;
  }
}
