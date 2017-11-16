/*
 * Cyrillic to Latin and vice versa converter
 *
 * /// Example ///
 *
 *   jQuery("body").CyrLatConverter() : trigger last transliteration used, from the cookie
 *   jQuery("body").CyrLatConverter('default') : show original transliteration
 *   jQuery("body").CyrLatConverter('L2C') : trigger transliteration to Cyrillic
 *   jQuery("body").CyrLatConverter('C2L') : trigger transliteration to Latin
 *   jQuery("body").CyrLatConverter({options}) : initialize plugin with values from one of the options bellow
 *
 * ************************************************************************************
 * This software is free to use for personal, company internal or commercial purposes.
 *
 * You may not resell this software, and attribution to the author must remain.
 * Backlink is desirable, you can show backlink to the:
 *   www.ivebe.com
 * or
 *   www.ivebe.com/blog/cyrillic-to-latin-and-latin-to-cyrillic-jquery-plugin.html
 * ************************************************************************************
 *
 * Copyright [2017] [Danijel Petrovic]
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @author Danijel Petrovic
 * @copyright Danijel Petrovic, www.ivebe.com, 2017
 * @version 0.7.0
 */

'use strict';

(function (jQuery) {
    let config = {
        cookieDuration: 7,
        parentClassToIgnore: '',
        permalinkHashLat: "#lat",
        permalinkHashCyr: "#cyr",
        usePermalinkHash: false,
        ignoreListIncludeUnicode: true,
        benchmark: false,
        benchmarkEval: "console.log('Execution time: %s%')",
        onClickCyr: '',
        onClickLat: '',
        onClickDefault: ''
    };

    let SELECTOR = 'body';
    let start;

    let Lat2Cyr = {
        "a": "а",
        "b": "б",
        "c": "ц",
        "d": "д",
        "e": "е",
        "f": "ф",
        "g": "г",
        "h": "х",
        "i": "и",
        "j": "ј",
        "k": "к",
        "l": "л",
        "m": "м",
        "n": "н",
        "o": "о",
        "p": "п",
        "q": "",
        "r": "р",
        "s": "с",
        "t": "т",
        "u": "у",
        "v": "в",
        "w": "",
        "x": "",
        "y": "",
        "z": "з",

        "A": "А",
        "B": "Б",
        "C": "Ц",
        "D": "Д",
        "E": "Е",
        "F": "Ф",
        "G": "Г",
        "H": "Х",
        "I": "И",
        "J": "Ј",
        "K": "К",
        "L": "Л",
        "M": "М",
        "N": "Н",
        "O": "О",
        "P": "П",
        "Q": "",
        "R": "Р",
        "S": "С",
        "T": "Т",
        "U": "У",
        "V": "В",
        "W": "",
        "X": "",
        "Y": "",
        "Z": "З",

        "č": "ч",
        "ć": "ћ",
        "đ": "ђ",
        "ž": "ж",
        "š": "ш",

        "Č": "Ч",
        "Ć": "Ћ",
        "Đ": "Ђ",
        "Ž": "Ж",
        "Š": "Ш"
    };

    let Cyr2Lat = {
        "а": "a",
        "б": "b",
        "ц": "c",
        "д": "d",
        "е": "e",
        "ф": "f",
        "г": "g",
        "х": "h",
        "и": "i",
        "ј": "j",
        "к": "k",
        "л": "l",
        "м": "m",
        "н": "n",
        "о": "o",
        "п": "p",
        "р": "r",
        "с": "s",
        "т": "t",
        "у": "u",
        "в": "v",
        "з": "z",

        "А": "A",
        "Б": "B",
        "Ц": "C",
        "Д": "D",
        "Е": "E",
        "Ф": "F",
        "Г": "G",
        "Х": "H",
        "И": "I",
        "Ј": "J",
        "К": "K",
        "Л": "L",
        "М": "M",
        "Н": "N",
        "О": "O",
        "П": "P",
        "Р": "R",
        "С": "S",
        "Т": "T",
        "У": "U",
        "В": "V",
        "З": "Z",

        "ч": "č",
        "ћ": "ć",
        "ж": "ž",
        "ш": "š",
        "љ": "lj",
        "њ": "nj",
        "ђ": "đ",
        "џ": "dz",

        "Ч": "Č",
        "Ћ": "Ć",
        "Ж": "Ž",
        "Ш": "Š",
        "Љ": "Lj",
        "Њ": "Nj",
        "Ђ": "Đ",
        "Џ": "Dž"
    };

    let Lat2Cyr_chained = {
        "l": {
            "j": "љ"
        },
        "n": {
            "j": "њ"
        },
        "d": {
            "j": "ђ",
            "z": "џ",
            "ž": "џ"
        },
        "L": {
            "j": "Љ",
            "J": "Љ"
        },
        "N": {
            "j": "Њ",
            "J": "Њ"
        },
        "D": {
            "j": "Ђ",
            "J": "Ђ",
            "z": "Џ",
            "Z": "Џ",
            "ž": "Џ",
            "Ž": "Џ"
        }
    };

    function hashCallback() {

        if (window.location.hash === config.permalinkHashLat)
            methods['C2L'].call(this);

        if (window.location.hash === config.permalinkHashCyr)
            methods['L2C'].call(this);
    }

    function initHash() {

        if (!("onhashchange" in window)) {

            let oldHref = location.href;
            setInterval(function () {
                let newHref = location.href;
                if (oldHref !== newHref) {
                    oldHref = newHref;
                    hashCallback();
                }
            }, 100);
        } else if (window.addEventListener) {
            window.addEventListener("hashchange", hashCallback, false);
        }
        else if (window.attachEvent) {
            window.attachEvent("onhashchange", hashCallback);
        }

        hashCallback();

        //if permalink is already set on page load (init hash function) we will return true so no translation is called from cookie.
        return window.location.hash === config.permalinkHashLat || window.location.hash === config.permalinkHashCyr
    }

    function setCookie(value) {
        let expires = "; ";
        if (config.cookieDuration) {
            let date = new Date();
            date.setDate(date.getDate() + config.cookieDuration);
            expires = "; expires=" + date.toUTCString() + "; ";
        }
        document.cookie = "CyrLatConverterSelected=" + value + expires + "path=/";
    }

    function getCookie() {
        let name = "CyrLatConverterSelected=";
        let c_arr = document.cookie.split(';');
        for (let i = 0; i < c_arr.length; i++) {
            let c = c_arr[i];
            while (c.charAt(0) === ' ')
                c = c.substring(1, c.length);

            if (c.indexOf(name) === 0)
                return c.substring(name.length, c.length);
        }
        return null;
    }

    /**
     * splitWords
     *
     * Cross browser function to split words and preserve delimiters.
     */
    function splitWords(str) {

        let pattern;

        if (config.ignoreListIncludeUnicode === true) //unicode for all cyrillic letters, and čČćĆžŽšŠđĐ
            pattern = "[^0-9a-zA-Z\u0400-\u04FF_\u010D\u010C\u0107\u0106\u017E\u017D\u0161\u0160\u0111\u0110]+";
        else //unicode for čČćĆžŽšŠđĐ
            pattern = "[^0-9a-zA-Z_\u010D\u010C\u0107\u0106\u017E\u017D\u0161\u0160\u0111\u0110]+";

        //test does browser natively support split with keeping delimiters.
        let test = "test string";
        if (test.split(/([^a-z])/).length === 3) {
            return str.split(new RegExp("(" + pattern + ")", "i"));
        }

        let regex = new RegExp(pattern, "gi");

        let i = 0;
        let matches = str.split(regex),
            separators = str.match(regex),
            ret = [];

        if (matches.length === 0)
            return separators;

        if (separators === null)
            return matches;

        if (separators.length === matches.length + 1) //separators from both sides
        {
            for (i = 0; i < matches.length; i++) {
                ret.push(separators[i]);
                ret.push(matches[i]);
            }
            ret.push(separators[i]);
        }
        else if (separators.length === matches.length) //separator from one of the sides
        {
            if (matches[0].indexOf(separators[0]) > -1) //separator is 1st
            {
                for (let i = 0; i < separators.length; i++) {
                    ret.push(separators[i]);
                    ret.push(matches[i]);
                }
            }
            else //separator is last
            {
                for (let i = 0; i < separators.length; i++) {
                    ret.push(matches[i]);
                    ret.push(separators[i]);
                }
            }
        }
        else //no separators from the sides
        {
            ret.push(matches[0]);
            for (i = 0; i < separators.length; i++) {
                ret.push(separators[i]);
                ret.push(matches[i + 1]);
            }
        }

        return ret;
    }
    /* End of splitWords */

    function replace_L2C(txt) {
        let value;
        let chainedFlag;
        let c2;
        let validDoubleChain;

        let words = splitWords(txt);

        //iterate through all words
        jQuery.each(words, function (i, w) {

            //if list of words to ignore exist...
            if ((typeof CyrLatIgnoreList !== 'undefined') && (w.toString().toLowerCase() in CyrLatIgnoreList))
                words[i] = CyrLatIgnoreList[w.toString().toLowerCase()] === '' ? w : CyrLatIgnoreList[w.toString().toLowerCase()];
            else {
                
                //check is this word in the CyrLatIgnore_doubleLetters list, if so, then it's not valid chain
                validDoubleChain = !(
                    typeof CyrLatIgnore_doubleLetters !== 'undefined' &&
                    CyrLatIgnore_doubleLetters.indexOf( w.toString().toLowerCase() ) > -1
                );

                //iterate through list of base words to ignore
                if (typeof CyrLatIgnore_doubleLettersBase !== 'undefined') {
                    jQuery.each(CyrLatIgnore_doubleLettersBase, function (i, base) {
                        if (w.toString().toLowerCase().indexOf(base) > -1) //ignore it
                        {
                            validDoubleChain = false;
                            return false;
                        }
                    });
                }

                //split words in letters...
                value = w.split('');

                jQuery.each(value, function (i, c) {
                    chainedFlag = false;

                    //if word should be double letters chained...
                    if (Lat2Cyr_chained[c] && validDoubleChain) {
                        c2 = value[i + 1];
                        if (c2 && Lat2Cyr_chained[c][c2]) {
                            value[i] = Lat2Cyr_chained[c][c2];
                            value[i + 1] = '';
                            chainedFlag = true;
                        }
                    }

                    if (!chainedFlag)
                        value[i] = (Lat2Cyr[c] && Lat2Cyr[c] !== "") ? Lat2Cyr[c] : c;
                });

                words[i] = value.join('');
            }

        });

        return words.join(''); //join with NO space, as spaces are preserved in split function.
    }

    function replace_C2L(txt) {

        let value;

        //if list of words to ifnore exist...
        if (typeof CyrLatIgnoreList !== 'undefined') {
            let words = splitWords(txt);

            //console.log(words);
            jQuery.each(words, function (i, w) {
                if (!(w.toString().toLowerCase() in CyrLatIgnoreList)) //if word not set in ignore list
                {
                    value = w.split('');

                    jQuery.each(value, function (i, c) {
                        value[i] = (Cyr2Lat[c] && Cyr2Lat[c] !== "") ? Cyr2Lat[c] : c;
                    });

                    words[i] = value.join('');
                }
                else
                    words[i] = CyrLatIgnoreList[w.toString().toLowerCase()] === '' ? w : CyrLatIgnoreList[w.toString().toLowerCase()];
            });

            return words.join(''); //join with NO space, as spaces are preserved in split function.
        }
        else // there's no ignore dictionary
        {
            value = txt.split('');

            jQuery.each(value, function (i, c) {
                value[i] = (Cyr2Lat[c] && Cyr2Lat[c] !== "") ? Cyr2Lat[c] : c;
            });

            return value.join('');
        }
    }

    function recursiveCheckParent(el) {

        let parentClassToIgnore = config.parentClassToIgnore.split(',');

        jQuery.each(parentClassToIgnore, function (i, c) {
            parentClassToIgnore[i] = jQuery.trim(c);
        });

        function scan(element) {
            while (element.parentNode) {
                if (element.className && jQuery.inArray(element.className, parentClassToIgnore) >= 0)
                    return true;

                element = element.parentNode;
            }
            return false;
        }

        return scan(el);
    }

    function convert_L2C(el) {

        jQuery(el).wrapInner('<span id="CyrLatWrap" />');

        jQuery(el).find(':not(iframe,script,style,pre,code,.CyrLatIgnore)').contents().filter(function () {
            if (this.nodeType === 3) {
                if (!recursiveCheckParent(this)) {
                    if (typeof this.textContent !== 'undefined')
                        this.textContent = replace_L2C(this.textContent);
                    else if (typeof this.innerText !== 'undefined')
                        this.innerText = replace_L2C(this.innerText);
                    else if (typeof this.nodeValue !== 'undefined')
                        this.nodeValue = replace_L2C(this.nodeValue);

                    return true;
                }
            }
            if (this.nodeType === 1 && typeof this.placeholder !== 'undefined') {
                if (!recursiveCheckParent(this)) {
                    this.placeholder = replace_L2C(this.placeholder);

                    return true;
                }
            }
            return false;
        });

        jQuery(el).find("#CyrLatWrap").contents().unwrap();
    }

    function convert_C2L(el) {

        jQuery(el).wrapInner('<span id="CyrLatWrap" />');

        jQuery(el).find(':not(iframe,script,style,pre,code,.CyrLatIgnore)').contents().filter(function () {
            if (this.nodeType === 3) {
                if (typeof this.textContent !== 'undefined')
                    this.textContent = replace_C2L(this.textContent);
                else if (typeof this.innerText !== 'undefined')
                    this.innerText = replace_C2L(this.innerText);
                else if (typeof this.nodeValue !== 'undefined')
                    this.nodeValue = replace_C2L(this.nodeValue);

                return true;
            }
            if (this.nodeType === 1 && typeof this.placeholder !== 'undefined') {
                if (!recursiveCheckParent(this)) {
                    this.placeholder = replace_C2L(this.placeholder);

                    return true;
                }
            }
            return false;
        });

        jQuery(el).find("#CyrLatWrap").contents().unwrap();
    }

    let initBenchmarkActive = false;
    let methods = {
        init: function (customSettings) {

            if (customSettings) {
                jQuery.extend(config, customSettings);
            }

            if (config.onClickCyr !== '') {
                jQuery(config.onClickCyr).click(function () {
                    jQuery(SELECTOR).CyrLatConverter('L2C');
                });
            }

            if (config.onClickLat !== '') {
                jQuery(config.onClickLat).click(function () {
                    jQuery(SELECTOR).CyrLatConverter('C2L');
                });
            }

            if (config.onClickDefault !== '') {
                jQuery(config.onClickDefault).click(function () {
                    jQuery(SELECTOR).CyrLatConverter('default');
                });
            }

            //start benchmark
            if (config.benchmark === true) {
                start = new Date().getTime();
                initBenchmarkActive = true;
            }

            let hash_set = false;
            if (config.usePermalinkHash === true) {
                hash_set = initHash(); //return hash translation status (translated or not)
            }

            let direction = '';
            if (config.cookieDuration > 0)
                direction = getCookie();

            if (hash_set === false && (direction === "L2C" || direction === "C2L")) {
                methods[direction].call(this);
            }

            //end benchmark
            if (config.benchmark === true) {
                eval(config.benchmarkEval.replace('%s%', (new Date().getTime() - start) + 'ms'));
                initBenchmarkActive = false;
            }

            return true;
        },
        L2C: function () {

            //start benchmark
            if (config.benchmark === true && !initBenchmarkActive)
                start = new Date().getTime();

            jQuery(SELECTOR).each(function () {
                convert_L2C(this);
            });
            setCookie('L2C');

            //end benchmark
            if (config.benchmark === true && !initBenchmarkActive)
                eval(config.benchmarkEval.replace('%s%', (new Date().getTime() - start) + 'ms'));

            if (typeof(config.onL2C) !== 'undefined') {
                config.onL2C.call();
            }
        },
        C2L: function () {

            //start benchmark
            if (config.benchmark === true && !initBenchmarkActive)
                start = new Date().getTime();

            jQuery(SELECTOR).each(function () {
                convert_C2L(this);
            });
            setCookie('C2L');

            //end benchmark
            if (config.benchmark === true && !initBenchmarkActive)
                eval(config.benchmarkEval.replace('%s%', (new Date().getTime() - start) + 'ms'));

            if (typeof(config.onC2L) !== 'undefined')
                config.onC2L.call();
        }
    };

    jQuery.fn.CyrLatConverter = function (method) {

        SELECTOR = this;

        if (typeof method === 'undefined' || typeof method === 'object' || !method) {
            methods.init.apply(this, arguments);
        }
        else if (method.toString().toLowerCase() === 'default') {
            setCookie('default'); //set to default, so no C2L or L2C will be called
            if (config.usePermalinkHash === true)
                window.location.hash = '';
            location.reload(true); //reload from server, not cache
            return;
        }
        else if (methods[method]) {
            if (config.usePermalinkHash === true) {
                if (method.toString().toUpperCase() === 'L2C')
                    window.location.hash = config.permalinkHashCyr;
                else if (method.toString().toUpperCase() === 'C2L')
                    window.location.hash = config.permalinkHashLat;
            }
            else
                methods[method].call(this);
        }
        else {
            jQuery.error('Unknown call to ' + method);
        }

        return this;
    };
})(jQuery);