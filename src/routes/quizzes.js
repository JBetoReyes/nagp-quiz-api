import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.json([{
        quizText: 'What is the name of the president of US?'
    }]);
});

const quizRouter = {
    name: 'quizzes',
    router
};

export default quizRouter;