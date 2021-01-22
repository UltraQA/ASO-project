const titleTextWordsAmount = document.getElementById('titleText');
const titleTextCharactersAmount = document.getElementById('titleText');
const subtitleTextWordsAmount = document.getElementById('subTitleText');
const subtitleTextCharactersAmount = document.getElementById('subTitleText');
const keyWordsAmount = document.getElementById('keyWords');
const keyWordsCharactersAmount = document.getElementById('keyWords');
const allTextFromAllTextArea = document.getElementById('page');

titleTextWordsAmount.addEventListener('input', () => {
    let text = document.getElementById('titleText').value;
    let count = 0;
    let split = text.split(' ');
    for (let i = 0; i < split.length; i++){
        if (split[i] != ''){
            count ++;
        }
    }
    document.getElementById('titleWordsAmount').innerHTML = count;
})

titleTextCharactersAmount.addEventListener('input', ()=>{
    let maxLength = 30;
    let textlength = document.getElementById('titleText').value.length;
    
    if(textlength > maxLength){
        document.getElementById("titleCharacters").innerHTML = '<span style="background-color: #f44336; color: white">'+textlength+' out of '+maxLength+' </span>';
        // document.getElementById("titleTextWords").innerHTML = '<h4 id="titleTextWords" style="color: red;">Title text</h4>';
        console.log('%c%s',
        'color: white; background: #f44336; font-size: 16px;',`Title length is ${textlength}/30`);
    }else{
        document.getElementById("titleCharacters").innerHTML = textlength+' out of '+maxLength;
    }
})

subtitleTextWordsAmount.addEventListener('input', () => {
    let text = document.getElementById('subTitleText').value;
    let count = 0;
    let split = text.split(' ');
    for (let i = 0; i < split.length; i++){
        if (split[i] != ''){
            count ++;
        }
    }
    document.getElementById('SubTitleWordsAmount').innerHTML = count;
})

subtitleTextCharactersAmount.addEventListener('input', ()=>{
    let maxLength = 30;
    let textlength = document.getElementById('subTitleText').value.length;
    
    if(textlength > maxLength){
        document.getElementById("SubTitleCharacters").innerHTML = '<span style="background-color: #f44336; color: white">'+textlength+' out of '+maxLength+'</span>';
        console.log('%c%s',
        'color: white; background: #f44336; font-size: 16px;',`Sub-title length is ${textlength}/30`);
    }else{
        document.getElementById("SubTitleCharacters").innerHTML = textlength+' out of '+maxLength;
    }
})

keyWordsAmount.addEventListener('input', () => {
    let text = document.getElementById('keyWords').value;
    let count = 0;
    let split = text.split(/\s|\,/);
    for (let i = 0; i < split.length; i++){
        if (split[i] != '' ){
            count ++;
        }
    }
    document.getElementById('keyWordsAmount').innerHTML = count;
})

keyWordsCharactersAmount.addEventListener('input', ()=>{
    let maxLength = 100;
    let textlength = document.getElementById('keyWords').value.length;
    
    if(textlength > maxLength){
        document.getElementById("keyWordcharacters").innerHTML = '<span style="background-color: #f44336; color: white;">'+textlength+' out of '+maxLength+'</span>';
        console.log('%c%s',
        'color: white; background: #f44336; font-size: 16px;',`keyWords length is ${textlength}/30`);
    }else{
        document.getElementById("keyWordcharacters").innerHTML = textlength+' out of '+maxLength;
    }
})

allTextFromAllTextArea.addEventListener('input', () => {
    let titleTextArea =  document.getElementById('titleText').value;
    let subTitleTextArea = document.getElementById('subTitleText').value;
    let keyWordsTextArea = document.getElementById('keyWords').value;
    let allTextArea = titleTextArea + " " +  subTitleTextArea + " " +  keyWordsTextArea;
    //If all text areas are filled - then we join all texts split them and store in finalString array
    if (titleTextArea.length > 0 && subTitleTextArea.length > 0 && keyWordsTextArea.length > 0) {
        let finalString = JSON.stringify(allTextArea);
        console.log(finalString);

            function splitString(stringToSplit, separator) {
                 let arrayOfStrings = stringToSplit.split(separator);
                    console.log('%c%s',
                    'color: white; background: #f44336; font-size: 16px;','Array contains ' + arrayOfStrings.length + ' words: ' + arrayOfStrings.join(' / '));
                }

        let titleString = titleTextWordsAmount.value;
        let SubTitleString = subtitleTextWordsAmount.value;
        let keyWordsString = keyWordsAmount.value;
        let allStrings = titleString + " " + SubTitleString + " " + keyWordsString;
        let regEx = (/\s|\,/);
        splitString(allStrings, regEx);
        //replace all spaces to ','
        let newString = finalString.replace(/\s|\,/gi,",")
        console.log(newString);
        //added new empty Array 
        let arr = [];
        let newArr = arr.push(newString)
        // arr.push = newString;
        console.log(arr);
        
    }
});


// stringArray = function () {
//     console.log(`stringArray is :  ${allTextFromAllTextArea.value}`);
// }
// stringArray();

// module.exports = {
//      titleTextWordsAmount,
//      titleTextCharactersAmount,
//      subtitleTextWordsAmount,
//      subtitleTextCharactersAmount,
//      keyWordsAmount,
//      keyWordsCharactersAmount
// };