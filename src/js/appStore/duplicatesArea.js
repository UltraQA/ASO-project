export class DuplicatesArea {

    static cleanAllTextAreasButton = document.querySelector('#cleanAllTextAreasButton');
    static duplicatesArea = document.querySelector('#amountDuplicatesItems');
    static duplicatesAreaGP = document.querySelector('#amountDuplicatesItemsGP');
    static showDuplicatesButton = document.querySelector('#showDuplicatesButton');
    static showDuplicatesButtonGP = document.querySelector('#showDuplicatesButtonGP');

    constructor() {
    }

    static cleanTextArea(textArea) {
        return textArea.value = '';
    }

    static cleanDuplicatesArea(duplicatesArea) {
        return duplicatesArea.innerHTML = '';
    }
}