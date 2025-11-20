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
        const categorieData = {
            categories: req.body.categories || null,
        }

        const questionData = {
            ...req.body,
            author: req.user.userId,
            categories: categorieData.categories
            
        }
        const result = await db.insert(questiontable).values(questionData).returning()
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
    const {userId} = req.user.userId
    try {
        const result = await db.delete(questiontable).where(eq(questiontable.id, id))
        if(!result){
            res.status(404).send({
                error : "question not found"
            })
        }
        if(userId !== result.author){
            res.status(403).send({
                error : "You are not authorized to delete this question"
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

export const getQuestionByQuestionText = async (req, res) => {
    const { question } = req.params
    try {
        const result = await db.select().from(questiontable).where(eq(questiontable.question, question)).limit(1)
        if (result.length === 0) {
            return res.status(404).json({
                error: "Question not found"
            })
        }
        res.status(200).json(result[0])
    } catch (error) {
        console.error('Get question by text error:', error)
        res.status(500).json({
            error: "Failed to fetch question"
        })
    }   
}



// - identification => tu es qui ? => username, email, id, 
// - authentification => Preuve => mdp, token, clé ssh/ssl, ZFA => TOTP
// - Autorisation => Droit => (Roles => admin, user - Ressources)