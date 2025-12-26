const fs = require('fs');

// fs.readFile('myone.txt',function(err,data){
//     if(err){
//         return console.error(err);
//     }
//     console.log(data.toString());
// })

 fs.readFile('myone.txt',function(err,data){
    if(err){
        return console.error(err);
    }
    console.log(data)
 })

