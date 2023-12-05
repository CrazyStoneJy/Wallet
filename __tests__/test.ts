import _ from "../src/utils/debounce";

function foo(a: number) {
    console.log(`log :${a}, ${Date.now()}`);
}

function _testDebounce() {
    _.debounce(foo, 3);
}

test('debounce', () => {

    _testDebounce();
    _testDebounce();

});
