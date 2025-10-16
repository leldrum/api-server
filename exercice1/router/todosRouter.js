import {Router} from "express"
import { createTodos, getTodos } from "../controllers/todosController.js"

const router = Router()

router.get('/:id', getTodos)
router.post('/', createTodos)
//router.patch('/:id', )

export default router
