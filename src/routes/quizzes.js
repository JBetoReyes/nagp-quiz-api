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
        questions = await dbo.collection('questions').findOne({
            _id: +id,
        })
    } catch (err) {
        console.log(err)
    }
    res.json(questions)
})

router.post('/', async (req, res) => {
    const dbo = await getDbConnection()
    const { questions } = req.body
    try {
        await dbo.collection('questions').insertMany(questions)
    } catch (err) {
        console.log(err)
    }
    res.status(200).json({ message: 'questions inserted successfully' })
})

const quizRouter = {
    name: 'quizzes',
    router,
}

export default quizRouter
