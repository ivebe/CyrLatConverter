/*
 * Cyrillic to Latin and vice versa converter - ignore list
 *
 * NOTE: all keys in both arrays MUST be lowercase! 
 * 
 * /// CyrLatIgnore: ///
 *     KEY: lowercase word to ignore, as in page it will ignore it regardless of is it lower, upper or mixed case.
 *  VALUE: if value is set, word will be replaced with the value, if value empty, original word with original case will be preserved
 *  
 * /// CyrLatIgnore_doubleletters: ///
 * 	  KEY: lowercase word to ignore double letters chaining. Ex. Nj => Њ by default, here you can specify words which ignore this behavior 
 *  VALUE: always empty
 *
 * /// CyrLatIgnore_doubleletters_base: ///
 * 	  KEY: lowercase BASE word to ignore double letters chaining. Ex. Nj => Њ by default, here you can specify words which ignore this behavior. All words that contains base word will be ignored from double letters chaining.
 *  VALUE: always empty
 *  
 * 
 * ************************************************************************************ 
 * This software is free to use for personal, company internal or commercial purposes. 
 *                                                                                      
 * You may not resell this software, and attribution to the author must remain.                  
 * Backlink is desirable, you can show backlink to the:                                  
 * www.ivebe.com                                                                        
 * or                                                                                   
 * www.ivebe.com/blog/cyrillic-to-latin-and-latin-to-cyrillic-jquery-plugin.html         
 * ************************************************************************************ 
 * 
 * Copyright [2013] [Danijel Petrovic]
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
 * 
 * @author Danijel Petrovic 
 * @copyright Danijel Petrovic, www.ivebe.com, 2013
 * @version 0.1.5
 */
	
	
//ignore exact words, and if value set, replace it with value	
var CyrLatIgnoreList = {
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
var CyrLatIgnore_doubleletters = {	
	"OVDE-UNETI-TAČNU-REČ-ZA-IGNORISANJE-SPAJANJA-DVA-SLOVA-U-JEDNO" : '',
	"njemačku" : ''
};

//ignore all words BASED on words in the list from double letters chaining into one
var CyrLatIgnore_doubleletters_base = {
	anjon		: '',
	adjektiv	: '',
	adjunkt		: '',
	budzašto	: '',
	vanjezič	: '',
	injekt		: '',
	injekc		: '',
	konjug		: '',
	konjunk		: '',
	lindzi		: '',
	nadždrel	: '',
	nadžet		: '',
	nadžive		: '',
	nadživ		: '',
	nadžnje		: '',
	nadžup		: '',
	nadzemn		: '',
	nadzida		: '',
	nadzira		: '',
	nadzire		: '',
	nadziru		: '',
	nadzor		: '',
	nadjača		: '',
	nadjaha		: '',
	odžali		: '',
	odžari		: '',
	odžvaka		: '',
	odžubor		: '',
	odžive		: '',
	odživlj		: '',
	odzvanja	: '',
	odzvoni		: '',
	odziv		: '',
	odjav		: '',
	odjaha		: '',
	odjaš		: '',
	odjeb		: '',
	odjedri		: '',
	odjezdi		: '',
	odjedanput	: '',
	odjedared	: '',
	odjednom	: '',
	odjek		: '',
	odjeci		: '',
	odjur		: '',
	podžanr		: '',
	podzadat	: '',
	podzakon	: '',
	podzemlj	: '',
	podzemn		: '',
	podzida		: '',
	podznak		: '',
	podznaci	: '',
	podjar		: '',
	podjamči	: '',
	podjezič	: '',
	podjednak	: '',
	predživot	: '',
	predželuda	: '',
	predzadnj	: '',
	predznak	: '',
	predznanj	: '',
	predznaci	: '',
	predjel		: '',
	tanjug		: ''
};

