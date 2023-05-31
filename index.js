import {TitleArea} from './src/js/title.js';
import {SubTitle} from './src/js/subTitle.js';
import {KeyWords} from './src/js/keyWords.js';
import {DuplicatesArea} from './src/js/duplicatesArea.js';
import {Logic} from './src/js/logic.js';
import {NavBar} from "./src/js/navBar.js";
import {DeepLinks} from "./src/js/deepLinks.js"

TitleArea.addWordsAmount();
SubTitle.addWordsAmount();
KeyWords.addWordsAmount();

Logic.setMaxLengthForTextArea(TitleArea.titleElement, 30, TitleArea.titleCharacters);
Logic.setMaxLengthForTextArea(SubTitle.subTitle, 30, SubTitle.subTitleCharacters);
Logic.setMaxLengthForTextArea(KeyWords.keyWords, 100, KeyWords.keyWordsCharacters);

KeyWords.showDuplicatesButton.addEventListener('click', () => {
    DuplicatesArea.cleanDuplicatesArea(DuplicatesArea.duplicatesArea);
    Logic.showDuplicatesForAllAreas(
        TitleArea.titleElement,
        SubTitle.subTitle,
        KeyWords.keyWords
    );
});

DuplicatesArea.cleanAllTextAreasButton.addEventListener('click', () => {
    DuplicatesArea.cleanTextArea(TitleArea.titleElement);
    DuplicatesArea.cleanTextArea(SubTitle.subTitle);
    DuplicatesArea.cleanTextArea(KeyWords.keyWords);

    TitleArea.cleanCharacterArea(TitleArea.titleCharacters);
    TitleArea.cleanTitleWordsAmount(TitleArea.titleWordsAmount);

    SubTitle.cleanCharacterArea(SubTitle.subTitleCharacters);
    SubTitle.cleanSubTitleWordsAmount(SubTitle.subTitleWordsAmount);

    KeyWords.cleanCharacterArea(KeyWords.keyWordsCharacters);
    KeyWords.cleanKeyWordsAmount(KeyWords.keyWordsAmount);

    DuplicatesArea.cleanDuplicatesArea(DuplicatesArea.duplicatesArea);
});

NavBar.googlePlay.addEventListener('click', () => {
    NavBar.changeVisibilityToGooglePlay();
})
NavBar.appStore.addEventListener('click', () => {
    NavBar.changeVisibilityToAppStore();
})

NavBar.deepLinks.addEventListener('click', () => {
    NavBar.changeVisibilityToDeepLinks();
})

DeepLinks.generateLinkBtn.addEventListener('click', () => {
    console.log(DeepLinks.getRawLink());
    DeepLinks.generateYouTubeDeepLink(DeepLinks.getRawLink());
})


// Usage example
// const youtubeUrl = "https://www.youtube.com/watch?v=abc123";
// generateYouTubeDeepLink(youtubeUrl);