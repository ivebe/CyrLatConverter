/*
 * Cyrillic to Latin and vice versa converter - list of words to ignore
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
 * Copyright [2020] [Danijel Petrovic]
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
 * @copyright Danijel Petrovic, www.ivebe.com, 2020
 * @version 1.0.3
 */

//ignore exact words, and if value is set, replace it with value
let CyrLatIgnoreList = {
	"plugin" : '',
	"jquery" : 'jQuery',
	"default" : '',
	"copyright" : '',
	"trademark" : '',
	"web" : '',
	"browser" : '',
	"javascript" : '',
	"microsoft" : 'Microsoft',
	"firefox" : 'Firefox',
	"opera" : 'Opera',
	"safari" : 'Safari',
	"chrome" : 'Chrome',
	"ie" : 'IE',
	"download" : '',
	"windows" : '',
	"linux" : '',
	"office" : '',
 	"cookie" : '',
 	"cyrlatconverter" : '',
 	"cyrlatconvert" : '',
 	"cyrlatignore" : ''
};

//ignore EXACT words from double letters chaining into one
let CyrLatIgnore_doubleLetters = [
	'njemačku'
];

//ignore all words BASED on words in the list from double letters chaining into one
let CyrLatIgnore_doubleLettersBase = [
	'anjon',
	'adjektiv',
	'adjunkt',
	'budzašto',
	'vanjezič',
	'injekt',
	'injekc',
	'konjug',
	'konjunk',
	'lindzi',
	'nadždrel',
	'nadžet',
	'nadžive',
	'nadživ',
	'nadžnje',
	'nadžup',
	'nadzemn',
	'nadzida',
	'nadzira',
	'nadzire',
	'nadziru',
	'nadzor',
	'nadjača',
	'nadjaha',
	'odžali',
	'odžari',
	'odžvaka',
	'odžubor',
	'odžive',
	'odživlj',
	'odzvanja',
	'odzvoni',
	'odziv',
	'odjav',
	'odjaha',
	'odjaš',
	'odjeb',
	'odjedri',
	'odjezdi',
	'odjedanput',
	'odjedared',
	'odjednom',
	'odjek',
	'odjeci',
	'odjur',
	'podžanr',
	'podzadat',
	'podzakon',
	'podzemlj',
	'podzemn',
	'podzida',
	'podznak',
	'podznaci',
	'podjar',
	'podjamči',
	'podjezič',
	'podjednak',
	'predživot',
	'predželuda',
	'predzadnj',
	'predznak',
	'predznanj',
	'predznaci',
	'predjel',
	'tanjug'
];

