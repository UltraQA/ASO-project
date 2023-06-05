import {Logic} from "../logic.js";

export class Description {
    static description = document.querySelector('#description');
    static descriptionWords = document.querySelector('#descriptionAmount');
    static descriptionChar = document.querySelector('#descriptionCharacters');
    constructor() {
    }

    static getDescriptionText() {
        return this.description.value;
    }

    static addWordsAmount() {
        const separator = ' ';
        const separator2 = ':';
        this.description.addEventListener('input', () => {
            this.descriptionWords.innerHTML = Logic.wordsAmount(this.description, separator, separator2);
        });
    }

    static cleanDescriptionWords(){
        return this.descriptionWords.innerHTML = '0'
    }

    static cleanDescriptionCharacter() {
        return this.descriptionChar.innerHTML = '0 out of 4000'
    }

}