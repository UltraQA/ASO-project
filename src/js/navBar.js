import {MainArea} from "./mainArea.js";


export class NavBar {
    static navBar = document.querySelector('#navBar');
    static appStore = document.querySelector('#appStoreTab');
    static googlePlay = document.querySelector('#googlePlayTab');
    static deepLinks = document.querySelector('#deepLinksTab');

    constructor() {
    }

    static changeVisibilityToAppStore() {
        this.appStore.classList.add('active');
        this.googlePlay.classList.remove('active');
        this.deepLinks.classList.remove('active');

        this.showAppStoreMainArea();
    }

    static changeVisibilityToGooglePlay() {
        this.googlePlay.classList.add('active');
        this.appStore.classList.remove('active');
        this.deepLinks.classList.remove('active');

        this.showGooglePlayMainArea();
    }

    static changeVisibilityToDeepLinks(){
        this.deepLinks.classList.add('active');
        this.googlePlay.classList.remove('active');
        this.appStore.classList.remove('active');

        this.showDeepLinkArea();
    }

    static showGooglePlayMainArea() {
        MainArea.mainAreaAppStore.classList.add('hidden');
        MainArea.deepLinkArea.classList.add('hidden');
        MainArea.mainAreaGooglePlay.classList.remove('hidden');
    }

    static showAppStoreMainArea(){
        MainArea.mainAreaGooglePlay.classList.add('hidden');
        MainArea.deepLinkArea.classList.add('hidden');
        MainArea.mainAreaAppStore.classList.remove('hidden');
    }

    static showDeepLinkArea(){
        MainArea.mainAreaGooglePlay.classList.add('hidden');
        MainArea.mainAreaAppStore.classList.add('hidden');
        MainArea.deepLinkArea.classList.remove('hidden');
    }
}