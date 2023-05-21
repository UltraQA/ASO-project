import {Logic} from './logic.js';

export class TitleArea {

	static titleElement = document.querySelector('#titleText');
	static titleWordsAmount = document.querySelector('#titleWordsAmount');
	static titleCharacters = document.querySelector('#titleCharacters');

	constructor() {
	}

	static getTitleText() {
		return this.titleElement.value;
	}

	static addWordsAmount() {
		const separator = ' ';
		const separator2 = ':';
		this.titleElement.addEventListener('input', () => {
			this.titleWordsAmount.innerHTML = Logic.wordsAmount(this.titleElement, separator, separator2);
		});
	}

	static cleanTitleWordsAmount(id){
		return id.innerHTML = '0'
	}

	static cleanCharacterArea(area) {
		return area.innerHTML = '0 out of 30'
	}

}