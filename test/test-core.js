QUnit.test( "replace_L2C", function( assert ) {
    assert.ok( jQuery("body").CyrLatConverter("FUNC", "replace_L2C", "ćao jquery, ја idem u Njemačku, da šljakam za budzašto!") === "ћао jQuery, ја идем у Нјемачку, да шљакам за будзашто!", jQuery("body").CyrLatConverter("FUNC", "replace_L2C", "ćao jquery, ја idem u Njemačku, da šljakam za budzašto!") );
});

QUnit.test( "replace_C2L", function( assert ) {
    assert.ok( jQuery("body").CyrLatConverter("FUNC", "replace_C2L", "ћао jquery, ја идем у Нјемачку, да шљакам за будзашто!") === "ćao jQuery, ja idem u Njemačku, da šljakam za budzašto!", jQuery("body").CyrLatConverter("FUNC", "replace_C2L", "ћао jquery, ја идем у Нјемачку, да шљакам за будзашто!") );
});

QUnit.test( "recursiveCheckParent", function( assert ) {
    assert.ok( jQuery("body").CyrLatConverter("FUNC", "recursiveCheckParent", document.querySelector("#recursive_test")) === true, "DOM recursive parent check");
});
