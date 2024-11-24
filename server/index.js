import express from 'express';

const Knex = require('knex');
const app = express();

app.get('/', (req, res) => {
  const name = process.env.NAME || 'World';
  res.send(`Hello ${name}!`);
});

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});

export default app;
/*
// createUnixSocketPool initializes a Unix socket connection pool for
// a Cloud SQL instance of Postgres.
const createUnixSocketPool = async config => {
  // Note: Saving credentials in environment variables is convenient, but not
  // secure - consider a more secure solution such as
  // Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
  // keep secrets safe.
  return Knex({
    client: 'pg',
    connection: {
      user: process.env.DB_USER, // e.g. 'my-user'
      password: process.env.DB_PASS, // e.g. 'my-user-password'
      database: process.env.DB_NAME, // e.g. 'my-database'
      host: process.env.INSTANCE_UNIX_SOCKET, // e.g. '/cloudsql/project:region:instance'
    },
    // ... Specify additional properties here.
    ...config,
  });
};

const createPool = () => {
    const config = {pool: {}};
    config.pool.max = 5;
    config.pool.min = 0;
    config.pool.acquireTimeoutMillis = 60000;
    config.pool.createTimeoutMillis = 30000;
    config.pool.idleTimeoutMillis = 600000;
    config.pool.createRetryIntervalMillis = 200;
    return createUnixSocketPool(config);
}

const GetScoresForDifficulty = (req, res) => {
    const pool = createPool();
    const {difficulty} = req.body;

    if (!difficulty || (difficulty == 'easy')) {
        res.status(400).send('Invalid difficulty.').end();
    }

    res.status(200).send();
}

const AddNewScore = (req, res) => {
    const pool = createPool();
    const {playerName, difficulty, time} = req.body;

    if (!difficulty || !playerName || !time) {
        res.status(400).send('Invalid request.').end();
    }

    const row = {
        playerName: playerName,
        difficulty: difficulty,
        time: parseInt(time)
    }

    try {
        pool('leaderboard').insert(row)
    } catch {
        logger.error(`Error while attempting to add score:${err}`);
        res.status(500).send('Unable to add score; see logs for more details.')
    }

    res.status(200).send(`Score added successfully: ${row}`);
}

functions.http('leaderboard', (req, res) => {
    switch (req.method) {
        case 'GET':
            GetScoresForDifficulty(req, res);
            break;
        case 'POST':
            AddNewScore(req, res);
            break;
        default:
            res.status(405).send({error: 'Something blew up!'});
            break;
    }
});
*/

