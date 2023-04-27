export class TitleArea {

	static titleElement = document.querySelector('#titleText');

	constructor() {
	}

	static getTitleText() {
		const titleTextArea = this.titleElement;
		return titleTextArea.value;
	}
}