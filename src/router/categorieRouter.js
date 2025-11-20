import {Router} from "express"
import { validateBody, validateParams } from "../middlerware/validation.js"
import { categorieSchema  } from "../models/categories.js"
import {authenticateToken} from "../middlerware/authenticateToken.js"

const router = Router()

router.use(authenticateToken)

router.get('/', getAllCategories)
router.post('/',validateBody(categorieSchema), createCategories)
router.delete('/:id', validateParams(categorieSchema), deleteCategories)

export default router 
