// import { titleTextWordsAmount,
//     titleTextCharactersAmount,
//     subtitleTextWordsAmount,
//     subtitleTextCharactersAmount,
//     keyWordsAmount,
//     keyWordsCharactersAmount}  from "../src/index.js"

//Find and highlight duplicates in text
const opar = document.getElementById('titleText').innerHTML;

function highlight() {
  const inputText = document.getElementById('titleText'); //inputText from Title textarea
  const search = document.getElementById('Duplicates').value; // text from title input textarea
  search = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); //https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex

  let re = new RegExp(search, 'g');
  let m;
  if (search.length > 0) {
    inputText.innerHTML = opar.replace(re, `<mark>$&</mark>`);
  } else {
    inputText.innerHTML = opar;
  }
}
