# CyrLatConverter

[![BrowserStack Status](https://www.browserstack.com/automate/badge.svg?badge_key=NWw2ZTZLNnNCamtSWStPb1djRHlLKzJLcDJ4NlptTmNIbnV3d2pycDZ0TT0tLWJnL29ad0txanVaMXU4VjB2TThvN3c9PQ==--8218dec8c12a941e07abdcf8785af2606bb938a8)](https://www.browserstack.com/automate/public-build/NWw2ZTZLNnNCamtSWStPb1djRHlLKzJLcDJ4NlptTmNIbnV3d2pycDZ0TT0tLWJnL29ad0txanVaMXU4VjB2TThvN3c9PQ==--8218dec8c12a941e07abdcf8785af2606bb938a8)
[![Build Status](https://travis-ci.org/ivebe/CyrLatConverter.svg?branch=master)](https://travis-ci.org/ivebe/CyrLatConverter)
[![GitHub version](https://badge.fury.io/gh/ivebe%2FCyrLatConverter.svg)](https://badge.fury.io/gh/ivebe%2FCyrLatConverter)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

CyrLatConverter is a jQuery plugin for transliteration of complete web sites (or just part of it) from Latin to Cyrillic and vice versa. Built with Serbian language as a reference.

It's easy to setup and use.


### Example
<pre>
&lt;html&gt;
&lt;head&gt; 
&lt;meta charset=&quot;utf-8&quot;&gt;

&lt;script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js&quot;&gt;
&lt;script src=&quot;cyrlatconverter.min.js&quot;&gt;&lt;/script&gt; 

&lt;/head&gt;
&lt;body&gt;

&lt;a href=&quot;#cyr&quot;&gt;Ćirilica&lt;/a&gt;
&lt;a href=&quot;#lat&quot;&gt;Latinica&lt;/a&gt;

...
Body content
...

&lt;script&gt;
$("body").CyrLatConverter({
  permalink_hash : &quot;on&quot;
});
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre>

### Usage

#### Transliterate complete body to Cyrillic

<pre>
$("body").CyrLatConverter('L2C');
</pre>

#### Transliterate complete body to Latin

<pre>
$("body").CyrLatConverter('C2L');
</pre>

#### Transliterate when button is clicked

<pre>
//passing button selector into the plugin

$("body").CyrLatConverter({
    onClickCyr: '.cyrButton',
    onClickLat: '.latButton'
});

//triggering action outside of the plugin

$('.cyrButton').click(function(){
    $("body").CyrLatConverter('L2C');
});

$('.latButton').click(function(){
    $("body").CyrLatConverter('C2L');
});
</pre>

For full options list, and tutorial (Serbian) go to <a href="http://www.ivebe.com/blog/cyrillic-to-latin-and-latin-to-cyrillic-jquery-plugin.html">http://www.ivebe.com/blog/cyrillic-to-latin-and-latin-to-cyrillic-jquery-plugin.html</a>

### Build 

Build setup requires node and uses npm, grunt, babel and uglify. Build process is simple, all it requires is cloning git repository (`git clone git@github.com:ivebe/CyrLatConverter.git`), installing dependencies (`npm install`) and building script (`grunt`).
This will create *cyrlatconverter.min.js* file in the root of the project which you can then use.

If you wish to run QUnit tests on BrowserStack you have *browserstack.json* set, and QUnit test are available in */test* directory.

### Migrating from lower versions to 0.7.0+ version

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
- button_cyr (now onClickCyr) do not have to be ID anymore, it accept any selector. Also onClickLat does the same.

### Changelog
<strong>0.7.0</strong> - Major rewrite, code refactored to satisfy ES6. Added BrowserStack QUnit tests. List of words from dictionary minimised into a single plugin file. Removed backward compatibility calls. (IMPORTANT: if you are migrating from older versions check migration guide. For all others this is the recommended version.) <br />
<strong>0.6.2</strong> - Added placeholder text to transliteration. Removed jQuery library from source. Removed version number from filename.<br />
<strong>0.6.0</strong> - Added flexibile selector so plugin can be called as $("body").CyrLatConverter({...})<br />
<strong>0.5.4</strong> - added onC2L and onL2C events, fixed adding button's id in plugin options<br />
<strong>0.5.3</strong> - changed version from 0.1.5 to 0.5.3 and code published on GitHub<br />
<strong>0.1.5</strong> - added dictionary for ignoring words from double letter chaining<br />
<strong>0.1.4</strong> - added external configuration file, minor bug fix<br />
<strong>0.1.3</strong> - added option for permalink over hash, bug fix<br />
<strong>0.1.2</strong> - code rewritten<br />
<strong>0.1.1</strong> - bug fix<br />
<strong>0.1.0</strong> - plugin published on www.ivebe.com<br />
