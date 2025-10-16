import {Router} from "express"
import { createQuestions, deleteQuestions, getAllQuestions } from "../controllers/questionController"

const router = Router()

router.get('/', getAllQuestions)
router.post('/', createQuestions)
router.delete('/:id', deleteQuestions)

export default router
