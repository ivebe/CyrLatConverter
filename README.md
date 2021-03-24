# CyrLatConverter

[![BrowserStack Status](https://automate.browserstack.com/badge.svg?badge_key=ZkFVTnpRa04waEJ0dHliTmhSYmxHK0k1TlJwaHdCOGpab21hVkxTWVEvYz0tLWYxQ2tKVkZ5ZmdLVXdWMk5VMDVGZGc9PQ==--76f68acfe3a4b79c33c22bebae2c36aadcdfa84b%)](https://automate.browserstack.com/public-build/ZkFVTnpRa04waEJ0dHliTmhSYmxHK0k1TlJwaHdCOGpab21hVkxTWVEvYz0tLWYxQ2tKVkZ5ZmdLVXdWMk5VMDVGZGc9PQ==--76f68acfe3a4b79c33c22bebae2c36aadcdfa84b%)
[![Build Status](https://travis-ci.com/ivebe/CyrLatConverter.svg?branch=master)](https://travis-ci.com/ivebe/CyrLatConverter)
[![GitHub version](https://badge.fury.io/gh/ivebe%2FCyrLatConverter.svg)](https://badge.fury.io/gh/ivebe%2FCyrLatConverter)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![VanillaJS](https://img.shields.io/badge/VanillaJS-no--dependencies-green.svg)]()

CyrLatConverter is a javascript library for transliteration of complete web sites (or just part of it) from Latin to Cyrillic and vice versa. Built with Serbian language as a reference.

It's easy to set up and use.

## Example
    <html>
    <head> 
    <meta charset="utf-8">

    <script src="cyrlatconverter.min.js"></script> 
    </head>
    <body>

    <a href="#" class="cyr">ćirilica</a>
    <a href="#" class="lat">latinica</a>

    ...
    Body content
    ...

    <script>
        var CyrLat = new CyrLatConverter('body').init({
            onClickCyr: '.cyr',
            onClickLat: '.lat'
        });
    </script>
    </body>
    </html>
    </pre>

## Usage

#### Initialize library
You have to initialize `CyrLatConverter` and then you can call functions from the `CyrLat` (or however you name it). You should always call `init` function after creation of `CyrLatConverter`, even if you don't have any parameters to send.

    var CyrLat = new CyrLatConverter('body').init( {...optional parameters...} );


#### Transliterate complete body to Cyrillic
You can also send an optional parameter which will represent query selector string, on which transliteration will be performed. 
If omitted it will default to the selector specified when `CyrLatConverter` was created, in this case it's `body`. 

    CyrLat.L2C();


#### Transliterate complete body to Latin
You can also send an optional parameter which will represent query selector string, on which transliteration will be performed. 
If omitted it will default to the selector specified when `CyrLatConverter` was created, in this case it's `body`. 

    CyrLat.C2L();

#### Transliterate when a button is clicked

    var CyrLat = new CyrLatConverter('body').init({
        onClickCyr: '.cyr',
        onClickLat: '.lat'
    });


Or you can trigger action outside of the library. You can even use jQuery if you want, or you can use pure javascript.


    var CyrLat = new CyrLatConverter('body').init();
    
    $('.cyr').click(function(){
        CyrLat.L2C();
    });
    
    $('.lat').click(function(){
        CyrLat.C2L();
    });

#### Change selector without calling transliteration
If for any reason you wish to change selector for the DOM you wish to transliterate, you can do so by calling `setSelector` 
function, and it's only parameter is the new selector string.

#### Transliterate just plain text value, no DOM object
If you wish to transliterate just some text value instead of DOM object, you can call `getL2C` or `getC2L` methods. 

    //Make sure you initialized CyrLat object first, 
    //for example: var CyrLat = new CyrLatConverter().init();
    
    CyrLat.getC2L("Sample text in cyrillic");
    CyrLat.getL2C("Sample text in latin");

#### Show default layout
You could simply refresh the page, but if you are using hashtags, or cookie to remember last transliteration, 
better option is calling `Default` method which will handle cookie and hashtag for you and refresh the page.

*For full options list, and tutorial (Serbian) go to 
[https://www.ivebe.com/blog/cyrillic-to-latin-and-latin-to-cyrillic-javascript-library.html](https://www.ivebe.com/blog/cyrillic-to-latin-and-latin-to-cyrillic-javascript-library.html)*

#### Build 

Build setup requires node and uses npm, grunt, babel and uglify. Build process is simple, all it requires is cloning 
git repository (`git clone git@github.com:ivebe/CyrLatConverter.git`), installing dependencies (`yarn install` or `npm install`) 
and building script (`grunt`). This will create `cyrlatconverter.min.js` file in the root of the project which you can then use.

If you wish to run QUnit tests on BrowserStack you have *browserstack.json* set, and QUnit test are available in */test* directory.

#### Migrating from jQuery version to standalone version
> This guide is for migration from version 0.7.0+ to 1.0.0, if you are using lower version, first migrate to 0.7.0.
- Initialization is not `$("SELECTOR").CyrLatConverter({...options...})` anymore, you should use it like `new CyrLatConverter('SELECTOR').init({...options...})`.
- Calls to library functions are not going over jQuery anymore, so you should have variable that stores CyrLatConverter object, for example when creating CyrLatConverter do it like this `var CyrLat = new CyrLatConverter('SELECTOR').init({...options...});`. Then you can access functions in `CyrLat` variable.
- Running transliteration manually is now done like this `CyrLat.L2C()` or `CyrLat.C2L()` instead of `$("body").CyrLatConverter('L2C');` or `$("body").CyrLatConverter('C2L');`.
- Config variable for classes that will be ignored from transliteration has been changed from string, to array, and its name has changed from `parentClassToIgnore` to `ignoreClasses`.

#### Migrating from lower versions to 0.7.0+ version

Migration should be done with keeping in mind those changed features:

- removed deprecated `$.CyrLatConverter({...})` call, all calls must be made as `$('SELECTOR').CyrLatConverter({...})`
- cyrlatconverter_ignore_list_rs.js is not included anymore alongside of the plugin, it is built in the minified version of plugin. If you used custom list of words in this file, you can still use it, but you need to build plugin with your custom list. For instructions follow build guide.
- Config variables names changed to follow backCamelCase notation:
    * cookie_duration => cookieDuration
    * parent_class_ignore => parentClassToIgnore
    * permalink_hash_lat => permalinkHashLat
    * permalink_hash_cyr => permalinkHashCyr
    * permalink_hash => usePermalinkHash (also type changed from string on/off to boolean true/false)
    * ignore_list_include_unicode => ignoreListIncludeUnicode (also type changed from string on/off to boolean true/false)
    * benchmark (just type changed from string on/off to boolean true/false)
    * benchmark_eval => benchmarkEval
    * button_cyr => onClickCyr
    * button_lat => onClickLat
    * button_default => onClickDefault
    
    cyrlatconverter_ignore_list_rs
    * CyrLatIgnore_doubleletters => CyrLatIgnore_doubleLetters
    * CyrLatIgnore_doubleletters_base => CyrLatIgnore_doubleLettersBase
    
- default selector on plugin initialization is `body`, not `.CyrLatConvert` anymore.
- button_cyr (now onClickCyr) do not have to be ID anymore, it accepts any selector. Also, onClickLat does the same.

### Changelog
- **1.0.3** - Fixed Default event bug 
- **1.0.2** - Added getL2C and getC2L methods 
- **1.0.1** - Minor modifications
- **1.0.0** - Major rewrite, removed jQuery dependency and made library with pure JavaScript.
- **0.7.0** - Major rewrite, code refactored to satisfy ES6. Added BrowserStack QUnit tests. List of words from the dictionary minimised into a single plugin file. Removed backward compatibility calls. (IMPORTANT: if you are migrating from older versions check migration guide. For all others this is the recommended version.)
- **0.6.2** - Added placeholder text to transliteration. Removed jQuery library from the source. Removed version number from the filename.
- **0.6.0** - Added flexible selector so plugin can be called as $("body").CyrLatConverter({...})
- **0.5.4** - added onC2L and onL2C events, fixed adding button's id in plugin options
- **0.5.3** - changed version from 0.1.5 to 0.5.3 and code published on GitHub
- **0.1.5** - added dictionary for ignoring words from double letter chaining
- **0.1.4** - added external configuration file, minor bug fix
- **0.1.3** - added option for permalink over hash, bug fix
- **0.1.2** - code rewritten
- **0.1.1** - bug fix
- **0.1.0** - plugin published on www.ivebe.com
