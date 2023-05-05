import express from 'express';
import dotenv from 'dotenv';
import knex from 'knex';

dotenv.config();

const app = express();
const port = process.env.EXPRESS_SERVER_PORT;

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA,
    port: process.env.DB_PORT
};

const db = knex({
    client: 'mysql',
    connection: dbConfig
});


await db('people').insert({ name: 'John Doe' });


app.get("/", async (req, res) => {
    const people = await db.select('*')
    .from('people');

    let list = '<ul>';
    for (const person of people) {
        list += '<li>' + person.name + '</li>';
    }
    list += '</ul>';

    res.send(`
        <h1>Full Cycle Rocks!</h1>
        <br>

        ${list}
    `);
});

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`)
});
