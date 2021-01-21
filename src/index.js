let titleTextWordsAmount;
let titleTextCharactersAmount;
let subtitleTextWordsAmount;
let subtitleTextCharactersAmount;
let keyWordsAmount;
let keyWordsCharactersAmount;
let allTextFromAllTextArea;

titleTextWordsAmount = document.getElementById('titleText').addEventListener('input', () => {
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

titleTextCharactersAmount = document.getElementById('titleText').addEventListener('input', ()=>{
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

subtitleTextWordsAmount = document.getElementById('subTitleText').addEventListener('input', () => {
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

subtitleTextCharactersAmount = document.getElementById('subTitleText').addEventListener('input', ()=>{
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

keyWordsAmount = document.getElementById('keyWords').addEventListener('input', () => {
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

keyWordsCharactersAmount = document.getElementById('keyWords').addEventListener('input', ()=>{
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

allTextFromAllTextArea = document.getElementById('page').addEventListener('input', () => {
    let titleTextArea =  document.getElementById('titleText').value;
    let subTitleTextArea = document.getElementById('subTitleText').value;
    let keyWordsTextArea = document.getElementById('keyWords').value;
    let allTextArea = titleTextArea + subTitleTextArea + keyWordsTextArea;
    if (titleTextArea.length > 0 && subTitleTextArea.length > 0 && keyWordsTextArea.length > 0) {
        // console.log('%c%s',
        // 'color: white; background: #f44336; font-size: 16px;',`Here is Title Text: ${titleTextArea}`);
        // console.log('%c%s',
        // 'color: white; background: #f44336; font-size: 16px;',`Here is subTitleText Text: ${subTitleTextArea}`);
        // console.log('%c%s',
        // 'color: white; background: #f44336; font-size: 16px;',`Here is keyWords Text: ${keyWordsTextArea}`);
        console.log(`Text from ALL textareas: ${titleTextArea} ${subTitleTextArea} ${keyWordsTextArea}`);
        console.log(JSON.stringify(allTextArea));
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