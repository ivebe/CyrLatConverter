/*
 * Cyrillic to Latin and vice versa converter
 * 
 * /// Calls ///
 * 
 * - $.CyrLatConverter() : trigger last transliteration used, from the cookie
 * - $.CyrLatConverter('default') : show original transliteration
 * - $.CyrLatConverter('L2C') : trigger transliteration to Cyrillic
 * - $.CyrLatConverter('C2L') : trigger transliteration to Latin
 * - $.CyrLatConverter({options}) : initialize plugin with values from one of the options bellow
 * 
 * /// Options: ///
 *  
 *  - cookie_duration : cookie duration in days. Default 7
 *  
 *  - parent_class_ignore : if class specified here it will ignore transliteration of all child elements. 
 *                          It can add multiple classes separated by comma, but each part must match exact class, 
 *                          Ex. 'prettyprint, prettyprint linenums' will match elements with 
 *                          class="prettyprint" and class="prettyprint linenums". Default empty.
 *  
 *  - permalink_hash_lat : define hash tag to trigger transliteration from Cyrillic to Latin, default "#lat"
 * 
 *  - permalink_hash_cyr : define hash tag to trigger transliteration from Latin to Cyrillic, default "#cyr"
 * 		
 *  - permalink_hash : enable or disable hash tags for transliteration trigger, default "off"
 * 
 *  - ignore_list_include_unicode : if list for ignoring transliteration contains Cyrillic words, set this to "on", otherwise to "off"
 *                                  (off has small performance gain). Default is "on"
 *  
 *  - benchmark : set to "on" or "off". If default transliteration selected, measure time after reloading, not reloading itself. 
 *                Latest call is accurate, as few calls can be triggered in between. Default "off"
 * 
 *  - benchmark_eval : you can call any code, and %s% will be replaced with script time execution.
 *                     Default: "console.log('Execution time: %s%')"
 *
 *  - button_cyr : id of the button on which click transliteration to cyrillic will be called
 *
 *  - button_lat : id of the button on which click transliteration to latin will be called
 *
 *  - button_default : id of the button on which click default contetn will be shown
 * 
 *  - onC2L : set user function to be called when C2L is done 
 * 
 *  - onL2C : set user function to be called when L2C is done
 * 
 * Example of usage:
 * 
 * 	$.CyrLatConverter({
 *	  permalink_hash : "on",
 *	
 *	  onL2C : function(){
 *		alert('aaa');
 *	  },
 *	
 *	  onC2L : function(){
 *		alert('bbb');
 *	  }
 *  });
 *  
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
 * @version 0.5.4
 */

(function($) {
	var config = {		
		cookie_duration : 7,
		parent_class_ignore : '',
		permalink_hash_lat : "#lat",
		permalink_hash_cyr : "#cyr",		
		permalink_hash : "off",
		ignore_list_include_unicode : "on",
		benchmark : 'off',
		benchmark_eval : "console.log('Execution time: %s%')",
		button_cyr : '',
		button_lat : '',
		button_default : ''
	};
	
	var Lat2Cyr = {
		"a" : "а",
		"b" : "б",
		"c" : "ц",
		"d" : "д",
		"e" : "е",
		"f" : "ф",
		"g" : "г",
		"h" : "х",
		"i" : "и",
		"j" : "ј",
		"k" : "к",
		"l" : "л",
		"m" : "м",
		"n" : "н",
		"o" : "о",
		"p" : "п",
		"q" : "",
		"r" : "р",
		"s" : "с",
		"t" : "т",
		"u" : "у",
		"v" : "в",
		"w" : "",
		"x" : "",
		"y" : "",
		"z" : "з",
		
		"A" : "А",
		"B" : "Б",
		"C" : "Ц",
		"D" : "Д",
		"E" : "Е",
		"F" : "Ф",
		"G" : "Г",
		"H" : "Х",
		"I" : "И",
		"J" : "Ј",
		"K" : "К",
		"L" : "Л",
		"M" : "М",
		"N" : "Н",
		"O" : "О",
		"P" : "П",
		"Q" : "",
		"R" : "Р",
		"S" : "С",
		"T" : "Т",
		"U" : "У",
		"V" : "В",
		"W" : "",
		"X" : "",
		"Y" : "",
		"Z" : "З",
		
		"č" : "ч",
		"ć" : "ћ",
		"đ" : "ђ",
		"ž" : "ж",
		"š" : "ш",		
		
		"Č" : "Ч",
		"Ć" : "Ћ",
		"Đ" : "Ђ",
		"Ž" : "Ж",
		"Š" : "Ш"
	};
	
	var Cyr2Lat = {
		 "а" : "a",
		 "б" : "b",
		 "ц" : "c",
		 "д" : "d",
		 "е" : "e",
		 "ф" : "f",
		 "г" : "g",
		 "х" : "h",
		 "и" : "i",
		 "ј" : "j",
		 "к" : "k",
		 "л" : "l",
		 "м" : "m",
		 "н" : "n",
		 "о" : "o",
		 "п" : "p",
		 "р" : "r",
		 "с" : "s",
		 "т" : "t",
		 "у" : "u",
		 "в" : "v",
		 "з" : "z",
		           
		 "А" : "A",
		 "Б" : "B",
		 "Ц" : "C",
		 "Д" : "D",
		 "Е" : "E",
		 "Ф" : "F",
		 "Г" : "G",
		 "Х" : "H",
		 "И" : "I",
		 "Ј" : "J",
		 "К" : "K",
		 "Л" : "L",
		 "М" : "M",
		 "Н" : "N",
		 "О" : "O",
		 "П" : "P",
		 "Р" : "R",
		 "С" : "S",
		 "Т" : "T",
		 "У" : "U",
		 "В" : "V",
		 "З" : "Z",
		           
		 "ч" : "č",
		 "ћ" : "ć",
		 "ђ" : "đ",
		 "ж" : "ž",
		 "ш" : "š",
		 "љ" : "lj",
		 "њ" : "nj",
		 "ђ" : "đ",
		 "џ" : "dz",
		           
		 "Ч" : "Č",
		 "Ћ" : "Ć",
		 "Ђ" : "Đ",
		 "Ж" : "Ž",
		 "Ш" : "Š",
		 "Љ" : "Lj",
		 "Њ" : "Nj",
		 "Ђ" : "Đ",
		 "Џ" : "Dž"
	};

	var Lat2Cyr_chained = {
		"l" : {
			"j" : "љ"
		},
		"n" : {
			"j" : "њ"
		},
		"d" : {
			"j" : "ђ",
			"z" : "џ",
			"ž" : "џ"
		},
		"L" : {
			"j" : "Љ",
			"J" : "Љ"
		},
		"N" : {
			"j" : "Њ",
			"J" : "Њ"
		},
		"D" : {
			"j" : "Ђ",
			"J" : "Ђ",
			"z" : "Џ",
			"Z" : "Џ",
			"ž" : "Џ",
			"Ž" : "Џ"
		}
	};

		
	function do_hash()
	{		
		if(window.location.hash == config.permalink_hash_lat)
			methods['C2L'].call(this);
		if(window.location.hash == config.permalink_hash_cyr)
			methods['L2C'].call(this);		
			
		//console.log('HASH: ' + window.location.hash);
	}
		
	function initHash()
	{		
		if(!("onhashchange" in window)) {	
		    var oldHref = location.href;
		    setInterval(function() {
		        var newHref = location.href;
		        if (oldHref !== newHref) {
		            oldHref = newHref;
		            do_hash();
		        }
		    }, 100);
		} else if (window.addEventListener) {
		    window.addEventListener("hashchange", do_hash, false);
		}
		else if (window.attachEvent) {
		    window.attachEvent("onhashchange", do_hash);    
		}
					
		do_hash();			
						
		//if permalink is already set on page load (init hash function) we will return true so no translation is called from cookie.
		if(window.location.hash == config.permalink_hash_lat || window.location.hash == config.permalink_hash_cyr)
			return true;
			
		return false;
	}
	
	function setCookie(value) {
		var expires = "; ";
		if (config.cookie_duration) {
			var date = new Date();
			date.setDate(date.getDate() + config.cookie_duration);
			expires = "; expires=" + date.toGMTString() + "; ";
		}			
		document.cookie = "CyrLatConverterSelected=" + value + expires + "path=/";
	}

	function getCookie() {
		var name = "CyrLatConverterSelected=";
		var c_arr = document.cookie.split(';');
		for (var i = 0; i < c_arr.length; i++) {
			var c = c_arr[i];
			while (c.charAt(0) == ' ')
				c = c.substring(1, c.length);
			
			if (c.indexOf(name) == 0)
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
	    
	    if(config.ignore_list_include_unicode == 'on')
			var pattern = "[^0-9a-zA-Z\u0400-\u04FF_\u010D\u010C\u0107\u0106\u017E\u017D\u0161\u0160\u0111\u0110]+"; //unicode for all cyrillic letters, and čČćĆžŽšŠđĐ
		else
			var pattern = "[^0-9a-zA-Z_\u010D\u010C\u0107\u0106\u017E\u017D\u0161\u0160\u0111\u0110]+"; //unicode for čČćĆžŽšŠđĐ
	    
		//test does browser natively support split with keeping delimiters.
		var test = "test string";
		if(test.split(/([^a-z])/).length == 3)
		{
			return str.split(new RegExp("(" + pattern + ")", "i"));
		}
		
		regex = new RegExp(pattern, "gi");				
		
		var i = 0;
		var matches    = str.split(regex),
	        separators = str.match(regex),
	        ret        = [];
			
		if(matches.length == 0)
			return separators;
			
		if(separators == null)
			return matches;
		
		if(separators.length == matches.length + 1) //separators from both sides
		{
			for(i = 0; i < matches.length; i++)
			{
				ret.push(separators[i]);
				ret.push(matches[i]);
			}		
			ret.push(separators[i]);
		}	
		else if(separators.length == matches.length) //separator from one of the sides
		{
			if(matches[0].indexOf(separators[0]) > -1) //separator is 1st
			{			
				for(var i = 0; i < separators.length; i++)
				{
					ret.push(separators[i]);
					ret.push(matches[i]);		
				}
			}
			else //separator is last
			{			
				for(var i = 0; i < separators.length; i++)
				{
					ret.push(matches[i]);
					ret.push(separators[i]);
				}			
			}
		}
		else //no separators from the sides
		{
			ret.push(matches[0]);
			for(i = 0; i < separators.length; i++)
			{
				ret.push(separators[i]);
				ret.push(matches[i+1]);
			}				
		}
		
	    return ret;
	}
	/* End of splitWords */


	function replace_L2C(txt) {
		var value;
		var chainedFlag;
		var c2;
		var baseFlagIgnore = false;
		var validDoubleChain;
		
		
		var words = splitWords(txt);
			
		//iterate through all words
		$.each(words, function(i, w) {
			
			//if list of words to ifnore exist...		
			if((typeof CyrLatIgnoreList != 'undefined') && (w.toString().toLowerCase() in CyrLatIgnoreList))
				words[i] = CyrLatIgnoreList[w.toString().toLowerCase()] == '' ? w : CyrLatIgnoreList[w.toString().toLowerCase()];
			else
			{	
				validDoubleChain = true;
				
				if(typeof CyrLatIgnore_doubleletters != 'undefined' && (w.toString().toLowerCase() in CyrLatIgnore_doubleletters))
					validDoubleChain = false;
					
				//iterate through list of base words to ignore
				if(typeof CyrLatIgnore_doubleletters_base != 'undefined') {
					$.each(CyrLatIgnore_doubleletters_base, function(base, v) {																										
						if(w.toString().toLowerCase().indexOf(base) > -1) //ignore it
						{
							validDoubleChain = false;
							return false;
						}
						
					});
				}						
				
				//split words in letters...	
				value = w.split('');
					
				$.each(value, function(i, c) {
					chainedFlag = false;						
		
					//if word shoult be doubleletters chained...
					if (Lat2Cyr_chained[c] && validDoubleChain) {
						c2 = value[i + 1];							
						if (c2 && Lat2Cyr_chained[c][c2]) {
							value[i] = Lat2Cyr_chained[c][c2];
							value[i + 1] = '';								
							chainedFlag = true;
						}							
					}
				
					if (!chainedFlag)
						value[i] = (Lat2Cyr[c] && Lat2Cyr[c] != "") ? Lat2Cyr[c] : c;
				});
				
				words[i] = value.join('');
			}
			  
		});
			
		return words.join(''); //join with NO space, as spaces are preserved in split function.	
	}

	function replace_C2L(txt) {
		
		var value;
		
		//if list of words to ifnore exist...
		if (typeof CyrLatIgnore != 'undefined')
		{
			var words = splitWords(txt);
			
			//console.log(words);
			$.each(words, function(i, w) {
				if(!(w.toString().toLowerCase() in CyrLatIgnore)) //if word not set in ignore list
				{
					value = w.split('');

					$.each(value, function(i, c) {
						value[i] = (Cyr2Lat[c] && Cyr2Lat[c] != "") ? Cyr2Lat[c] : c;
					});
					
					words[i] = value.join('');
				}
				else
					words[i] = CyrLatIgnore[w.toString().toLowerCase()] == '' ? w : CyrLatIgnore[w.toString().toLowerCase()];  
			});
			
			return words.join(''); //join with NO space, as spaces are preserved in split function.
		}
		else // there's no ignore dictionary 
		{
			value = txt.split('');

			$.each(value, function(i, c) {
				value[i] = (Cyr2Lat[c] && Cyr2Lat[c] != "") ? Cyr2Lat[c] : c;
			});		
			
			return value.join('');	
		}		
	}

	function recursiveCheckParent(el)
	{
		var parent_class_ignore = config.parent_class_ignore.split(',');
		$.each(parent_class_ignore, function(i, c) {
			parent_class_ignore[i] = $.trim(c);
		});

		function scan(element)
		{	
			while(element.parentNode)
			{
				if(element.className && jQuery.inArray(element.className, parent_class_ignore) >= 0)
					return true;
				
				element = element.parentNode; 
			}									
			return false;				
		}
		
		return scan(el);		
	}
	
	function convert_L2C(el) {
		
		$(el).wrapInner('<span id="CyrLatWrap" />');
		
		$(el).find(':not(iframe,script,style,pre,code,.CyrLatIgnore)').contents().filter(function() {
			if (this.nodeType == 3)
				if(!recursiveCheckParent(this)){
					if(typeof this.textContent != 'undefined') 				
						this.textContent = replace_L2C(this.textContent);
					else if(typeof this.innerText != 'undefined') 	
						this.innerText = replace_L2C(this.innerText);
					else if(typeof this.nodeValue != 'undefined') 	
						this.nodeValue = replace_L2C(this.nodeValue);										
					
					return true;
				}
			return false;
		});
		
	};

	function convert_C2L(el) {

		$(el).wrapInner('<span id="CyrLatWrap" />');

		var textNodes = $(el).find(':not(iframe,script,style,pre,code,.CyrLatIgnore)').contents().filter(function() {
			if (this.nodeType == 3){
				if(typeof this.textContent != 'undefined') 				
						this.textContent = replace_C2L(this.textContent);
					else if(typeof this.innerText != 'undefined') 	
						this.innerText = replace_C2L(this.innerText);
					else if(typeof this.nodeValue != 'undefined') 	
						this.nodeValue = replace_C2L(this.nodeValue);
						
				return true;
			}
			return false;
		});
	};
	var init_benchmark_active = false;
	var methods = {
		init : function(customSettings) {
			//console.log(customSettings);
			if (customSettings) {
				$.extend(config, customSettings);
			}
			
			//console.log(CyrLatIgnore);
			
			if(config.button_cyr != '')
			{
				if(config.button_cyr.charAt(0) != '#')
					config.button_cyr = '#' + config.button_cyr;
					
				$(config.button_cyr).click(function(){
			        $.CyrLatConverter('L2C');
			    });
			}
			
			if(config.button_lat != '')
			{
				if(config.button_lat.charAt(0) != '#')
					config.button_lat = '#' + config.button_lat;
					
				$(config.button_lat).click(function(){
			        $.CyrLatConverter('C2L');
			    });
			}
			
			if(config.button_default != '')
			{
				if(config.button_default.charAt(0) != '#')
					config.button_default = '#' + config.button_default;
					
				$(config.button_default).click(function(){
			        $.CyrLatConverter('default');
			    });
			}
			
			//start benchmark
			if(config.benchmark.toString().toLowerCase() == 'on')
			{
				var start = new Date().getTime();
				init_benchmark_active = true;
			}
																			
			var hash_set = false;		
			if(config.permalink_hash.toLowerCase() == "on")
			{
				hash_set = initHash(); //return hash translation status (translated or not)				 
			}
			
			var direction = '';
			if(config.cookie_duration > 0)
				direction = getCookie();

			if (hash_set == false && (direction == "L2C" || direction == "C2L")) {				
				methods[direction].call(this);		
			}	
					
			//end benchmark
			if(config.benchmark.toString().toLowerCase() == 'on')
			{
				eval(config.benchmark_eval.replace('%s%', (new Date().getTime() - start) + 'ms'));				
				init_benchmark_active = false;
			}										
						
			return true;
		},
		L2C : function() {
			//start benchmark
			if(config.benchmark.toString().toLowerCase() == 'on' && !init_benchmark_active)
				var start = new Date().getTime();
			
			$(".CyrLatConvert").each(function() {			
				convert_L2C(this);
			});
			setCookie('L2C');
			
			//end benchmark
			if(config.benchmark.toString().toLowerCase() == 'on' && !init_benchmark_active)
				eval(config.benchmark_eval.replace('%s%', (new Date().getTime() - start) + 'ms'));
					
			if(config.onL2C != 'undefined')
				config.onL2C.call();
			
			return true;
		},
		C2L : function() {
			
			//start benchmark
			if(config.benchmark.toString().toLowerCase() == 'on' && !init_benchmark_active)
				var start = new Date().getTime();
			
			$(".CyrLatConvert").each(function() {			
				convert_C2L(this);
			});
			setCookie('C2L');
			
			//end benchmark
			if(config.benchmark.toString().toLowerCase() == 'on' && !init_benchmark_active)
				eval(config.benchmark_eval.replace('%s%', (new Date().getTime() - start) + 'ms'));
					
			if(config.onC2L != 'undefined')
				config.onC2L.call();
			
			return true;
		}
	}

	$.CyrLatConverter = function(method) {
		if (typeof method === 'undefined' || typeof method === 'object' || !method) {
			methods.init.apply(this, arguments);
		}		
		else if(method.toString().toLowerCase() == 'default')
		{ 
			setCookie('default'); //set to default, so no C2L or L2C will be called
			if(config.permalink_hash = 'on')
				window.location.hash = '';
			location.reload(true); //reload from server, not cache
			return false;
		}	
		else if (methods[method]) {
			if(config.permalink_hash.toLowerCase() == "on")
			{
				if(method.toString().toUpperCase() == 'L2C')
					window.location.hash = config.permalink_hash_cyr;
				else if(method.toString().toUpperCase() == 'C2L')
					window.location.hash = config.permalink_hash_lat;				
			}
			else
				methods[method].call(this);
		}  
		else {
			$.error('Unknown call to ' + method);
		}

		return false;
	};

})(jQuery); 