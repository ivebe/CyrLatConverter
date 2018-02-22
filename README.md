# CyrLatConverter - Unit tests missing!

[![BrowserStack Status](https://www.browserstack.com/automate/badge.svg?badge_key=NWw2ZTZLNnNCamtSWStPb1djRHlLKzJLcDJ4NlptTmNIbnV3d2pycDZ0TT0tLWJnL29ad0txanVaMXU4VjB2TThvN3c9PQ==--8218dec8c12a941e07abdcf8785af2606bb938a8)](https://www.browserstack.com/automate/public-build/NWw2ZTZLNnNCamtSWStPb1djRHlLKzJLcDJ4NlptTmNIbnV3d2pycDZ0TT0tLWJnL29ad0txanVaMXU4VjB2TThvN3c9PQ==--8218dec8c12a941e07abdcf8785af2606bb938a8)
[![Build Status](https://travis-ci.org/ivebe/CyrLatConverter.svg?branch=feature-use-es6-instead-of-jquery)](https://travis-ci.org/ivebe/CyrLatConverter)
[![GitHub version](https://badge.fury.io/gh/ivebe%2FCyrLatConverter.svg)](https://badge.fury.io/gh/ivebe%2FCyrLatConverter)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

CyrLatConverter is a javascript library for transliteration of complete web sites (or just part of it) from Latin to Cyrillic and vice versa. Built with Serbian language as a reference.

It's easy to setup and use.

### Example
<pre>
let CyrLat = new CyrLatConverter('body').init({
	onClickCyr: '#cirilica',
    onClickLat: '#latinica',
    onClickDefault: '#default',
	cookieDuration: 7,
    usePermalinkHash: true,
    ignoreClasses: ['ignore'],
	benchmark: true,
	benchmarkEval: "document.getElementById('exctime').innerHTML = '%s%';"
});

CyrLat.C2L();
</pre>
