import { eq } from "drizzle-orm"
import { db } from "../db/database.js"

import { categorieTable } from '../db/schema.js'

import {request, response} from 'express'


export const getAllCategories = async (req, res) => {
   try {
    const result = await db.select().from(categorieTable).orderBy('createdAt','desc')
    res.status(200).json(result)
    } catch (error) {
    res.status(500).send({
        error : "failed to fetch categories"
    })
   }
}

export const createCategories = async (req, res) => {
    try {
        const categorieData = {
            ...req.body,        
        }
        const result = await db.insert(categorieTable).values(categorieData).returning()
        res.status(201).json(result)
       } catch (error) {
        res.status(500).send({
            error : "failed to insert categories"
        })
    }       
}

export const deleteCategories = async (req, res) => {
    const {id} = req.params
    try {
        const result = await db.delete(categorieTable).where(eq(categorieTable.id, id))
        if(!result){
            res.status(404).send({
                error : "categrie not found"
            })
        }
        res.status(200).send({
            message:`Categorie deleted`
        })
       } catch (error) {
        res.status(500).send({
            error : "failed to delete categories"
        })
    } 
}

