function getUrlParams( prop ) {
    var params = {};
    var search = decodeURIComponent( window.location.href.slice( window.location.href.indexOf( '?' ) + 1 ) );
    var definitions = search.split( '&' );

    definitions.forEach( function( val, key ) {
        var parts = val.split( '=', 2 );
        params[ parts[ 0 ] ] = parts[ 1 ];
    } );

    return ( prop && prop in params ) ? params[ prop ] : params;
}


function loadScript(src, callback) {
    var script = document.createElement('script');
    script.onload = callback;
    script.src = src;
    document.head.appendChild(script);
}

loadScript('http://code.jquery.com/jquery-' + getUrlParams('v') + '.min.js', function(){
    loadScript('../cyrlatconverter.min.js', function(){
        loadScript('tests.js', function(){
            QUnit.start();
        });
    });
});