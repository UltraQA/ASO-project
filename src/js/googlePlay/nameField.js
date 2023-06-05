import {Logic} from "../logic.js";

export class NameField {
    static nameField = document.querySelector('#nameText');
    static nameWordsAmount = document.querySelector('#nameWordsAmount');
    static nameCharacterAmount = document.querySelector('#nameCharacters');
    static showDuplicatesBtnGP = document.querySelector('#showDuplicatesButtonGP')

    constructor() {
    }

    static getNameText(){
        return this.nameField.value;
    }

    static addWordsAmount(){
        const separator = ' ';
        const separator2 = ':';

        this.nameField.addEventListener('input', () => {
            this.nameWordsAmount.innerHTML = Logic.wordsAmount(this.nameField, separator, separator2);
        });
    }

    static cleanNameWordsAmount(){
        return this.nameField.innerHTML = '0'
    }

    static cleanNameCharacters() {
        return this.nameField.innerHTML = '0 out of 30'
    }
}