const jwt = require('jsonwebtoken');


const tokken = jwt.sign({
    username: "mihail",
    role : "user"
}, "SECRET");

const tokkenResult = jwt.decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1paGFpbCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjM0MTYyMzI3fQ.78T9aDrW-SltRDMBN6nY86GP4iOq5W1IXFpm33wDEqY");

const result = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ8.eyJ1c2VybmFtZSI6Im1paGFpbCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjM0MTYyMzI3fQ.78T9aDrW-SltRDMBN6nY86GP4iOq5W1IXFpm33wDEqY", "SECRET");

console.log("Veryfy:")
console.log(result);
console.log("***")