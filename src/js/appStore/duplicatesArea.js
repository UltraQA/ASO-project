import {Logic} from '../logic.js';

export class DuplicatesArea {

    static cleanAllTextAreasButton = document.querySelector('#cleanAllTextAreasButton');
    static cleanAllTextAreasButtonGP = document.querySelector('#cleanAllTextAreasButtonGP');
    static duplicatesArea = document.querySelector('#amountDuplicatesItems');
    static duplicatesAreaGP = document.querySelector('#amountDuplicatesItemsGP');
    static showDuplicatesButton = document.querySelector('#showDuplicatesButton');
    static showDuplicatesButtonGP = document.querySelector('#showDuplicatesButtonGP');

    constructor() {
    }

    static cleanTextArea(textArea) {
        if (!textArea) return '';
        textArea.value = '';
        // Also clear highlight overlays
        try { Logic.clearHighlights(textArea); } catch (e) {}
        return '';
    }

    static cleanDuplicatesArea(duplicatesArea) {
        return duplicatesArea.innerHTML = '';
    }
}
