export class Logic {
    constructor() {
    }

    // Count words using a simple split; kept for legacy counters
    static wordsAmount(textField, separator, separator2 = separator) {
        let textValue = textField.value || '';
        let count = 0;
        let split = textValue.split(separator || separator2);
        for (let i = 0; i < split.length; i++) {
            if (split[i] !== '') {
                count++;
            }
        }
        return count;
    };

    static maxLengthOfCharactersAmount(maxFieldLength, textFieldLength, elementId) {
        const textLength = (textFieldLength.value || '').length;
        if (textLength > maxFieldLength) {
            return elementId.innerHTML = '<span style="background-color: #f44336; color: white">' + textLength + ' out of ' + maxFieldLength + '</span>';
        } else {
            return elementId.innerHTML = textLength + ' out of ' + maxFieldLength;
        }
    };

    static setMaxLengthForTextArea(textArea, maxLength, charactersField) {
        // Enforce platform-specific max length on the actual field
        if (textArea && typeof maxLength === 'number') {
            try { textArea.maxLength = maxLength; } catch (e) {}
        }
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

    // Unicode-aware duplicate detection and inline highlighting
    static showDuplicatesForAllAreas(firstFiled, secondField, thirdField, store) {
        let duplicatesText;
        // Get the text from the three textarea elements
        const textArea1 = firstFiled;
        const textArea2 = secondField;
        const textArea3 = thirdField;
        const text1 = textArea1.value || '';
        const text2 = textArea2.value || '';
        const text3 = textArea3.value || '';

        // Combine the text from the three textAreas into one string
        const text = (text1 + ' ' + text2 + ' ' + text3).normalize('NFC');

        // Tokenize to Unicode-aware tokens (words + standalone characters like CJK and emoji)
        const tokens = Logic.tokenizeUnicode(text);

        // Count frequencies (case-insensitive for caseful scripts)
        const freq = new Map();
        for (const t of tokens) {
            if (!t) continue;
            const key = Logic.normalizeToken(t);
            if (!key) continue;
            freq.set(key, (freq.get(key) || 0) + 1);
        }

        // Duplicates are tokens with frequency > 1
        const duplicatesKeys = new Set(Array.from(freq.entries()).filter(([, c]) => c > 1).map(([k]) => k));

        // Output the duplicate tokens and their frequency
        if (duplicatesKeys.size > 0) {
            if (store !== 'Google Play') {
                duplicatesText = document.querySelector('#amountDuplicatesItems');
            } else {
                duplicatesText = document.querySelector('#amountDuplicatesItemsGP');
            }
            // Clear area before appending (safety)
            if (duplicatesText) duplicatesText.innerHTML = '';

            // Build a readable list (use original casing where possible)
            const shown = new Set();
            for (const [raw, count] of freq.entries()) {
                if (count > 1 && !shown.has(raw)) {
                    const display = raw;
                    duplicatesText.innerHTML += `<span style="font-size: 18px; color: #000000; margin-right:8px">${Logic.escapeHtml(display)} (${count})</span>`;
                    shown.add(raw);
                }
            }
        } else {
            if (store !== 'Google Play') {
                duplicatesText = document.querySelector('#amountDuplicatesItems');
            } else {
                duplicatesText = document.querySelector('#amountDuplicatesItemsGP');
            }
            if (duplicatesText) duplicatesText.innerHTML = '<span style="color:#555">No duplicates</span>';
        }

        // Apply inline highlighting in each field
        Logic.applyHighlightToField(textArea1, duplicatesKeys);
        Logic.applyHighlightToField(textArea2, duplicatesKeys);
        Logic.applyHighlightToField(textArea3, duplicatesKeys);
    }

    // Normalize a token for counting: NFC and lowercase for caseful scripts
    static normalizeToken(token) {
        if (!token) return '';
        const n = token.normalize('NFC');
        // Lowercase where applicable (won't affect CJK/emoji)
        return n.toLocaleLowerCase();
    }

    // Tokenization: build words for letter/number sequences; treat Han and emoji as standalone
    static tokenizeUnicode(text) {
        const clusters = Logic.segmentGraphemes(text);
        const tokens = [];
        let buffer = '';
        const flushBuffer = () => {
            if (buffer) {
                tokens.push(buffer);
                buffer = '';
            }
        };
        for (const g of clusters) {
            if (Logic.isSeparator(g)) {
                flushBuffer();
                continue;
            }
            if (Logic.isHan(g) || Logic.isEmoji(g)) {
                flushBuffer();
                tokens.push(g);
                continue;
            }
            if (Logic.isWordChar(g)) {
                buffer += g;
                continue;
            }
            // Any other symbol: treat as separator
            flushBuffer();
        }
        flushBuffer();
        return tokens;
    }

    static segmentGraphemes(text) {
        if (typeof Intl !== 'undefined' && Intl.Segmenter) {
            try {
                const seg = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
                return Array.from(seg.segment(text), s => s.segment);
            } catch (e) {}
        }
        // Fallback naive split (not perfect, but reasonable)
        return Array.from(text);
    }

    static isSeparator(g) {
        return /[\p{Z}\s\p{P}]/u.test(g);
    }

    static isWordChar(g) {
        return /[\p{L}\p{N}\p{M}_]/u.test(g);
    }

    static isHan(g) {
        return /\p{Script=Han}/u.test(g);
    }

    static isEmoji(g) {
        // Basic emoji detection using Unicode property and ranges
        return /\p{Emoji_Presentation}|\p{Extended_Pictographic}/u.test(g);
    }

    static applyHighlightToField(textArea, duplicatesKeys) {
        if (!textArea) return;
        const text = (textArea.value || '').normalize('NFC');
        const highlightedHtml = Logic.renderHighlightedHtml(text, duplicatesKeys);
        Logic.ensureMirror(textArea);
        const mirror = textArea._highlightMirror;
        if (mirror) {
            mirror.innerHTML = highlightedHtml;
        }
        // Add class to make textarea text transparent but keep caret visible
        textArea.classList.add('with-highlight');
        // Sync scroll left/top
        mirror.scrollTop = textArea.scrollTop;
        mirror.scrollLeft = textArea.scrollLeft;
        // Attach scroll sync if not attached
        if (!textArea._scrollSyncAttached) {
            textArea.addEventListener('scroll', () => {
                if (textArea._highlightMirror) {
                    textArea._highlightMirror.scrollTop = textArea.scrollTop;
                    textArea._highlightMirror.scrollLeft = textArea.scrollLeft;
                }
            });
            textArea._scrollSyncAttached = true;
        }
    }

    static renderHighlightedHtml(text, duplicatesKeys) {
        const clusters = Logic.segmentGraphemes(text);
        let html = '';
        let buffer = '';
        const flushWord = () => {
            if (buffer) {
                const key = Logic.normalizeToken(buffer);
                if (duplicatesKeys.has(key)) {
                    html += '<mark>' + Logic.escapeHtml(buffer) + '</mark>';
                } else {
                    html += Logic.escapeHtml(buffer);
                }
                buffer = '';
            }
        };
        for (const g of clusters) {
            if (Logic.isSeparator(g)) {
                flushWord();
                html += Logic.escapeHtml(g);
                continue;
            }
            if (Logic.isHan(g) || Logic.isEmoji(g)) {
                flushWord();
                const key = Logic.normalizeToken(g);
                if (duplicatesKeys.has(key)) {
                    html += '<mark>' + Logic.escapeHtml(g) + '</mark>';
                } else {
                    html += Logic.escapeHtml(g);
                }
                continue;
            }
            if (Logic.isWordChar(g)) {
                buffer += g;
                continue;
            }
            // Other
            flushWord();
            html += Logic.escapeHtml(g);
        }
        flushWord();
        // Ensure trailing newline renders properly
        if (text.endsWith('\n')) html += '<br />';
        return html;
    }

    static escapeHtml(s) {
        return s
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    static ensureMirror(textArea) {
        if (textArea._highlightMirror) return;
        const parent = textArea.parentElement || textArea;
        // Ensure parent is positioned
        if (!parent.classList.contains('input-field')) {
            parent.style.position = 'relative';
        } else {
            // Let CSS handle .input-field positioning
        }
        const mirror = document.createElement('div');
        mirror.className = 'highlight-mirror';
        // Position mirror to overlap textarea content
        const style = mirror.style;
        style.position = 'absolute';
        style.top = '0';
        style.left = '0';
        style.right = '0';
        style.bottom = '0';
        style.whiteSpace = 'pre-wrap';
        style.wordWrap = 'break-word';
        style.overflow = 'auto';
        style.pointerEvents = 'none';
        style.padding = getComputedStyle(textArea).padding;
        style.borderRadius = getComputedStyle(textArea).borderRadius;
        style.font = getComputedStyle(textArea).font;
        style.lineHeight = getComputedStyle(textArea).lineHeight;
        // Mirror text should be visible; match textarea color
        style.color = getComputedStyle(textArea).color;
        // Insert mirror just before textarea so it renders beneath
        parent.insertBefore(mirror, textArea);
        // Bring textarea to front
        textArea.style.backgroundColor = 'transparent';
        textArea.style.position = 'relative';
        textArea.style.zIndex = '1';
        // Keep a reference and size sync
        textArea._highlightMirror = mirror;
        // Sync mirror size and scroll on input changes
        const sync = () => {
            mirror.scrollTop = textArea.scrollTop;
            mirror.scrollLeft = textArea.scrollLeft;
            mirror.style.height = getComputedStyle(textArea).height;
            mirror.style.width = getComputedStyle(textArea).width;
        };
        sync();
        const ro = new ResizeObserver(sync);
        ro.observe(textArea);
        textArea._resizeObserver = ro;
    }

    static clearHighlights(textArea) {
        if (!textArea) return;
        if (textArea._highlightMirror) {
            textArea._highlightMirror.innerHTML = Logic.escapeHtml(textArea.value || '');
        }
        textArea.classList.remove('with-highlight');
    }

    static cleanWordsAmount(id){
        return id.innerHTML = '0'
    }

    static cleanCharacterArea(area) {
        area.innerHTML = '0 out of 100'
    }
}
