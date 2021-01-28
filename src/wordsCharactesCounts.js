// import { titleTextWordsAmount,
//     titleTextCharactersAmount,
//     subtitleTextWordsAmount,
//     subtitleTextCharactersAmount,
//     keyWordsAmount,
//     keyWordsCharactersAmount}  from "../src/index.js"

//Find and highlight duplicates in text
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

function countDuplicates() {
  let arrayOfDuplicates = document.getElementById('Duplicates').innerText;

  arrayOfDuplicates.sort();

  let current = null;
  let cnt = 0;
  for (let i = 0; i < arrayOfDuplicates.length; i++) {
    if (arrayOfDuplicates[i] != current) {
      if (cnt > 0) {
        console.log(`this item ${current} comes ${cnt} times`);
      }
      current = arrayOfDuplicates[i];
      cnt = 1;
    } else {
      cnt++;
    }
  }
  if (cnt > 0) {
    console.log(`this item ${current} comes ${cnt} times`);
  }
}
