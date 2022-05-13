var welcomeMessage = undefined; // декларация на променлива

welcomeMessage = "Добре си ми дошъл в цветовия конфигуратор"; // инициализация
alert(welcomeMessage);
welcomeMessage = "Имаш шанс да избереш любимия си цвят за стаята на мечтите ти";
alert(welcomeMessage);

// червен   - #ff0000
// зелен    - #00ff00
// син      - #0000ff
// жъл      - #00ffff
var posibleColorMessage = "Имаме в наличност следзните цветове: червен, жълт, син, зелен";
alert(posibleColorMessage);

var questionMessage = "Какъв е любими ти цвят ?"; // декларация + инициализация
var color = prompt(questionMessage); // функцията връща данните си, на реда само трябва да ги вземем

// искам да разбера дали този цвят който потребителя избра
// в момента е част от моя склас (имам ли го в наличност)

// изпълняваме програмата само ако израза в скобите е със стойност TRUE
// IF ( УСЛОВЕН ИЗРАЗ )
// УСЛОВЕН ИЗРАЗ 
// * изрази използващи знака ==
// * изрази използващи знака >
// * изрази използващи знака <
if(color == "червен") {
    alert("Ти избра цвят с който аз разполагам");
}

var customerAge = prompt("На колко години си в момента");

if(customerAge < 18) {
    alert("Ти не си пълнолетен нямаш право да пазаруваш тук");
}


var isCustomerAlreadyBuySomething = confirm("Пазарувал ли си от мен преди");

if(isCustomerAlreadyBuySomething == true) {
    var numberOfStocks = prompt("Колко стоки си купил от мен, за последния месец? ");
}


alert("Вие направихте следния избор");
alert(color);

var confirmVariableResult = confirm("Потвърдете избора си");
alert(confirmVariableResult);

var finalConfirmMessage = "Вие потвърдихе покупката на цвят " + color + ", приятно боядисване";
alert(finalConfirmMessage);