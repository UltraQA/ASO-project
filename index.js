import {TitleArea} from './src/js/appStore/title.js';
import {SubTitle} from './src/js/appStore/subTitle.js';
import {KeyWords} from './src/js/appStore/keyWords.js';
import {DuplicatesArea} from './src/js/appStore/duplicatesArea.js';
import {Logic} from './src/js/logic.js';
import {NavBar} from "./src/js/navBar.js";
import {DeepLinks} from "./src/js/deepLinks.js"
import {NameField} from "./src/js/googlePlay/nameField.js";
import {Log} from "./src/js/log.js";
import {Description} from "./src/js/googlePlay/description.js";
import {ShortDescription} from "./src/js/googlePlay/shortDescription.js";
//App Store
TitleArea.addWordsAmount();
SubTitle.addWordsAmount();
KeyWords.addWordsAmount();

Logic.setMaxLengthForTextArea(TitleArea.titleElement, 30, TitleArea.titleCharacters);
Logic.setMaxLengthForTextArea(SubTitle.subTitle, 30, SubTitle.subTitleCharacters);
Logic.setMaxLengthForTextArea(KeyWords.keyWords, 100, KeyWords.keyWordsCharacters);

//Google Play
NameField.addWordsAmount();
Description.addWordsAmount();
ShortDescription.addWordsAmount();

Logic.setMaxLengthForTextArea(NameField.nameField, 30, NameField.nameCharacterAmount);
Logic.setMaxLengthForTextArea(ShortDescription.shortDescription, 80, ShortDescription.shortDescriptionChar);
Logic.setMaxLengthForTextArea(Description.description, 4000, Description.descriptionChar);

DuplicatesArea.showDuplicatesButton.addEventListener('click', () => {
    DuplicatesArea.cleanDuplicatesArea(DuplicatesArea.duplicatesArea);
    Logic.showDuplicatesForAllAreas(
        TitleArea.titleElement,
        SubTitle.subTitle,
        KeyWords.keyWords
    );
});

//App Store
DuplicatesArea.cleanAllTextAreasButton.addEventListener('click', () => {
    DuplicatesArea.cleanTextArea(TitleArea.titleElement);
    DuplicatesArea.cleanTextArea(SubTitle.subTitle);
    DuplicatesArea.cleanTextArea(KeyWords.keyWords);

    TitleArea.cleanTitleWordsAmount()
    TitleArea.cleanCharacterArea();

    SubTitle.cleanSubTitleWordsAmount();
    SubTitle.cleanCharacterArea();

    KeyWords.cleanKeyWordsAmount();
    KeyWords.cleanCharacterArea();

    DuplicatesArea.cleanDuplicatesArea(DuplicatesArea.duplicatesArea);
});

//Google Play
DuplicatesArea.showDuplicatesButtonGP.addEventListener('click', () => {
    DuplicatesArea.cleanDuplicatesArea(DuplicatesArea.duplicatesAreaGP);
    Logic.showDuplicatesForAllAreas(
        NameField.nameField,
        ShortDescription.shortDescription,
        Description.description,
        'Google Play'
    );
});

DuplicatesArea.cleanAllTextAreasButtonGP.addEventListener('click', () => {
    DuplicatesArea.cleanTextArea(NameField.nameField);
    DuplicatesArea.cleanTextArea(ShortDescription.shortDescription);
    DuplicatesArea.cleanTextArea(Description.description);

    NameField.cleanNameWordsAmount();
    NameField.cleanNameCharacters();

    ShortDescription.cleanShortDescriptionWordsAmount();
    ShortDescription.cleanShortDescriptionCharacters();

    Description.cleanDescriptionWords();
    Description.cleanDescriptionCharacter();

    DuplicatesArea.cleanDuplicatesArea(DuplicatesArea.duplicatesAreaGP);
})

//NavBar
NavBar.googlePlay.addEventListener('click', () => {
    NavBar.changeVisibilityToGooglePlay();
})
NavBar.appStore.addEventListener('click', () => {
    NavBar.changeVisibilityToAppStore();
})

NavBar.deepLinks.addEventListener('click', () => {
    NavBar.changeVisibilityToDeepLinks();
})
//DeepLinks
DeepLinks.generateLinkBtn.addEventListener('click', () => {
    console.log(DeepLinks.getRawLink());
    DeepLinks.generateYouTubeDeepLink(DeepLinks.getRawLink());
})


// Usage example
// const youtubeUrl = "https://www.youtube.com/watch?v=abc123";
// generateYouTubeDeepLink(youtubeUrl);