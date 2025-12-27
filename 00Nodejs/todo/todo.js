const fs = require('fs');
const filePath = './myOne.json'

const loadTasks = ()=>{
    try{
        const dataBuffer = fs.readFileSync(filePath);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON)
    }catch (error){
        return [];
    }
}

const saveTasks = (tasks)=>{
    const dataJSON = JSON.stringify(tasks);
    fs.writeFileSync(filePath,dataJSON)
}

const addTasks = (task)=>{
   const tasks = loadTasks();
   tasks.push({task});
   saveTasks(tasks);
   console.log(`Task added -- ${task}`);
}

const listTasks = ()=>{
    const tasks = loadTasks();
    tasks.forEach((task,index)=> console.log(`${index+1} - ${task.task}`))
}

const removeTasks = (index) => {
    const tasks = loadTasks();
    if(index>0 && index <= tasks.length){
        const removed = tasks.splice(index-1,1);
        saveTasks(tasks);
        console.log(`Removed tasks - ${removed[0].task}`)
    }else{
        console.log(`Please enter the valid index`)
    }
}


const command = process.argv[2];
const argument = process.argv[3];


if(command === "add"){
    addTasks(argument)
}else if(command === "list"){
    listTasks()
}else if(command === "remove"){
    removeTasks(parseInt(argument))
}else{
    console("enter the valid command.")
}