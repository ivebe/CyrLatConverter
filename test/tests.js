(function() {

    var CyrLat = new CyrLatConverter("body").init({
        ignoreClasses: ['ignore']
    });

    QUnit.test( "Test Cyrillic", function( assert ) {

        CyrLat.L2C();

        assert.ok( document.querySelector("ul > li:nth-child(1)").textContent === "Пример реченице која је оригинално на ћирилици: Ана воли Милована.", document.querySelector("ul > li:nth-child(1)").textContent );
        assert.ok( document.querySelector("ul > li:nth-child(2)").textContent === "Пример реченице која садржи речи које не улазе у транслитерацију: Овај plugin је писан за jQuery.", document.querySelector("ul > li:nth-child(2)").textContent );
        assert.ok( document.querySelector("ul > li:nth-child(3)").textContent === "Пример реченице која садржи нестандардне речи за игнорисање двознака: И онда је Миљојко отиш'о у Нјемачку.", document.querySelector("ul > li:nth-child(3)").textContent );
        assert.ok( document.querySelector("ul > li:nth-child(4)").textContent === "Пример реченице која садржи речи за игнорисање двознака: Ђорђу је одзвонило и он је одјурио.", document.querySelector("ul > li:nth-child(4)").textContent );

    });

    QUnit.test( "Test Latin", function( assert ) {

        CyrLat.C2L();

        assert.ok( document.querySelector("ul > li:nth-child(1)").textContent === "Primer rečenice koja je originalno na ćirilici: Ana voli Milovana.", document.querySelector("ul > li:nth-child(1)").textContent );
        assert.ok( document.querySelector("ul > li:nth-child(2)").textContent === "Primer rečenice koja sadrži reči koje ne ulaze u transliteraciju: Ovaj plugin je pisan za jQuery.", document.querySelector("ul > li:nth-child(2)").textContent );
        assert.ok( document.querySelector("ul > li:nth-child(3)").textContent === "Primer rečenice koja sadrži nestandardne reči za ignorisanje dvoznaka: I onda je Miljojko otiš'o u Njemačku.", document.querySelector("ul > li:nth-child(3)").textContent );
        assert.ok( document.querySelector("ul > li:nth-child(4)").textContent === "Primer rečenice koja sadrži reči za ignorisanje dvoznaka: Đorđu je odzvonilo i on je odjurio.", document.querySelector("ul > li:nth-child(4)").textContent );
    });

    QUnit.test( "Test General", function( assert ) {

        CyrLat.L2C();

        assert.ok( document.querySelector(".CyrLatIgnore").textContent === "reč 2", ".CyrLatIgnore test failed" );
        assert.ok( document.getElementsByClassName('clc')[0].textContent.replace(/(\r\n|\n|\r)/gm,"") === "    Тест угњеждених елемената са класом за игнорисање свих елемената            Rečenica 1        reč 1        reč 2        reč 3    ", "Nested elements test failed" );
    });

})();