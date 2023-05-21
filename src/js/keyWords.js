import {Logic} from './logic.js';

export class KeyWords {

	static keyWords = document.querySelector('#keyWords');
	static keyWordsAmount = document.querySelector('#keyWordsAmount');
	static keyWordsCharacters = document.querySelector('#keyWordCharacters');
	static showDuplicatesButton = document.querySelector('#showDuplicatesButton');


	constructor() {
	}

	static getKeyWordsText() {
		return this.keyWords.value;
	}

	static addWordsAmount() {
		const separator = ' ';
		const separator2 = ':';
		this.keyWords.addEventListener('input', () => {
			this.keyWordsAmount.innerHTML = Logic.wordsAmount(this.keyWords, separator, separator2);
		});
	}

	static cleanKeyWordsAmount(id){
		return id.innerHTML = '0'
	}

	static cleanCharacterArea(area) {
		area.innerHTML = '0 out of 100'
	}
}