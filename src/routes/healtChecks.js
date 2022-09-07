import express from 'express'

const router = express.Router()

router.get('/', async (_req, res) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now(),
    }
    try {
        res.json(healthcheck)
    } catch (error) {
        res.status(503).send()
    }
})

const healthChecksRouter = {
    name: 'health',
    router,
}

export default healthChecksRouter
