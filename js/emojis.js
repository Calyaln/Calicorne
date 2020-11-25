// import {unicorn} from "./calicorne_world.js";
// import {moveUnicorn} from "./calicorne_world.js";


// CLASS EMOJI
export class Emoji {
    constructor(emojiType, gridColumn, gridRow, point) {
        this.emojiType = emojiType;
        this.gridColumn = gridColumn;
        this.gridRow = gridRow;
        this.point = point;
        this.element = this.create();
        document.getElementById('board').appendChild(this.element);
    }

    create() {
        const element = document.createElement('div');
        element.className = this.emojiType + ' emoji';
        return element;
    }

    dropEmoji() {
            if(this.gridRow >= 6) {
                this.gridRow = 1;
                this.gridColumn = 1 + Math.floor(Math.random() * 6);
            } else {
                this.gridRow += 1;
            }
            this.element.style.gridColumn =this.gridColumn;
            this.element.style.gridRow = this.gridRow;
    }
    // voir comment stopper et restart des drop/element 
}