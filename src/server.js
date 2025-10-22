import express from 'express'
import questionRoutes from "./router/questionRouter.js"
import userRoutes from "./router/userRouter.js"
import logger from "./middlerware/logger.js"
const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(logger)

app.use('/questions', questionRoutes)
app.use('/users', userRoutes)

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
})