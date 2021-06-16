const BudgetManagerFunction = () => {

    let traderBudget = 1000;

    return {
        setBudget(newBudget) {
            traderBudget = newBudget;
        },

        getBudget() {
            return traderBudget;
        },

        canAffourd(expense) {
            return (traderBudget - expense) > 0;
        },

        decreaseWith(amount) {
            traderBudget -= amount;
        },

        hasAmount() {
            return traderBudget > 0;
        }        
    }
};

const BudgetManager = BudgetManagerFunction();

// const BudgetManager = {
//     traderBudget: 10000,

//     setBudget(newBudget) {
//         this.traderBudget = newBudget;
//     },

//     getBudget() {
//         return this.traderBudget;
//     },

//     canAffourd(expense) {
//         return (this.traderBudget - expense) > 0;
//     },

//     decreaseWith(amount) {
//         this.traderBudget -= amount;
//     },

//     hasAmount() {
//         return this.traderBudget > 0;
//     }
// };