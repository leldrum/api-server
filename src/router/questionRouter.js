import {Router} from "express"
import { createQuestions, deleteQuestions, getAllQuestions, getQuestionByQuestionText } from "../controllers/questionController.js"
import { validateBody, validateParams, validateQuestionText } from "../middlerware/validation.js"
import { createQuestionSchema, questionIdSchema, questionTextSchema } from "../models/question.js"
import {authenticateToken} from "../middlerware/authenticateToken.js"

const router = Router()

router.use(authenticateToken)

router.get('/', getAllQuestions)
router.post('/',validateBody(createQuestionSchema), createQuestions)
router.delete('/:id', validateParams(questionIdSchema), deleteQuestions)
router.get('/search', validateQuestionText(questionTextSchema), getQuestionByQuestionText)

export default router 
