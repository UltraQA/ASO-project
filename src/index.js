const titleTextWordsAmount = document.getElementById('titleText');
const titleTextCharactersAmount = document.getElementById('titleText');
const subtitleTextWordsAmount = document.getElementById('subTitleText');
const subtitleTextCharactersAmount = document.getElementById('subTitleText');
const keyWordsAmount = document.getElementById('keyWords');
const keyWordsCharactersAmount = document.getElementById('keyWords');
const allTextFromAllTextArea = document.getElementById('page');
const searchDuplicates = document.getElementById('page');

titleTextWordsAmount.addEventListener('input', () => {
  let text = document.getElementById('titleText').value;
  let count = 0;
  let split = text.split(' ');
  for (let i = 0; i < split.length; i++) {
    if (split[i] != '') {
      count++;
    }
  }
  document.getElementById('titleWordsAmount').innerHTML = count;
});

titleTextCharactersAmount.addEventListener('input', () => {
  let maxLength = 30;
  let textlength = document.getElementById('titleText').value.length;

  if (textlength > maxLength) {
    document.getElementById('titleCharacters').innerHTML =
      '<span style="background-color: #f44336; color: white">' + textlength + ' out of ' + maxLength + ' </span>';
    console.log('%c%s', 'color: white; background: #f44336; font-size: 16px;', `Title length is ${textlength}/30`);
  } else {
    document.getElementById('titleCharacters').innerHTML = textlength + ' out of ' + maxLength;
  }
});

subtitleTextWordsAmount.addEventListener('input', () => {
  let text = document.getElementById('subTitleText').value;
  let count = 0;
  let split = text.split(' ');
  for (let i = 0; i < split.length; i++) {
    if (split[i] != '') {
      count++;
    }
  }
  document.getElementById('SubTitleWordsAmount').innerHTML = count;
});

subtitleTextCharactersAmount.addEventListener('input', () => {
  let maxLength = 30;
  let textlength = document.getElementById('subTitleText').value.length;

  if (textlength > maxLength) {
    document.getElementById('SubTitleCharacters').innerHTML =
      '<span style="background-color: #f44336; color: white">' + textlength + ' out of ' + maxLength + '</span>';
    console.log('%c%s', 'color: white; background: #f44336; font-size: 16px;', `Sub-title length is ${textlength}/30`);
  } else {
    document.getElementById('SubTitleCharacters').innerHTML = textlength + ' out of ' + maxLength;
  }
});

keyWordsAmount.addEventListener('input', () => {
  let text = document.getElementById('keyWords').value;
  let count = 0;
  let split = text.split(/\s|\,/);
  for (let i = 0; i < split.length; i++) {
    if (split[i] != '') {
      count++;
    }
  }
  document.getElementById('keyWordsAmount').innerHTML = count;
});

keyWordsCharactersAmount.addEventListener('input', () => {
  let maxLength = 100;
  let textlength = document.getElementById('keyWords').value.length;

  if (textlength > maxLength) {
    document.getElementById('keyWordcharacters').innerHTML =
      '<span style="background-color: #f44336; color: white;">' + textlength + ' out of ' + maxLength + '</span>';
    console.log('%c%s', 'color: white; background: #f44336; font-size: 16px;', `keyWords length is ${textlength}/30`);
  } else {
    document.getElementById('keyWordcharacters').innerHTML = textlength + ' out of ' + maxLength;
  }
});

allTextFromAllTextArea.addEventListener('input', () => {
  let titleTextArea = document.getElementById('titleText').value;
  let subTitleTextArea = document.getElementById('subTitleText').value;
  let keyWordsTextArea = document.getElementById('keyWords').value;
  let allTextArea = titleTextArea + ' ' + subTitleTextArea + ' ' + keyWordsTextArea;
  let allTextAreaValue = titleTextWordsAmount.value + ' ' + subtitleTextWordsAmount.value + ' ' + keyWordsAmount.value;
  let regEx = /\s|\,/;
  //replace all spaces from income text to ','
  let newString = allTextArea.replace(/\s|\,/gi, ',');
  //trying to find duplicates items
  let arr = newString.toLowerCase().split(',');
  let uniqueItems = 0;
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
    }
    splitString(allTextAreaValue, regEx);

    console.log(arr);
    console.log(`Repeated items: ${uniqueItems}`);
    document.getElementById('Duplicates').innerHTML = '<span id="duplicatesItems" style="font-size: 24px; color: black">' + uniqueItems;
  }
});

searchDuplicates.addEventListener('input', () => {
  const opar = document.getElementById('titleText').value; //foind text in textarea

  function highlight() {
    let inputText = document.getElementById('amountArea'); //inputText from Title textarea
    let search = document.getElementById('duplicatesItems').innerHTML; // text from title input textarea

    search = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); //https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex

    let re = new RegExp(search, 'g');
    let m;
    if (search.length > 0) {
      inputText.innerHTML = opar.replace(re, `<mark>$&</mark>`);
    } else {
      inputText.innerHTML = opar;
    }
  }
});

// module.exports = {
//      titleTextWordsAmount,
//      titleTextCharactersAmount,
//      subtitleTextWordsAmount,
//      subtitleTextCharactersAmount,
//      keyWordsAmount,
//      keyWordsCharactersAmount
// };
