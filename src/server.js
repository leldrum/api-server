import express from 'express'
const POST = process.env.PORT || 3000

const app = express()

app.arguments(express.json())

app.get('/questions', (req, res) => {
    res.status(200).send([{
        id:"1",
        question:"quelle est la capital de France ?",
        answer:"Paris"
    }])
})

app.post('/questions', (req, res) => {
    const {question, answer} = req.body
        if(!question || !answer){
        return res.status(400).send({
            error: "Question and answer are required"
        })
    }
    res.status(200).send({
        message:"Question created succesfully"
    })
})

app.delete('/questions', (req, res) => {
    const {id} = req.params
    res.status(200).send({
        message:`Question ${id} deleted`
    })
})

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
})