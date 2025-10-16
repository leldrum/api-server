export const getAllQuestions = (req, res) => {
    res.status(200).send([{
        id:"1",
        question:"quelle est la capital de France ?",
        answer:"Paris"
    }])
}

export const createQuestions = (req, res) => {
    const {question, answer} = req.body
        if(!question || !answer){
        return res.status(400).send({
            error: "Question and answer are required"
        })
    }
    res.status(200).send({
        message:"Question created succesfully"
    })
}

export const deleteQuestions = (req, res) => {
    const {id} = req.params
    res.status(200).send({
        message:`Question ${id} deleted`
    })
}