
import {db} from './database.js'

import { questiontable } from './schema.js'

async function seed(){
    try {
        console.log('Seeding database..')
        await db.delete(questiontable)
        const seedQuestions = [
            {
                question: 'Quelle est la cpaitale de la France?',
                answer: 'Paris',
                difficulty: 'easy',
                //createdBy: insertedusers[0].id,
            },
            {
                question: 'Quel est le plus grand océan du monde?',
                answer: "L'océan Pacifique",
                difficulty: 'medium',
               // createdBy: insertedusers[1].id,
            },
            {
                question: 'Qui a écrit "Les Misérables"?',
                answer: 'Victor Hugo',
                difficulty: 'difficult',
            },
        ]
        await db.insert(questiontable).values(seedQuestions)
        console.log('Database seeded successfully')

    } catch (error) {
        console.log('Error sending database', error)
    }
}

seed();
