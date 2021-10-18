const actionOpenDayComponent    = document.getElementById("action--open-day");
const actionCloseDayComponent   = document.getElementById("action--close-day");

const actionBuyComponent        = document.getElementById("action--buy");
const actionSellComponent       = document.getElementById("action--sell");
const actionBribeComponent      = document.getElementById("action--bribe");
const actionReportComponent     = document.getElementById("action--report");

const mainPanelComponent        = document.getElementById("main-panel");

// State managment
// 0. Ръчно задаване на състоянията на активните контроли
const stateReadyForActivation = () => {

    actionOpenDayComponent.removeAttribute('disabled');
    actionCloseDayComponent.setAttribute('disabled', 'disabled');
    actionBuyComponent.setAttribute('disabled','disabled');
    actionSellComponent.setAttribute('disabled', 'disabled');
    actionBribeComponent.setAttribute('disabled', 'disabled');
    actionReportComponent.setAttribute('disabled', 'disabled');
};

// 1. Инициализиране на отделните събития
stateReadyForActivation();

// 2. активиране на останалите компоненти
actionOpenDayComponent.addEventListener('click', () => {

    if(!OperationManager.isDayStarted()) {
        let currentSecretTradingCode =  OperationManager.startDay();    
    }
    
    if(OperationManager.isDayStarted()) {

        mainPanelComponent.innerHTML = "<h1>Деня е стартиран успешно</h1>";

        actionOpenDayComponent.setAttribute('disabled', 'disabled');
        actionCloseDayComponent.removeAttribute('disabled');
        actionBuyComponent.removeAttribute('disabled');
        actionSellComponent.removeAttribute('disabled');
        actionBribeComponent.removeAttribute('disabled');
        actionReportComponent.removeAttribute('disabled');
    }
});


actionBuyComponent.addEventListener('click', () => {  
    BuyController.init(mainPanelComponent);
});

actionCloseDayComponent.addEventListener('click', () => {

    if(OperationManager.isDayStarted()) {
        OperationManager.endDay();
    }

    if(!OperationManager.isDayStarted()) {
        mainPanelComponent.innerHTML = "<h1>Деня е затворен</h1>";
        stateReadyForActivation();  
    }
});