import {sqliteTable, text, integer} from 'drizzle-orm/sqlite-core'
import { v4 as uuidv4 } from 'uuid';

export const questiontable = sqliteTable('questions',{
    id: text().primaryKey().$defaultFn(() => uuidv4()),
    question: text('question', {length: 300}).notNull(),
    answer :  text({length: 300}).notNull(),
    difficulty: text({enum: ['easy', 'medium', 'difficult']}).notNull().default('easy'),
    createdAt: integer('created_at', {mode:'timestamp'}).notNull().$defaultFn(() => new Date()),
    author: text().references(() => usersTable.id, {onDelete: 'cascade'}).notNull()
})

export const usersTable = sqliteTable('users', {
    id: text().primaryKey().$defaultFn( () => uuidv4()),
    username : text({length:30}).notNull(),
    email: text().notNull().unique(),
    password: text({length:255}).notNull(),
    createdAt: integer('created_at', {node: 'timestamp'}).notNull().$defaultFn(() => new Date()),
})