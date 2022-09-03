const {MongoClient} = require('mongodb');
// const {MongoClient} = mongodb;

const {
    DB_HOST,
    DB_USER,
    DB_PASSWORD
} = process.env;

const uri = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:27017?retryWrites=true&w=majority&authSource=admin`;

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let dbo;

export const connectToServer = async () => {
    let dbConnection;
    try {
        dbConnection = await client.connect();
    } catch (err) {
        console.log('error: ', err);
        return;
    }
    dbo = dbConnection.db('quiz');
    console.log('Successfully connected to db');
}

export const getDbConnection = async () => {
    if (!dbo) {
        await connectToServer()
    }
    return dbo;
}