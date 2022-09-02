import server from './server';
import quizzesRouter from './routes/quizzes';

const {
    APP_PORT
} = process.env;

const routers = [
    quizzesRouter
]

server(APP_PORT, routers);