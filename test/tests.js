QUnit.test( "Test Cyrillic", function( assert ) {

    $('body').CyrLatConverter('L2C');

    assert.ok( $.fn.CyrLatConverter, 'registered as a jQuery plugin' );
    assert.ok( $("ul > li:nth-child(1)").text() === "Пример реченице која је оригинално на ћирилици: Ана воли Милована.", $("ul > li:nth-child(1)").text() );
    assert.ok( $("ul > li:nth-child(2)").text() === "Пример реченице која садржи речи које не улазе у транслитерацију: Овај plugin је писан за jQuery.", $("ul > li:nth-child(2)").text() );
    assert.ok( $("ul > li:nth-child(3)").text() === "Пример реченице која садржи нестандардне речи за игнорисање двознака: И онда је Миљојко отиш'о у Нјемачку.", $("ul > li:nth-child(3)").text() );
    assert.ok( $("ul > li:nth-child(4)").text() === "Пример реченице која садржи речи за игнорисање двознака: Ђорђу је одзвонило и он је одјурио.", $("ul > li:nth-child(4)").text() );
});

QUnit.test( "Test Latin", function( assert ) {


    $('body').CyrLatConverter('C2L');

    assert.ok( $("ul > li:nth-child(1)").text() === "Primer rečenice koja je originalno na ćirilici: Ana voli Milovana.", $("ul > li:nth-child(1)").text() );
    assert.ok( $("ul > li:nth-child(2)").text() === "Primer rečenice koja sadrži reči koje ne ulaze u transliteraciju: Ovaj plugin je pisan za jQuery.", $("ul > li:nth-child(2)").text() );
    assert.ok( $("ul > li:nth-child(3)").text() === "Primer rečenice koja sadrži nestandardne reči za ignorisanje dvoznaka: I onda je Miljojko otiš'o u Njemačku.", $("ul > li:nth-child(3)").text() );
    assert.ok( $("ul > li:nth-child(4)").text() === "Primer rečenice koja sadrži reči za ignorisanje dvoznaka: Đorđu je odzvonilo i on je odjurio.", $("ul > li:nth-child(4)").text() );
});