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

    static generateYouTubeDeepLink(input) {
        const videoId = this.extractYouTubeVideoId(input);
        const timeSuffix = this.extractTimestampSuffix(input); // like &t=123s or ''
        const timeQuery = this.extractTimestampQuery(input);   // like ?t=123s or '' (for full https URLs)

        if (videoId) {
            // iOS/Universal link: use full https watch URL to trigger Universal Links in Safari and Chrome on iOS
            const deepLink = `https://www.youtube.com/watch?v=${videoId}` + (timeQuery ? timeQuery : '');

            // Short link for sharing/opening in browser
            const shortLink = `https://youtu.be/${videoId}` + (timeQuery ? timeQuery : '');

            // Android intent with https scheme and full authority; use full https fallback
            const androidLink = this.buildAndroidIntent(videoId, `https://www.youtube.com/watch?v=${videoId}${timeQuery ? timeQuery : ''}`);

            console.log("iOS/Universal Link:", deepLink);
            console.log("Short Link:", shortLink);
            console.log("Android Intent Link:", androidLink);

            this.readyLinkInput.value = deepLink;
            this.readyShortLinkInput.value = shortLink;
            this.readyLinkAndroidInput.value = androidLink;

            const userAgent = navigator.userAgent;
            // if (this.isAndroid(userAgent)) {
            //     this.openAndroidApp(videoId);
            // } else if (this.isIOS(userAgent)) {
            //     this.openIOSApp(deepLink);
            // } else {
            //     this.openURLInNewTab(shortLink);
            // }
        } else {
            console.log("Invalid YouTube URL");
        }
    }

    static extractYouTubeVideoId(input) {
        if (!input) return null;
        try {
            const url = new URL(input.trim());
            const host = url.hostname.replace(/^www\./i, '').toLowerCase();
            if (host === 'youtu.be') {
                // Path: /VIDEOID
                const id = url.pathname.split('/').filter(Boolean)[0] || '';
                return this.validateYouTubeId(id);
            }
            if (host === 'youtube.com' || host.endsWith('.youtube.com')) {
                // Standard watch URL: v param
                const v = url.searchParams.get('v');
                if (v) return this.validateYouTubeId(v);
                // Shorts: /shorts/VIDEOID
                const parts = url.pathname.split('/').filter(Boolean);
                const shortsIdx = parts.indexOf('shorts');
                if (shortsIdx !== -1 && parts[shortsIdx + 1]) {
                    return this.validateYouTubeId(parts[shortsIdx + 1]);
                }
                // Embed: /embed/VIDEOID
                const embedIdx = parts.indexOf('embed');
                if (embedIdx !== -1 && parts[embedIdx + 1]) {
                    return this.validateYouTubeId(parts[embedIdx + 1]);
                }
            }
        } catch (e) {
            // Not a URL; try regex fallback (e.g., raw ID)
            const maybeId = (input || '').trim();
            return this.validateYouTubeId(maybeId);
        }
        return null;
    }

    static validateYouTubeId(id) {
        if (!id) return null;
        const clean = id.replace(/[^0-9A-Za-z_-]/g, '').slice(0, 11);
        return clean.length === 11 ? clean : null;
    }

    static parseTimeToSeconds(t) {
        if (!t) return 0;
        // Accept formats like 90, 90s, 1m30s, 1h2m3s
        if (/^\d+$/.test(t)) return parseInt(t, 10);
        let total = 0;
        const h = /([0-9]+)h/.exec(t);
        const m = /([0-9]+)m/.exec(t);
        const s = /([0-9]+)s?/.exec(t.replace(/.*([0-9]+s).*/, '$1'));
        if (h) total += parseInt(h[1], 10) * 3600;
        if (m) total += parseInt(m[1], 10) * 60;
        if (!h && !m) {
            // If only seconds provided possibly with s
            const onlyS = /^([0-9]+)s$/.exec(t);
            if (onlyS) total += parseInt(onlyS[1], 10);
        } else if (s) {
            total += parseInt(s[1], 10);
        }
        if (!isFinite(total)) return 0;
        return total;
    }

    static extractTimestampSuffix(input) {
        // returns string starting with & like &t=123s or ''
        try {
            const url = new URL((input || '').trim());
            const sp = url.searchParams;
            let t = sp.get('t') || sp.get('start') || '';
            if (!t && url.hash) {
                const hash = url.hash.replace(/^#/, '');
                const m = /(?:t=|start=)([^&]+)/.exec(hash);
                if (m) t = m[1];
            }
            const sec = this.parseTimeToSeconds(t);
            return sec > 0 ? `&t=${sec}s` : '';
        } catch (e) {
            return '';
        }
    }

    static extractTimestampQuery(input) {
        // returns string starting with ? like ?t=123s or ''
        const suf = this.extractTimestampSuffix(input);
        return suf ? suf.replace(/^&/, '?') : '';
    }

    static buildAndroidIntent(videoId, fallbackUrl) {
        const androidAppPackage = 'com.google.android.youtube';
        // Use https scheme with full authority to improve Android intent reliability
        const scheme = 'https';
        const authorityAndPath = `www.youtube.com/watch?v=${videoId}`;
        const fallback = encodeURIComponent(fallbackUrl || `https://www.youtube.com/watch?v=${videoId}`);
        return `intent://${authorityAndPath}#Intent;scheme=${scheme};package=${androidAppPackage};S.browser_fallback_url=${fallback};end;`;
    }

    static isAndroid(userAgent) {
        return /Android/i.test(userAgent);
    }

    static isIOS(userAgent) {
        return /iPhone|iPad|iPod/i.test(userAgent);
    }

    static openAndroidApp(videoId) {
        const url = this.buildAndroidIntent(videoId);
        window.location.href = url;
    }

    static openIOSApp(deepLink) {
        window.location.href = deepLink;
    }

    static openURLInNewTab(url) {
        const newTab = window.open(url, '_blank');
        if (newTab && typeof newTab.focus === 'function') {
            newTab.focus();
        }
    }

}
