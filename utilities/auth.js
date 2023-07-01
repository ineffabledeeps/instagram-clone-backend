const {v4:uuidv4,v5:uuidv5} = require('uuid');
const genuuid = function(){  
    let v4string = uuidv4();
    let v5string = uuidv5(process.env.SECRET,v4string);
    let secret = uuidv5(v5string,v4string)
    return secret;
}

module.exports = genuuid;