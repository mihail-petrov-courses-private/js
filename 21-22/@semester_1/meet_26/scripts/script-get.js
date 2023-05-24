const placehodlerComponent = document.getElementById("placeholder");

// За да взема данни от НЕТА - AJAX
// 1. Инициализиране на обект за работа с HTTP заявки
// -- отваряме си браузъра
const httpRequest = new XMLHttpRequest();

// 2. Инициализираме заявка към конкретен WEB ресурс
// 2.1 --> Какъв ще бъде метода чрез който ще пращаме данните
// GET      -- взима данни      
// POST     -- изпраща данни    (създаване на нещо ново)
// PUT      -- изпраща данни    (актуализира същствуващо нещо)
// DELETE   -- изпраща данни    (изтрие съществуващо нещо)
httpRequest.open('GET', 'https://jsonplaceholder.typicode.com/todos');

// 3. Изпращане на заявка
// 3.1 Ако метода е GET пращаме заявка за получаване
// 3.2 Ако метода е POST пращаме заявка с допълнителни данни към нея.
httpRequest.send();

const template = (title, isCompleated) =>  {

    const cssClass = (isCompleated) ? 'done' : 'open';
    return `<h2 class="${cssClass}">${title}</h2>`;
}


// 4. Изчакваме зареждането на данни в анонимна функция
// !!!! Връщани данни са САМО САМО И ЕДИНСТВЕНО ТЕКСТ
httpRequest.onload = () => {
    const responseObject = JSON.parse(httpRequest.responseText);

    const templateCollection = [];
    for(const element of responseObject) {
        templateCollection.push(template(element.title, element.completed));
    }

    placehodlerComponent.innerHTML = templateCollection.join('');
};