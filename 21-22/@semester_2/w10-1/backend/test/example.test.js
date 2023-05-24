const add = (a, b) => {
    return a + b + 1;
};

const substract = (a, b) => {
    return a - b + 1;
};

describe.skip('Basic calculator functionality', () => {

    it('should add two numbers togeder', () => {
        const newValue = add(5,5);
        expect(newValue).toBe(10);
    });

    it('should substract two numbers', () => {
        const positivResult = substract(10, 5);
        expect(positivResult).toEqual(5);
    });

    it('should be negativ number when substract from 5 10', () => {
        const negativeNUmber = substract(5, 10);
        expect(negativeNUmber).toEqual(-5);
    });
});