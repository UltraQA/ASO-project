import {Logic} from '../logic.js';

export class SubTitle {

	static subTitle = document.querySelector('#subTitleText');
	static subTitleWordsAmount = document.querySelector('#SubTitleWordsAmount');
	static subTitleCharacters = document.querySelector('#SubTitleCharacters');

	constructor() {
	}

	static getSubTitleText() {
		return this.subTitle.value;
	}

	static addWordsAmount() {
		const separator = ' ';
		const separator2 = ':';
		this.subTitle.addEventListener('input', () => {
			this.subTitleWordsAmount.innerHTML = Logic.wordsAmount(this.subTitle, separator, separator2);
		});
	}

	static cleanSubTitleWordsAmount(){
		return this.subTitleWordsAmount.innerHTML = '0'
	}

	static cleanCharacterArea() {
		return this.subTitleCharacters.innerHTML = '0 out of 30'
	}
}