const jwt =  require('jsonwebtoken');


let id = '100';
const secret = 'supersecret'; ///// IMPORTANT

const token =  jwt.sign(id,secret);
const decodeToken = jwt.verify('yyJhbGciOiJIUzI1NiJ9.MTAw._p4CTP9MejT8kntvqaJI0HR_jo2DLfuLaRqCIahBf50',secret);
// console.log(token)
console.log(decodeToken)

