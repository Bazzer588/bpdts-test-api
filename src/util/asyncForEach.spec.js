const asyncForEach = require('./asyncForEach');

describe('util/asyncForEach', () => {

    it('handles empty array', () => {
        return asyncForEach([])
            .then(result => {
                expect(result).toEqual([]);
            })
    });

    it('calls setImmediate on each iteration', () => {
        global.setImmediate = jest.fn((f) => f());
        return asyncForEach([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], () => null, 2)
            .then(() => {
                expect(global.setImmediate).toHaveBeenCalledTimes(4);
            })
    });

    it('calls iterator function', () => {
        return asyncForEach([{a: 2}, {b: 66}, {a: 235}], (item, index) => {
            item.i = index;
            item.q = item.a * 2;
        })
            .then(result => {
                expect(result).toEqual([
                    {a: 2, i: 0, q: 4},
                    {b: 66, i: 1, q: NaN},
                    {a: 235, i: 2, q: 470}
                ]);
            })
    });

});
