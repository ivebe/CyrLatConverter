CyrLatConverter
===============

CyrLatConverter is jQuery plugin for transliteration complete web site (or just part of it) from Latin to Cyrillic and vice versa. Built with Serbian language as reference.

It's easy to setup and use.


### Example
<pre>
&lt;html&gt;
&lt;head&gt; 
&lt;meta charset=&quot;utf-8&quot;&gt;

&lt;script src=&quot;jquery-1.7.2.min.js&quot;&gt;

&lt;script src=&quot;cyrlatconverter_ignore_list_rs.js&quot;&gt;&lt;/script&gt; 
&lt;script src=&quot;cyrlatconverter.js&quot;&gt;&lt;/script&gt; 

&lt;/head&gt;
&lt;body class=&quot;CyrLatConvert&quot;&gt;

&lt;a href=&quot;#cyr&quot;&gt;Ćirilica&lt;/a&gt;
&lt;a href=&quot;#lat&quot;&gt;Latinica&lt;/a&gt;

...
Body content
...

&lt;script&gt;
$.CyrLatConverter({
  permalink_hash : &quot;on&quot;
});
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre>


For full options list, and tutorial (Serbian) go to <a href="http://www.ivebe.com/blog/cyrillic-to-latin-and-latin-to-cyrillic-jquery-plugin.html">http://www.ivebe.com/blog/cyrillic-to-latin-and-latin-to-cyrillic-jquery-plugin.html</a>
