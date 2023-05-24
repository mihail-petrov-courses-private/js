const actionTimeoutComponent = document.getElementById("action-timeout");
const panelComponent = document.getElementById("panel");

actionTimeoutComponent.addEventListener('click', () => {

    setTimeout(() => {
        panelComponent.innerHTML = "<button>Download</button>";
    }, 5000);
});

console.log("Process the application");


const processCustomerData = (callback) => {

    const customerCollection = [
        {
            company : "Evel Corp",
            projectManager : [{
                fname : "Mihail", 
                lname : "Petrov",
            }],

            budget: "100000"
        },
        {
            company : "BG TOL",
            projectManager : [{
                fname : "Ivan", 
                lname : "Ivanov",
            },
            {
                fname : "Petar",
                lname : "Velichkov"
            }
        ],
            budget: "99990000"
        }        
    ];

    setTimeout(() => {
        callback(customerCollection);
    }, 5000);
}


// Не ме интересуват от къде идват
// а само как ще ги обработя
processCustomerData((collection) => {

    let template = [];
    let templateString = "";
    template.push(`<table>`);
    // templateString += `<table>`;
    for(let element of collection) {
        template.push(` 
            <tr>
                <td>${element['company']}</td>
                <td>${element['budget']}</td>
            </tr>
        `);

        // templateString += `
        // <tr>
        //     <td>${element['company']}</td>
        //     <td>${element['budget']}</td>
        // </tr>        
        // `;
    }
    template.push(`</table>`);
    // templateString += `</table>`;

    panelComponent.innerHTML = template.join('');
});