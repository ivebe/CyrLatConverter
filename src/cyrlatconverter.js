/*
 * Cyrillic to Latin and vice versa converter
 *
 * /// Example ///


  var CyrLat = new CyrLatConverter('body').init({
	onClickCyr: '#cirilica',
    onClickLat: '#latinica',
  });


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
 * Copyright [2018] [Danijel Petrovic]
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
 * @copyright Danijel Petrovic, www.ivebe.com, 2018
 * @version 1.0.0
 */
( function( root, factory ) {

    let pluginName = 'CyrLatConverter';

    if ( typeof define === 'function' && define.amd ) {
        define( [], factory( pluginName ) );
    } else if ( typeof exports === 'object' ) {
        module.exports = factory( pluginName );
    } else {
        root[ pluginName ] = factory( pluginName );
    }
}( typeof self !== 'undefined' ? self : this, function() {

    'use strict';

    let defaults = {
        cookieDuration: 0,
        ignoreClasses: [],
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
    let initBenchmarkActive = false;

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

    /**
     * Merge defaults with user options
     */
    let extend = function( target, options ) {
        let prop, extended = {};
        for ( prop in defaults ) {
            if ( Object.prototype.hasOwnProperty.call( defaults, prop ) ) {
                extended[ prop ] = defaults[ prop ];
            }
        }
        for ( prop in options ) {
            if ( Object.prototype.hasOwnProperty.call( options, prop ) ) {
                extended[ prop ] = options[ prop ];
            }
        }
        return extended;
    };

    /**
     * Plugin Object
     * @constructor
     */
    function CyrLatConverter( selector ) {

        this.SELECTOR = selector;
    }

    /**
     * Plugin prototype
     * @public
     * @constructor
     */
    CyrLatConverter.prototype = {

        init: function(config) {

            this.config = extend( defaults, config );
            let $this = this;


            if(!Array.isArray(this.config.ignoreClasses))
                console.error('Parameter "ignoreClasses" must be an array of classes to ignore.');


            if (this.config.onClickCyr !== '') {
                document.querySelectorAll(this.config.onClickCyr).forEach(function(el){
                    el.addEventListener('click', function(){
                        $this.L2C($this.SELECTOR);
                    }, false)
                });
            }

            if (this.config.onClickLat !== '') {
                document.querySelectorAll(this.config.onClickLat).forEach(function(el){
                    el.addEventListener('click', function(){
                        $this.C2L($this.SELECTOR);
                    }, false)
                });
            }

            if (this.config.onClickDefault !== '') {
                document.querySelectorAll(this.config.onClickDefault).forEach(function(el){
                    el.addEventListener('click', function(){
                        $this.Default($this.SELECTOR);
                    }, false)
                });
            }

            //start benchmark
            if (this.config.benchmark === true) {
                start = new Date().getTime();
                initBenchmarkActive = true;
            }

            let hash_set = false;
            if (this.config.usePermalinkHash === true) {
                hash_set = initHash.call(this); //return hash translation status (translated or not)
            }

            let direction = '';
            if (this.config.cookieDuration > 0)
                direction = getCookie.call(this);

            if (hash_set === false && direction === "L2C") {
                this.L2C(SELECTOR);
            }

            if (hash_set === false && direction === "C2L") {
                this.C2L(SELECTOR);
            }

            //end benchmark
            if (this.config.benchmark === true) {
                eval(this.config.benchmarkEval.replace('%s%', (new Date().getTime() - start) + 'ms'));
                initBenchmarkActive = false;
            }

            return $this;
        },

        C2L: function( selector ) {

            if(typeof(selector) !== 'undefined')
                this.SELECTOR = selector;

            let $this = this;

            //start benchmark
            if (this.config.benchmark === true && !initBenchmarkActive)
                start = new Date().getTime();

            document.querySelectorAll(this.SELECTOR).forEach(function(el){
                convert_C2L.call($this, el);
            });

            if (this.config.cookieDuration > 0)
                setCookie.call($this, 'C2L');

            //end benchmark
            if (this.config.benchmark === true && !initBenchmarkActive)
                eval(this.config.benchmarkEval.replace('%s%', (new Date().getTime() - start) + 'ms'));

            if (typeof(this.config.onC2L) !== 'undefined')
                this.config.onC2L.call();

            return $this;
        },

        L2C: function( selector ) {

            if(typeof(selector) !== 'undefined')
                this.SELECTOR = selector;

            let $this = this;

            //start benchmark
            if (this.config.benchmark === true && !initBenchmarkActive)
                start = new Date().getTime();

            document.querySelectorAll(this.SELECTOR).forEach(function(el){
                convert_L2C.call($this, el);
            });

            if (this.config.cookieDuration > 0)
                setCookie.call($this, 'L2C');

            //end benchmark
            if (this.config.benchmark === true && !initBenchmarkActive)
                eval(this.config.benchmarkEval.replace('%s%', (new Date().getTime() - start) + 'ms'));

            if (typeof(this.config.onC2L) !== 'undefined')
                this.config.onL2C.call();

            return $this;
        },

        Default: function() {

            if (this.config.cookieDuration > 0)
                setCookie('default'); //set to default, so no C2L or L2C will be called

            if (this.config.usePermalinkHash === true)
                window.location.hash = '';

            location.reload(true); //reload from server, not cache

            return this;
        },

        setSelector(selector) {
            this.SELECTOR = selector;
        }
    };

    /**
     * Helper Functions
     */
    let hasClass = function(el, cssClass) {
        return el.className && new RegExp("(\\s|^)" + cssClass + "(\\s|$)").test(el.className);
    };

    let hashCallback = function() {

        console.log(this);

        if (window.location.hash === this.config.permalinkHashLat)
            this.C2L.call(this);

        if (window.location.hash === this.config.permalinkHashCyr)
            this.L2C.call(this);
    };

    let initHash = function() {

        let $this = this;

        if (!("onhashchange" in window)) {

            let oldHref = location.href;
            setInterval(function () {
                let newHref = location.href;
                if (oldHref !== newHref) {
                    oldHref = newHref;
                    hashCallback.call(this);
                }
            }, 100);
        } else if (window.addEventListener) {
            window.addEventListener("hashchange", function(){
                hashCallback.call($this);
            }, false);
        }
        else if (window.attachEvent) {
            window.attachEvent("onhashchange", function(){
                hashCallback.call($this);
            });
        }

        hashCallback.call(this);

        //if permalink is already set on page load (init hash function) we will return true so no translation is called from cookie.
        return window.location.hash === this.config.permalinkHashLat || window.location.hash === this.config.permalinkHashCyr
    };

    let setCookie = function(value) {

        let expires = "; ";
        if (this.config.cookieDuration) {
            let date = new Date();
            date.setDate(date.getDate() + this.config.cookieDuration);
            expires = "; expires=" + date.toUTCString() + "; ";
        }
        document.cookie = "CyrLatConverterSelected=" + value + expires + "path=/";
    };

    let getCookie = function() {
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
    };

    /**
     * splitWords
     *
     * Cross browser function to split words and preserve delimiters.
     */
    let splitWords = function(str) {

        let pattern;

        if (this.config.ignoreListIncludeUnicode === true) //unicode for all cyrillic letters, and čČćĆžŽšŠđĐ
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
    };

    let recursiveCheckParent = function(el) {

        let $this = this;

        if(this.config.ignoreClasses.length === 0)
            return false;

        let ignoreClasses = this.config.ignoreClasses;

        function scan(element) {
            while (element.parentNode) {

                if(element.className) {

                    let ret = false;

                    [].forEach.call(ignoreClasses, function(ignore){
                        if(hasClass.call($this, element, ignore)) {
                            ret = true;
                            return;
                        }
                    });

                    return ret;
                }

                element = element.parentNode;
            }
            return false;
        }

        return scan(el);
    };

    let replace_L2C = function(txt) {
        let value;
        let chainedFlag;
        let c2;
        let validDoubleChain;

        let words = splitWords.call(this, txt);

        //iterate through all words
        words.forEach(function (w, i) {

            //if list of words to ignore exist...
            if ((typeof CyrLatIgnoreList !== 'undefined') && (w.toString().toLowerCase() in CyrLatIgnoreList))
                words[i] = CyrLatIgnoreList[w.toString().toLowerCase()] === '' ? w : CyrLatIgnoreList[w.toString().toLowerCase()];
            else {

                //check is this word in the CyrLatIgnore_doubleLetters list, if so, then it's not valid chain
                validDoubleChain = !(
                    typeof CyrLatIgnore_doubleLetters !== 'undefined' &&
                    CyrLatIgnore_doubleLetters.indexOf(w.toString().toLowerCase()) > -1
                );

                //iterate through list of base words to ignore
                if (typeof CyrLatIgnore_doubleLettersBase !== 'undefined') {
                    CyrLatIgnore_doubleLettersBase.forEach(function(base) {
                        if (w.toString().toLowerCase().indexOf(base) > -1) //ignore it
                        {
                            validDoubleChain = false;
                            return false;
                        }
                    });
                }

                //split words in letters...
                value = w.split('');

                value.forEach(function (c, i) {
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
    };

    let replace_C2L = function(txt) {

        let value;

        //if list of words to ifnore exist...
        if (typeof CyrLatIgnoreList !== 'undefined') {
            let words = splitWords.call(this, txt);

            //console.log(words);
            words.forEach(function (w, i) {
                if (!(w.toString().toLowerCase() in CyrLatIgnoreList)) //if word not set in ignore list
                {
                    value = w.split('');

                    value.forEach(function (c, i) {
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

            value.forEach(function (c, i) {
                value[i] = (Cyr2Lat[c] && Cyr2Lat[c] !== "") ? Cyr2Lat[c] : c;
            });

            return value.join('');
        }
    };

    let convert_L2C = function(el) {

        let $this = this;

        el.childNodes.forEach(function (node) {

            if( ['iframe', 'script', 'style', 'code', 'pre'].includes( node.nodeName.toLowerCase() ) )
                return;

            if( node.nodeType === 1 && hasClass.call($this, node, 'CyrLatIgnore') )
                return;

            if (node.nodeType === 3) {
                if (!recursiveCheckParent.call($this, node)) {
                    if (typeof node.textContent !== 'undefined')
                        node.textContent = replace_L2C.call($this, node.textContent);
                    else if (typeof this.innerText !== 'undefined')
                        node.innerText = replace_L2C.call($this, node.innerText);
                    else if (typeof this.nodeValue !== 'undefined')
                        node.nodeValue = replace_L2C.call($this, node.nodeValue);

                    return true;
                }
            }

            if (node.nodeType === 1) {

                if(typeof node.placeholder !== 'undefined' && !recursiveCheckParent.call($this, node)) {
                    node.placeholder = replace_L2C.call($this, node.placeholder);
                }

                convert_L2C.call($this, node);
                return true;
            }

            return false;
        });
    };

    let convert_C2L = function(el) {

        let $this = this;

        el.childNodes.forEach(function (node) {

            if( ['iframe', 'script', 'style', 'code', 'pre'].includes( node.nodeName.toLowerCase() ) )
                return;

            if( node.nodeType === 1 && hasClass.call($this, node, 'CyrLatIgnore') )
                return;

            if (node.nodeType === 3) {
                if (!recursiveCheckParent.call($this, node)) {
                    if (typeof node.textContent !== 'undefined')
                        node.textContent = replace_C2L.call($this, node.textContent);
                    else if (typeof node.innerText !== 'undefined')
                        this.innerText = replace_C2L.call($this, node.innerText);
                    else if (typeof node.nodeValue !== 'undefined')
                        node.nodeValue = replace_C2L.call($this, node.nodeValue);

                    return true;
                }
            }

            if (node.nodeType === 1) {

                if(typeof node.placeholder !== 'undefined' && !recursiveCheckParent.call($this, node)) {
                    node.placeholder = replace_C2L.call($this, node.placeholder);
                }

                convert_C2L.call($this, node);
                return true;
            }

            return false;
        });
    };

    return CyrLatConverter;
}));