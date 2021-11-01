// трябва да export - нем
// желаната от нас функционалност
export const title = "BOAR PAGE TITLE";

export const showTitle = () => {
    return 'This is my title';
}

export const returnObjectFunc = () => {

    const key = "KEY";
    const value = "VALUE";

    return { key, value: value }
};