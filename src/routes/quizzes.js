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

router.get('/:id', async (req, res) => {
    const dbo = await getDbConnection()
    const { id } = req.params
    let questions
    try {
        questions = await dbo
            .collection('questions')
            .find({
                _id: id,
            })
            .toArray()
    } catch (err) {
        console.log(err)
    }
    res.json(questions)
})

router.post('/', async (req, res) => {
    const dbo = await getDbConnection()
    const { questions } = req.body
    let insertedQuestions
    try {
        insertedQuestions = await dbo
            .collection('questions')
            .insertMay(questions)
    } catch (err) {
        console.log(err)
    }
    let ids = insertedQuestions.insertedIds
    console.log(`${insertedQuestions.insertedCount} documents were inserted.`)
    for (let id of Object.values(ids)) {
        console.log(`Inserted a document with id ${id}`)
    }
    res.status(200).json({ message: 'questions inserted successfully' })
})

const quizRouter = {
    name: 'quizzes',
    router,
}

export default quizRouter
