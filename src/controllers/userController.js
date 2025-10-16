import {Router} from "express"


const router = Router()

export const getAllUsers = (req, res) =>{
    res.send({message:"Get all users"})
}
