const titleTextWordsAmount = document.getElementById('titleText');
const titleTextCharactersAmount = document.getElementById('titleText');
const subtitleTextWordsAmount = document.getElementById('subTitleText');
const subtitleTextCharactersAmount = document.getElementById('subTitleText');
const keyWordsAmount = document.getElementById('keyWords');
const keyWordsCharactersAmount = document.getElementById('keyWords');
const allTextFromAllTextArea = document.getElementById('page');
const showDuplicatesButton = document.querySelector('#showDuplicatesButton');
const findUniqueElementsFromDuplicates = document.getElementById('page');

let current = null;

/**
	Here we trying to find amount of the words in the field by separating text
*/
titleTextWordsAmount.addEventListener('input', () => {
	document.getElementById('titleWordsAmount').innerHTML = wordsAmount(titleTextWordsAmount, ' ', ':');
});
subtitleTextWordsAmount.addEventListener('input', () => {
	document.getElementById('SubTitleWordsAmount').innerHTML = wordsAmount(subtitleTextWordsAmount, ' ');
});
keyWordsAmount.addEventListener('input', () => {
	document.getElementById('keyWordsAmount').innerHTML = wordsAmount(keyWordsAmount, /\s|\,/);
});

/**
   Here we trying to find amount of text characters in the field
 */
titleTextCharactersAmount.addEventListener('input', () => {
	maxLengthOfCharactersAmount(30, titleTextCharactersAmount, 'titleCharacters');
});
subtitleTextCharactersAmount.addEventListener('input', () => {
	maxLengthOfCharactersAmount(30, subtitleTextCharactersAmount, 'SubTitleCharacters');
});
keyWordsCharactersAmount.addEventListener('input', () => {
	maxLengthOfCharactersAmount(100, keyWordsCharactersAmount, 'keyWordCharacters');
});

/**
 Here we truing to find all text from the all text fields
 * */
allTextFromAllTextArea.addEventListener('input', () => {
	let titleTextArea = titleTextWordsAmount.value;
	let subTitleTextArea = subtitleTextWordsAmount.value;
	let keyWordsTextArea = keyWordsAmount.value;

	let allTextArea = titleTextArea + ' ' + subTitleTextArea + ' ' + keyWordsTextArea;
	let regEx = /\s|\,|\:/;
	//replace all spaces from income text to ','
	let newString = allTextArea.replace(/\s|\,|\:/gi, ',');
	//trying to find duplicates items
	let arr = newString.toLowerCase().split(',');
	let uniqueItems = arr.filter((item, index) => {
		return arr.indexOf(item) !== index;
	});
	//If all text areas are filled - then we join all texts split them and store in finalString array
	if (titleTextArea.length > 0 && subTitleTextArea.length > 0 && keyWordsTextArea.length > 0) {
		function splitString(stringToSplit, separator) {
			let arrayOfStrings = stringToSplit.split(separator);
			console.log(
				'%c%s',
				'color: white; background: #f44336; font-size: 16px;',
				'Array contains ' + arrayOfStrings.length + ' words: ' + arrayOfStrings.join(' / ')
			);
			// console.log(separator);
		}

		splitString(allTextArea, regEx);

		// console.log(arr);
		console.log(`Repeated items: ${uniqueItems}`);
		document.getElementById('Duplicates').innerHTML = '<span id="duplicatesItems" style="font-size: 16px; color: Purple">' + uniqueItems;
	}
});

findUniqueElementsFromDuplicates.addEventListener('input', () => {
	if (document.getElementById('Duplicates').innerText.length > 0) {
		let getElementsFromDuplicates = document.getElementById('Duplicates').innerText;
		let splitedElementsFromDuplicates = splitString(getElementsFromDuplicates);
		getNewUniqueArrayFromDuplicateItems(splitedElementsFromDuplicates);
	}
});

//after clicking on button I want to see duplicates
showDuplicatesButton.addEventListener('click', () => {
	let duplicatesElements = document.getElementById('Duplicates').innerText;
	if (duplicatesElements.length > 0) {
		countDuplicates();
	}
	if (duplicatesElements.length === null) {
		throw new Error('Hmm countDuplicates function not works');
	}
});


//should find Array of duplicates elements
function countDuplicates() {
	let b = document.getElementById('Duplicates').innerText;
	let newArray = b.split(',');

	/**
	 * sorting array of words by ABC
	 */
	newArray.sort();
	document.getElementById('amountDuplicatesItems').innerHTML = '';

	let current = '';
	let cnt = 0;
	for (let i = 0; i < newArray.length; i++) {
		if (newArray[i] !== current) {
			if (cnt > 0) {
				// console.log(`${current} ${cnt} times`);
				document.getElementById('amountDuplicatesItems').innerHTML += `<span style="font-size: 24px; color: #000000">` + current + '(' + cnt + ') ';
			}
			current = newArray[i];
			cnt = 1;
		}
		if (newArray[i] === current) {
			// console.log(`${newArray[i]} = ${current}`);
			cnt++;
		}
	}

	if (cnt > 0) {
		// console.log(`${current} (${cnt}) times`);
		let wordsAmount = '(' + cnt + ') ';
		document.getElementById('amountDuplicatesItems').innerHTML += `<span style="font-size: 24px; color: #000000">` + current + wordsAmount;
		console.log('%c%s',
			'color: blue; background: yellowgreen; font-size: 16px;',
			'Duplicated items: ' + document.getElementById('amountDuplicatesItems').innerText);
	}
}

function splitString(str) {
	const array = str.split(',');
	let maxLength = 0;

	for (let i = 0; i < array.length; i++) {
		if (array[i].length > maxLength) {
			maxLength = array[i].length;
		}
	}
	return array;
}

function getNewUniqueArrayFromDuplicateItems(arr) {
	let uniqueArr = [...new Set(arr)];

	if (uniqueArr.length > 1) {
		console.log(`Here is new unique Arr from Duplicates Items:  ${uniqueArr} \nAnd size is : ${uniqueArr.length} words`);
	}
	if (uniqueArr.length <= 1) {
		throw new Error(`Duplicates amount is less or equal of 1 and size is : ${uniqueArr.length} words`);
	}
	return uniqueArr;
}

let wordsAmount = function(textField, separator, separator2 = separator) {
	let textValue = textField.value;
	let count = '';
	let split = textValue.split(separator || separator2);
	for (let i = 0; i < split.length; i++) {
		if (split[i] !== '') {
			count++;
		}
	}
	return count;
};

let maxLengthOfCharactersAmount = function(maxFieldLength = 30, textFieldLength, elementId){
	let maxLength = maxFieldLength;
	let textLength = textFieldLength.value.length;
	let elementID = document.getElementById(elementId);

	if (textLength > maxLength) {
		return elementID.innerHTML =
			'<span style="background-color: #f44336; color: white">' + textLength + ' out of ' + maxLength + '</span>';
	}else {
		return elementID.innerHTML = textLength + ' out of ' + maxLength;
	}
}

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


