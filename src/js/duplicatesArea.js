export class DuplicatesArea {

	static cleanAllTextAreasButton = document.querySelector('#cleanAllTextAreasButton');
	static duplicatesArea = document.querySelector('#amountDuplicatesItems');

	constructor() {
	}

	static cleanTextArea(textArea) {
		return textArea.value = '';
	}

	static cleanDuplicatesArea(duplicatesArea) {
		return duplicatesArea.innerHTML = '';
	}
}