export class Logic {
    constructor() {
    }

    static wordsAmount(textField, separator, separator2 = separator) {
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

    static maxLengthOfCharactersAmount(maxFieldLength, textFieldLength, elementId) {
        let textLength = textFieldLength.value.length;
        if (textLength > maxFieldLength) {
            return elementId.innerHTML = '<span style="background-color: #f44336; color: white">' + textLength + ' out of ' + maxFieldLength + '</span>';
        } else {
            return elementId.innerHTML = textLength + ' out of ' + maxFieldLength;
        }
    };

    static setMaxLengthForTextArea(textArea, maxLength, charactersField) {
        textArea.addEventListener('input', () => {
            this.maxLengthOfCharactersAmount(maxLength, textArea, charactersField);
        });
    }

    static splitString(str) {
        const array = str.split(',');
        let maxLength = 0;
        for (let i = 0; i < array.length; i++) {
            if (array[i].length > maxLength) {
                maxLength = array[i].length;
            }
        }
        return array;
    }

    static showDuplicatesForAllAreas(firstFiled, secondField, thirdField, store) {
        let duplicatesText;
        // Get the text from the three textarea elements
        const textArea1 = firstFiled;
        const textArea2 = secondField;
        const textArea3 = thirdField;
        const text1 = textArea1.value;
        const text2 = textArea2.value;
        const text3 = textArea3.value;

        // Combine the text from the three textAreas into one string
        const text = text1 + ' ' + text2 + ' ' + text3;

        // Split the text into an array of words
        const words = text.split(/[\s\p{P}]+/u);

        // Create a Set to store unique words
        const uniqueWords = new Set();

        // Create an object to store the frequency of each word
        const wordFrequency = {};

        // Loop through the words and check for duplicates
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            if (uniqueWords.has(word)) {
                if (wordFrequency[word]) {
                    wordFrequency[word]++;
                } else {
                    wordFrequency[word] = 2;
                }
            } else {
                uniqueWords.add(word);
            }
        }

        // Output the duplicate words and their frequency
        const duplicates = Object.entries(wordFrequency).filter(entry => entry[1] > 1);
        if (duplicates.length > 0) {
            // console.log('Duplicate words found:');
            duplicates.forEach(([word, frequency]) => {
                if (word === '') {
                    console.log(`No Duplicates yet!`);
                } else {
                    if (store !== 'Google Play') {
                        duplicatesText = document.querySelector('#amountDuplicatesItems');
                    } else {
                        duplicatesText = document.querySelector('#amountDuplicatesItemsGP');
                    }
                    duplicatesText.innerHTML += `<span style="font-size: 24px; color: #000000">` + word + '(' + frequency + ') ';

                    console.log(`"${word}" appears ${frequency} times`);
                }
            });
        } else {
            console.log('No duplicate words found.');
        }

    }

    static cleanWordsAmount(id){
        return id.innerHTML = '0'
    }

    static cleanCharacterArea(area) {
        area.innerHTML = '0 out of 100'
    }
}