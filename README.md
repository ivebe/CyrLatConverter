# This branch is under development. Use it as such!

# CyrLatConverter

CyrLatConverter is jQuery plugin for transliteration complete web site (or just part of it) from Latin to Cyrillic and vice versa. Built with Serbian language as reference.

It's easy to setup and use.


### Example
<pre>
&lt;html&gt;
&lt;head&gt; 
&lt;meta charset=&quot;utf-8&quot;&gt;

&lt;script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js&quot;&gt;

&lt;script src=&quot;cyrlatconverter_ignore_list_rs.js&quot;&gt;&lt;/script&gt; 
&lt;script src=&quot;cyrlatconverter.js&quot;&gt;&lt;/script&gt; 

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


For full options list, and tutorial (Serbian) go to <a href="http://www.ivebe.com/blog/cyrillic-to-latin-and-latin-to-cyrillic-jquery-plugin.html">http://www.ivebe.com/blog/cyrillic-to-latin-and-latin-to-cyrillic-jquery-plugin.html</a>

### Changelog
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
