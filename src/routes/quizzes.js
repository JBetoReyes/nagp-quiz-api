import express from 'express'
import { getDbConnection } from '../db'

const router = express.Router()

router.get('/', async (req, res) => {
    const dbo = await getDbConnection()
    let questions
    try {
        questions = await dbo.collection('questions').find().toArray()
    } catch (err) {
        console.log(err)
    }
    res.json(questions)
})

const quizRouter = {
    name: 'quizzes',
    router,
}

export default quizRouter
