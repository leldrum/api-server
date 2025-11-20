import { eq } from "drizzle-orm"
import { db } from "../db/database.js"
import { usersTable } from '../db/schema.js'
import {request, response} from 'express'

/**
 * @param {request} req
 * @param {response} res
 **/
export const getAllUsers = async (req, res) => {
    try {
        const result = await db.select({
            id: usersTable.id,
            username: usersTable.username,
            email: usersTable.email,
            role: usersTable.role,
            createdAt: usersTable.createdAt
        }).from(usersTable).orderBy(usersTable.createdAt, 'desc')
        
        res.status(200).json(result)
    } catch (error) {
        console.error('Get all users error:', error)
        res.status(500).json({
            error: "Failed to fetch users"
        })
    }
}

/**
 * @param {request} req
 * @param {response} res
 **/
export const getUserById = async (req, res) => {
    const { id } = req.params
    try {
        const result = await db.select({
            id: usersTable.id,
            username: usersTable.username,
            email: usersTable.email,
            role: usersTable.role,
            createdAt: usersTable.createdAt
        }).from(usersTable).where(eq(usersTable.id, id)).limit(1)
        
        if (result.length === 0) {
            return res.status(404).json({
                error: "User not found"
            })
        }
        
        res.status(200).json(result[0])
    } catch (error) {
        console.error('Get user by id error:', error)
        res.status(500).json({
            error: "Failed to fetch user"
        })
    }
}

/**
 * @param {request} req
 * @param {response} res
 **/
export const deleteUserById = async (req, res) => {
    const { id } = req.params
    try {
    
        const user = await db.select().from(usersTable).where(eq(usersTable.id, id)).limit(1)
        
        if (user.length === 0) {
            return res.status(404).json({
                error: "User not found"
            })
        }
        await db.delete(usersTable).where(eq(usersTable.id, id))
        
        res.status(200).json({
            message: "User deleted successfully"
        })
    } catch (error) {
        console.error('Delete user error:', error)
        res.status(500).json({
            error: "Failed to delete user"
        })
    }
}
