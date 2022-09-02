import server from './server';
import quizzesRouter from './routes/quizzes';

const routers = [
    quizzesRouter
]

server(3000, routers);