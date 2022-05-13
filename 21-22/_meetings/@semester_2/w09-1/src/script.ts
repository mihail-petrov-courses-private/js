// 0. JS
// ##
// const HELLO_WORLD = "Hello World";

// const printHelloWorld = () => {
//     return HELLO_WORLD;
// }

// 1. Types
// ##
// * number
let numberVariable: number = 6;
// * boolean
let isAvailable: boolean = false;
// * string
let inputPlaceholder = "Price";
// inputPlaceholder = 5; -- NO NO

// * objects
let userInfo: { username: string, password: string} = {
    username : "Mihail",
    password: "password"   
};

const setBoardName = (boardId?: any): string => {
    return "TITLE";
};

// numberVariable = setBoardName();

// 2. classes / abstract
class Board {
    private boardId;

    public getBoardId() {

    }

    private fetchInitialData() {

    }
}

const newBoard = new Board();

// 3. interfaces
interface BaseComponent {
    render();
}

class Toolbar implements BaseComponent {
    render() {
        throw new Error("Method not implemented.");
    }
}


const toolbarManager: BaseComponent = new Board();
toolbarManager.render();