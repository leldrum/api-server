import express from 'express'
import todosRoutes from "./router/todosRouter.js"
const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.use('/todos', todosRoutes)

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
})