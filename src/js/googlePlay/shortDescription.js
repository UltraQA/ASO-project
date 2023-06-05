import {Logic} from "../logic.js";

export class ShortDescription {
    static shortDescription = document.querySelector('#shrtDiscrText');
    static shortDescriptionWords = document.querySelector('#shrtDiscrWordsAmount');
    static shortDescriptionChar = document.querySelector('#shrtDiscrCharacters');

    constructor() {
    }

    static getShortDescrText(){
        return this.shortDescription.value;
    }

    static addWordsAmount() {
        const separator = ' ';
        const separator2 = ':';
        this.shortDescription.addEventListener('input', () => {
            this.shortDescriptionWords.innerHTML = Logic.wordsAmount(this.shortDescription, separator, separator2);
        });
    }

    static cleanShortDescriptionWordsAmount(){
        return this.shortDescriptionWords.innerHTML = '0'
    }

    static cleanShortDescriptionCharacters() {
        return this.shortDescriptionChar.innerHTML = '0 out of 80'
    }

}