const {v4:uuidv4,v5:uuidv5} = require('uuid');
const genuuid = function(){  
    let v4string = uuidv4();
    let v5string = uuidv5(process.env.SECRET,v4string);
    let secret = uuidv5(v5string,v4string)
    return secret;
}

const encryptPwd = function(password){
    let salt = uuidv5("null","user")
    let v5string = uuidv5(password,salt)
    let finalString = uuidv5(password,v5string)
    return finalString
}

module.exports = {genuuid,encryptPwd};