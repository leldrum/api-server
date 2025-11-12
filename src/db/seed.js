
import {db} from './database.js'
import bcrypt from "bcrypt";
import { questiontable, usersTable } from './schema.js'

async function seed(){
    try {
        console.log('Seeding database..')
        await db.delete(questiontable)
        await db.delete(usersTable)

        const mdpHash1 = await bcrypt.hash('passa', 12)
        const mdpHash2 = await bcrypt.hash('passo', 12)
        const mdpHash3 = await bcrypt.hash('passi', 12)

        const seedUsers = [
            {
                username: "Gerard Deuxpardeux",
                email: "fibonacci@gmail.com",
                password: mdpHash1

            },
            {
                username: "Léo Gressine",
                email: "francisnganou@gmail.com",
                password: mdpHash2

            },
            {
                username: "Cristiano Pasdabdo",
                email: "coupedumonde@gmail.com",
                password: mdpHash3

            }
        ]
        const insertedusers = await db.insert(usersTable).values(seedUsers).returning()
   


        const seedQuestions = [
            {
                question: 'Quelle est la cpaitale de la France?',
                answer: 'Paris',
                difficulty: 'easy',
                author: insertedusers[0].id
            },
            {
                question: 'Quel est le plus grand océan du monde?',
                answer: "L'océan Pacifique",
                difficulty: 'medium',
                author: insertedusers[1].id
            },
            {
                question: 'Qui a écrit "Les Misérables"?',
                answer: 'Victor Hugo',
                difficulty: 'difficult',
                author: insertedusers[2].id
            },
        ]

       

        await db.insert(questiontable).values(seedQuestions)
        console.log('Database seeded successfully')
        console.log("email: ", insertedusers[0].email)
        console.log('password: ', insertedusers[0].password)

    } catch (error) {
        console.log('Error sending database', error)
    }
}

seed();
