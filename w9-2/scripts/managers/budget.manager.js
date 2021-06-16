const BudgetManager = (() => {

    let traderBudget = 10000;

    const setBudget = (newBudget) => {
        traderBudget = newBudget;
    };

    const getBudget = () => {
        return traderBudget;
    };

    const canAffourd = (expense) => {
        return (traderBudget - expense) > 0;
    };

    const decreaseWith = (amount) => {
        traderBudget -= amount;
    };

    const hasAmount = () => {
        return traderBudget > 0;
    };       

    return {
        getBudget, canAffourd, decreaseWith, hasAmount
    }
})();