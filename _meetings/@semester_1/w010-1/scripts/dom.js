// DOM - Document Object Model
// взимане на елементи с който ще работим

// actions
const actionOpenDayComponent        = document.getElementById("action--open-day");
const actioncloseDayComponent       = document.getElementById("action--close-day");

const actionPause                   = document.getElementById("action--pause");
const actionClose                   = document.getElementById("action--close");


// static element
const countOpenDayComponent         = document.getElementById("count--open-day");
const countAllOperationComponent    = document.getElementById("count--all-operation");
const actionPanelComponent          = document.getElementById('action-panel');

// колекция от DOM емементш (компоненти)
const allButtonComponents           = document.getElementsByTagName("button");

// делегиране на събития 

actionOpenDayComponent.addEventListener("click", (eventObject) => {
    // 1. взимаме стойността на елемента (между отварящ и затварящ таг)
    let content                 = +countOpenDayComponent.innerText;

    // 2. увеличаваме стойността (трансформираме)
    content++;

    // 3. Повторно присвояваме, стойността на взетия първоначално елемент
    countOpenDayComponent.innerText = content;
});

// document.addEventListener('click', () => {

//     let content                             = countAllOperationComponent.innerText;
//     countAllOperationComponent.innerText    = ++content;
// });


// # Този пример няма да работи
// # не можем да сложим .addEventListener на HTMLCollection елементш
// allButtonComponents.addEventListener('click', () => {
//     let content                             = countAllOperationComponent.innerText;
//     countAllOperationComponent.innerText    = ++content;
// });

for(let i = 0; i < allButtonComponents.length; i++) {

    allButtonComponents[i].addEventListener('click', () => {
        let content                             = countAllOperationComponent.innerText;
        countAllOperationComponent.innerText    = ++content;    
    })
}

// * Искам да добавя нови два бутона към съществуващия набор от бутони
// * искам да направя текущия бутон, не активен
actioncloseDayComponent.addEventListener('click', () => {

    // * искам да направя текущия бутон, не активен -- diabled
    actioncloseDayComponent.setAttribute('disabled', 'disabled');
    actionPause.style.display = "inline-block";
    actionClose.style.display = "inline-block";

    // * Искам да добавя нови два бутона към съществуващия набор от бутони
    // innerHTML
    // const buttonTemplate = `<button id="action--pause">Стопиране на деня</button>
    //                         <button id="action--close">Тотално затваряне на деня</button>`;

    // actionPanelComponent.innerHTML += buttonTemplate;
});


// for(var index in allButtonComponents) {

//     console.log(index);
//     console.log(allButtonComponents[index]);
//     allButtonComponents[index].addEventListener('click', () => {
//         let content                             = countAllOperationComponent.innerText;
//         countAllOperationComponent.innerText    = ++content;    
//     })
// }


const incrementNumber = () => {

    // 1. взимаме стойността на елемента (между отварящ и затварящ таг)
    let content                 = +countOpenDayComponent.innerText;

    // 2. увеличаваме стойността (трансформираме)
    content += 10;

    // 3. Повторно присвояваме, стойността на взетия първоначално елемент
    countOpenDayComponent.innerText = content;
}