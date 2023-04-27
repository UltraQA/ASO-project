export class SubTitle {

	static subTitle = document.querySelector('#subTitleText');

	constructor() {
	}

	static getSubTitleText() {
		const subtitleText = this.subTitle;
		return subtitleText.value;
	}
}