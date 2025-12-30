const express = require("express");
const app = express();
const port = 3000

app.use(express.json());

const todos = []

app.get('/', (req, res) => {
    res.send("Hi I m Genius.")
})

app.get('/list-todo', (req, res) => {
    res.send(todos);
})

app.post('/add-todos', (req, res) => {
    const todoItem = req.body;
    if (!todoItem.id || !todoItem.todo) {
        res.send("required field are missings");
        return
    }
    todos.push(todoItem);
    res.send("Item added successfully.");
})

app.put('/update-todos',(req,res)=>{
    const todoItem = req.body
    if(!todoItem.id || !todoItem.updatedTodo){
        res.send("required items are missings")
        return
    }
    todos.map((data)=>{
        if(data.id === todoItem.id){
            data.todo = todoItem.updatedTodo; 
        }
    })
    res.send("To do updated successfully");
})

app.delete('/delete-todos',(req,res)=>{
    const deleteItemId = req.query.id
    if(!deleteItemId){
        res.send("required field are missing")
    }
    const [todoItem] = todos.filter(data => data.id === deleteItemId);
    const todoItemIndex =todos.indexOf(todoItem);
    todos.splice(todoItemIndex,1);
    res.send("Todo deleted successfully.")
})

app.listen(port, () => {
    console.log(`app listening at port ${port}`);
})