// import { titleTextWordsAmount, 
//     titleTextCharactersAmount,
//     subtitleTextWordsAmount,
//     subtitleTextCharactersAmount,
//     keyWordsAmount,
//     keyWordsCharactersAmount}  from "../src/index.js"
const finalString = document.getElementById("wordAmount");
finalString.addEventListener('input', () => {
    function splitString(stringToSplit, separator) {
        let arrayOfStrings = stringToSplit.split(separator);
      
        // console.log('Original string: "' + stringToSplit + '"');
        // console.log('Separator: "' + separator + '"');
        console.log('%c%s',
        'color: white; background: #f44336; font-size: 16px;','Array contains ' + arrayOfStrings.length + ' words: ' + arrayOfStrings.join(' / '));
      }
      let titleString = document.getElementById('titleText').value;
      let SubTitleString = document.getElementById('subTitleText').value;
      let keyWordsString = document.getElementById('keyWords').value;
      let allStrings = titleString + " " + SubTitleString + " " + keyWordsString;
      
    //   var space = ' ';
    //   var comma = ',';
      let regEx = (/\s|\,/);
      
    //   splitString(titleString, regEx);
    //   splitString(SubTitleString, regEx);
    //   splitString(keyWordsString, regEx);
      splitString(allStrings, regEx);
})
