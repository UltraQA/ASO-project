export class DuplicatesArea {

	static cleanAllTextAreasButton = document.querySelector('#cleanAllTextAreasButton');
	static duplicatesArea = document.querySelector('#amountDuplicatesItems');

	constructor() {
	}

	static cleanTextArea(textArea) {
		textArea.value = '';
	}

	static cleanDuplicatesArea(duplicatesArea) {
		duplicatesArea.innerHTML = '';
	}
}