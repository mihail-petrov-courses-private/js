// Как взимаме елементш
const firstComponent = document.querySelector("#first");

// 1. Взимане на елемент
const firstDomatComponent = domat("#first");

// 2. Добавяне на събитие
firstDomatComponent.on('click', () => {
    console.log("You clicked me");
});


// 2. Стилизация
firstDomatComponent.css({
    "background"    : "#00ff00",
    "margin-left"   : "150px"
});


firstDomatComponent.html('<div class="inner">X</div>');
console.log(firstDomatComponent.html());

firstDomatComponent.attr('name', 'first_div_element');
console.log(firstDomatComponent.attr('name'));

firstDomatComponent.attrs({
    'data-customer-id'  : "123456",
    'data-element-id'   : "1",
    "class"             : "data"
});

firstDomatComponent.removeAttr('name');
firstDomatComponent.removeAttrs('data-customer-id', 'data-element-id');
firstDomatComponent.hasAttr('class');

// 
firstDomatComponent.after("<h1>After header</h1>");
firstDomatComponent.before("<h1>Before header</h1>");