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

titleTextWordsAmount.addEventListener('input', () => {
  let text = titleTextWordsAmount.value;
  let count = 0;
  let split = text.split(' ' || ':');
  for (let i = 0; i < split.length; i++) {
    if (split[i] !== '') {
      count++;
    }
  }
  document.getElementById('titleWordsAmount').innerHTML = count;
});

titleTextCharactersAmount.addEventListener('input', () => {
  let maxLength = 30;
  let textLength = titleTextCharactersAmount.value.length;

  if (textLength > maxLength) {
    document.getElementById('titleCharacters').innerHTML =
      '<span style="background-color: #f44336; color: white">' + textLength + ' out of ' + maxLength + ' </span>';
    console.log('%c%s', 'color: white; background: #f44336; font-size: 16px;', `Title length is ${textLength}/30`);
  } else {
    document.getElementById('titleCharacters').innerHTML = textLength + ' out of ' + maxLength;
  }
});

subtitleTextWordsAmount.addEventListener('input', () => {
  let text = subtitleTextWordsAmount.value
  let count = 0;
  let split = text.split(' ');
  for (let i = 0; i < split.length; i++) {
    if (split[i] !== '') {
      count++;
    }
  }
  document.getElementById('SubTitleWordsAmount').innerHTML = count;
});

subtitleTextCharactersAmount.addEventListener('input', () => {
  let maxLength = 30;
  let textLength = subtitleTextCharactersAmount.value.length

  if (textLength > maxLength) {
    document.getElementById('SubTitleCharacters').innerHTML =
      '<span style="background-color: #f44336; color: white">' + textLength + ' out of ' + maxLength + '</span>';
    console.log('%c%s', 'color: white; background: #f44336; font-size: 16px;', `Sub-title length is ${textLength}/30`);
  } else {
    document.getElementById('SubTitleCharacters').innerHTML = textLength + ' out of ' + maxLength;
  }
});

keyWordsAmount.addEventListener('input', () => {
  let text = keyWordsAmount.value
  let count = 0;
  let split = text.split(/\s|\,/);
  for (let i = 0; i < split.length; i++) {
    if (split[i] !== '') {
      count++;
    }
  }
  document.getElementById('keyWordsAmount').innerHTML = count;
});

keyWordsCharactersAmount.addEventListener('input', () => {
  let maxLength = 100;
  let textLength = keyWordsCharactersAmount.value.length;

  if (textLength > maxLength) {
    document.getElementById('keyWordCharacters').innerHTML =
      '<span style="background-color: #f44336; color: white;">' + textLength + ' out of ' + maxLength + '</span>';
    console.log('%c%s', 'color: white; background: #f44336; font-size: 16px;', `keyWords length is ${textLength}/30`);
  } else {
    document.getElementById('keyWordCharacters').innerHTML = textLength + ' out of ' + maxLength;
  }
});

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
  let uniqueItems;
  uniqueItems = arr.filter((item, index) => {
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
    // let splitString = duplicatesFromDuplicatesItems.split(',');

    let splitedElementsFromDuplicates = splitString(getElementsFromDuplicates);
    // console.log('splitedString: ' + splitedElementsFromDuplicates);

    let uniqueItemsFromDuplicates = getNewUniqueArrayFromDuplicateItems(splitedElementsFromDuplicates);
    // console.log('splittingItems: ' + uniqueItemsFromDuplicates);
    // console.log('splittingItems: ' + typeof (uniqueItemsFromDuplicates));
  }
})

//should find Array of duplicates elements

function countDuplicates() {
  let b = document.getElementById('Duplicates').innerText;
  let newArray = b.split(',');

  newArray.sort();
  document.getElementById('amountDuplicatesItems').innerHTML = '';

  // let current = null;
  let cnt = 0;
  for (let i = 0; i < newArray.length; i++) {
    if (newArray[i] !== current) {
      if (cnt > 0) {
        // console.log(`${current} ${cnt} times`);
        document.getElementById('amountDuplicatesItems').innerHTML += `<span style="font-size: 24px; color: black">` + current + '(' + cnt + ') ';
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
    document.getElementById('amountDuplicatesItems').innerHTML += `<span style="font-size: 24px; color: black">` + current + wordsAmount;
    console.log('%c%s',
      'color: blue; background: yellowgreen; font-size: 16px;',
      'Duplicated items: ' + document.getElementById('amountDuplicatesItems').innerText);
  }
}

function splitString(str) {
  const array = str.split(',')
  let maxLength = 0;

  for (let i = 0; i < array.length; i++) {
    if (array[i].length > maxLength) {
      maxLength = array[i].length;
    }
  }
  return array;
}

function getNewUniqueArrayFromDuplicateItems(arr) {
  let uniqueArr = [...new Set(arr)]

  if (uniqueArr.length > 1) {
    console.log(`Here is new unique Arr from Duplicates Items:  ${uniqueArr} \nAnd size is : ${uniqueArr.length} words`);
  }
  if (uniqueArr.length <= 1) {
    throw new Error(`Duplicates amount is less or equal of 1 and size is : ${uniqueArr.length} words`)
  }
  return uniqueArr;
}

//after clicking on button I want to see duplicates
showDuplicatesButton.addEventListener('click', ()=>{
  if (document.getElementById('Duplicates').innerText.length > 0) {
    countDuplicates();
  }
  if (document.getElementById('Duplicates').innerText.length === null) {
    throw new Error('Hmm countDuplicates function not works')
  }
});

//TODO :
// 1. I have a button
// 2. After clicking on button I want to see duplicates words




/**
 * @Взять весь текст из поля @Duplicate_Items
 * @Перевести весь текст в JSON и разбить на массив через ','
 * @Брать аждый элемент массива и сравнивать с текстом в Полях: Title, SubTitle, KeyWords
 * @Подсвечивать слово в полях, если оно совпало со словом, которе есть в строке Duplicate Items
 */


