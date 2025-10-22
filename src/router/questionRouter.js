import {Router} from "express"
import { createQuestions, deleteQuestions, getAllQuestions } from "../controllers/questionController.js"
import { validateBody, validateParams } from "../middlerware/validation.js"
import { createQuestionSchema, questionIdSchema } from "../models/question.js"

const router = Router()

router.get('/', getAllQuestions)
router.post('/',validateBody(createQuestionSchema), createQuestions)
router.delete('/:id', validateParams(questionIdSchema),deleteQuestions)

export default router
