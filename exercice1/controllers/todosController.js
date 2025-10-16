import crypto from 'crypto'
import {readFile, writeFile} from 'fs/promises'

export const getTodos = (req, res) => {
    res.status(200).send([{
        id:"1",
        text:"quelle est la capital de France ?",
        completed:"Paris"
    }])
}


const readTodos = async () => {
    try{
        const data = await readFile('./exercice1/todos.json', 'utf-8')
        return JSON.parse(data)
    }
    catch(error){
        if(error.code == 'ENOENT'){
            return []
        }
        throw new Error('Could not read file')
    }
}

export const createTodos = async (req, res) => {
    try{
        const {text, completed = false} = req.body
        if(!text.trim() || typeof completed != "boolean"){
            return res.status(400).send({
                error:"Invalid body"
            })
        }
        const todos = await readTodos()
        const newData = {
            id: crypto.randomUUID(),
            text: text.trim(),
            completed
        }
        todos.push(newData)
        await writeFile('./exercice1/todos.json', JSON.stringify(todos, null, 2), 'utf-8')
        res.status(201).send(newData)

    }
    catch(error){
        res.status(500).send(error)
    }

  
    
   
}

export const updateTodos = (req, res) => {
    const {id} = req.params
    res.status(200).send({
        message:`Question ${id} deleted`
    })
}