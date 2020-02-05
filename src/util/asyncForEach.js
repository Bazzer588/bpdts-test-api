/** process an array asynchronously - yielding at a preset iteration step
 *
 * @param array - the array to iterate
 * @param fn - callback function, called with (element,index)
 * @param steps - number (1-n) of array elements to process before yielding
 * @return {Promise<void>} resolves to array
 */

async function asyncForEach (array, fn, steps = 100) {

    if (!array.length){
        return Promise.resolve(array);
    }

    return new Promise(resolve => {

        let n = 0;

        const handler = () => {
            const end = n + steps;
            while (n < end) {
                fn(array[n], n);
                if (++n >= array.length) {
                    return resolve(array);
                }
            }
            setImmediate(handler); // yield so Node server can deal with other requests
        };

        handler();
    });
}

module.exports = asyncForEach;
