//TODO :
// 1. I have a button
// 2. After clicking on button I want to see duplicates words
// 3. Sort duplicates by ABC


/**
 * @Взять весь текст из поля @Duplicate_Items
 * @Перевести весь текст в JSON и разбить на массив через ','
 * @Брать аждый элемент массива и сравнивать с текстом в Полях: Title, SubTitle, KeyWords
 * @Подсвечивать слово в полях, если оно совпало со словом, которе есть в строке Duplicate Items
 */

import {TitleArea} from './src/js/title.js';
import {SubTitle} from './src/js/subTitle.js';
import {KeyWords} from './src/js/keyWords.js';
import {DuplicatesArea} from './src/js/duplicatesArea.js';
import {Logic} from './src/js/logic.js';

TitleArea.addWordsAmount();
SubTitle.addWordsAmount();
KeyWords.addWordsAmount();

Logic.setMaxLengthForTextArea(TitleArea.titleElement, 30, TitleArea.titleCharacters);
Logic.setMaxLengthForTextArea(SubTitle.subTitle, 30, SubTitle.subTitleCharacters);
Logic.setMaxLengthForTextArea(KeyWords.keyWords, 100, KeyWords.keyWordsCharacters);

KeyWords.showDuplicatesButton.addEventListener('click', () => {
	Logic.showDuplicates(TitleArea.titleElement);
	Logic.showDuplicates(SubTitle.subTitle);
	Logic.showDuplicates(KeyWords.keyWords);
});

DuplicatesArea.cleanAllTextAreasButton.addEventListener('click', () => {
	DuplicatesArea.cleanTextArea(TitleArea.titleElement);
	DuplicatesArea.cleanTextArea(SubTitle.subTitle);
	DuplicatesArea.cleanTextArea(KeyWords.keyWords);
	DuplicatesArea.cleanDuplicatesArea(DuplicatesArea.duplicatesArea);
});



