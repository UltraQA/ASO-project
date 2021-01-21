
let titleTextWordsAmount;
let titleTextCharactersAmount;
let subtitleTextWordsAmount;
let subtitleTextCharactersAmount;
let keyWordsAmount;
let keyWordsCharactersAmount;

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
        document.getElementById("titleCharacters").innerHTML = '<span style="background-color: #F48FB1;">'+textlength+' out of '+maxLength+' </span>';
        // document.getElementById("titleTextWords").innerHTML = '<h4 id="titleTextWords" style="color: red;">Title text</h4>';
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
        document.getElementById("SubTitleCharacters").innerHTML = '<span style="background-color: #F48FB1;">'+textlength+' out of '+maxLength+'</span>';
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
        document.getElementById("keyWordcharacters").innerHTML = '<span style="background-color: #F48FB1;">'+textlength+' out of '+maxLength+'</span>';
    }else{
        document.getElementById("keyWordcharacters").innerHTML = textlength+' out of '+maxLength;
    }
})
