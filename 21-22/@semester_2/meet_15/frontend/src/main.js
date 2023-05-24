// Import на един ред
import { title, showTitle } from './boards.js';
import { returnObjectFunc as renamedFunc }  from './boards.js';
import { domat } from './domat.js';

// Import на default конструкция
// import dom from './domat.js';

// Import на няколко реда
// import { title       } from './boards.js';
// import { showTitle   } from './boards.js';

import * as boardReference from './boards.js';

console.log(boardReference);
console.log('Hello MAIN js')
console.log(title);
console.log(showTitle());
console.log(renamedFunc());

const objectreference   = renamedFunc();
const key               = objectreference.key;
console.log(key);

const { value }         = renamedFunc(); 
console.log(value);


const element = domat("#action--create-new");
element.on('click', () => {
    console.log('You clicked me');
});

// ** 
fetch("http://localhost:8223/api/workspace/").then((result) => {
    console.log(result.body);
}).catch((error) => {
    console.error(error);
})