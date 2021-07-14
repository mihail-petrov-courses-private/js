const ajax = (() => {

    const httpRequest = new XMLHttpRequest();

    const get = (url, callback, isParsable = false) => {

        httpRequest.open('GET', url);
        httpRequest.send();

        httpRequest.onload = () => {

            const resultData = (isParsable) 
                                ? JSON.parse(httpRequest.responseText) 
                                : httpRequest.responseText;
            callback(resultData);
        }
    };

    const json = (url, callback) => {
        get(url, callback, true);
    }

    return {
        get, json
    }
})();


ajax.json('https://jsonplaceholder.typicode.com/todos', (collection) => {
    console.log(collection);
});