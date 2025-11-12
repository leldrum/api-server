import { eq } from "drizzle-orm"
import { db } from "../db/database.js"

import { questiontable } from '../db/schema.js'

import {request, response} from 'express'

export const getAllQuestions = async (req, res) => {
   try {
    const result = await db.select().from(questiontable).orderBy('createdAt','desc')
    res.status(200).json(result)
   } catch (error) {
    res.status(500).send({
        error : "failed to fetch questions"
    })
   }
}

export const createQuestions = async (req, res) => {
    try {
        const result = await db.insert(questiontable).values(req.body).returning()
        res.status(201).json(result)
       } catch (error) {
        res.status(500).send({
            error : "failed to insert questions"
        })
    } 
}

/**
 * @param {request} req
 * @param {response} res
 **/

export const deleteQuestions = async (req, res) => {
    const {id} = req.params
    try {
        const result = await db.delete(questiontable).where(eq(questiontable.id, id))
        if(!result){
            res.status(404).send({
                error : "question not found"
            })
        }
        res.status(200).send({
            message:`Question deleted`
        })
       } catch (error) {
        res.status(500).send({
            error : "failed to delete questions"
        })
    } 
}


// - identification => tu es qui ? => username, email, id, 
// - authentification => Preuve => mdp, token, clé ssh/ssl, ZFA => TOTP
// - Autorisation => Droit => (Roles => admin, user - Ressources)