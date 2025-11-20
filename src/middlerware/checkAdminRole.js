import { db } from "../db/database.js"
import { usersTable } from "../db/schema.js"
import { eq } from "drizzle-orm"

export const checkAdminRole = async (req, res, next) => {
    try {
        const userId = req.user.userId
        const user = await db.select().from(usersTable).where(eq(usersTable.id, userId)).limit(1)
        
        if (user.length === 0) {
            return res.status(404).json({ error: "User not found" })
        }
        
        if (user[0].role !== 'admin') {
            return res.status(403).json({ error: "Admin access required" })
        }
        
        next()
    } catch (error) {
        console.error('Admin role check error:', error)
        res.status(500).json({ error: "Internal server error" })
    }
}