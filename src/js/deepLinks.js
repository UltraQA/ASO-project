export class DeepLinks {
    static generateLinkBtn = document.querySelector('#generateLink');
    static rawLinkInput = document.querySelector('#rawLink');
    static readyShortLinkInput = document.querySelector('#cockedLinkShort');
    static readyLinkInput = document.querySelector('#cockedLink');
    static readyLinkAndroidInput = document.querySelector('#cockedLinkAndroid');

    constructor() {
    }

    static getRawLink() {
        return this.rawLinkInput.value;
    }

    static generateYouTubeDeepLink(url) {
        const videoId = this.extractYouTubeVideoId(url);

        if (videoId) {
            const deepLink = `youtube://watch?v=${videoId}`;
            const shortLink = `https://youtu.be/${videoId}`;
            const androidLink = this.extractAndroidLink(deepLink);

            console.log("Generated Deep Link:", deepLink);
            console.log("Shortened Link:", shortLink);
            console.log("Android Link:", shortLink);

            this.readyLinkInput.value = deepLink;
            this.readyShortLinkInput.value = shortLink;
            this.readyLinkAndroidInput.value = androidLink;

            const userAgent = navigator.userAgent;
            // if (this.isAndroid(userAgent)) {
            //     this.openAndroidApp(deepLink);
            // } else if (this.isIOS(userAgent)) {
            //     this.openIOSApp(deepLink);
            // } else {
            //     this.openURLInNewTab(shortLink);
            // }
        } else {
            console.log("Invalid YouTube URL");
        }
    }

    static extractYouTubeVideoId(url) {
        const match = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|youtu\.be\/|embed\/|.*[?&]vi=|.*[?&]v%3D))([^"&?/ ]{11})/);
        return match ? match[1] : null;
    }

    static extractAndroidLink(deepLink) {
        const androidAppPackage = "com.google.android.youtube";
        const androidIntentUrl = `intent://${deepLink}#Intent;package=${androidAppPackage};scheme=${deepLink};end;`;
        return androidIntentUrl;
    }

    static isAndroid(userAgent) {
        return /Android/i.test(userAgent);
    }

    static isIOS(userAgent) {
        return /iPhone|iPad|iPod/i.test(userAgent);
    }

    static openAndroidApp(deepLink) {
        // Replace with the Android app package name or custom URL scheme
        const androidAppPackage = "com.google.android.youtube";
        const androidIntentUrl = `intent://${deepLink}#Intent;package=${androidAppPackage};scheme=${deepLink};end;`;
        window.location.href = androidIntentUrl;
    }

    static openIOSApp(deepLink) {
        window.location.href = deepLink;
    }

    static openURLInNewTab(url) {
        const newTab = window.open(url, '_blank');
        newTab.focus();
    }

}