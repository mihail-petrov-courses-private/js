import { domat } from './libs/domat.js';
import signin from './pages/sigin/signin.js';
import signup from './pages/signup/signup.js';

const placeholder = domat("#wrapper");

const router = (path) => {

    if(path == 'signin') return signin(placeholder);
    if(path == 'signup') return signup(placeholder);

    console.log("404 Page Not Found");
};

const processRouter = () => {

    const hashLocation   = window.location.hash;
    const hashCollection = hashLocation.split('#');

    if(hashCollection[1]) {
        router(hashCollection[1]);
    }    
}

domat(window).on('load'         , () => processRouter() );
domat(window).on('hashchange'   , () => processRouter() );